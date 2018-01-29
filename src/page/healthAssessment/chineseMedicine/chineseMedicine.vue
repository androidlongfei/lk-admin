<template>
    <div>
        <custom-header :headerData="headerData"></custom-header>
        <div v-if="this.firstLoad" style="width: 100%;height: 500px">
            <div style="margin-top: 50%;text-align: center">正在加载中</div>
        </div>
        <div v-else>
            <div v-if="this.loadError" style="width: 100%;height: 500px">
                <keep-alive>
                    <reload-page :reload="this.againLoad"></reload-page>
                </keep-alive>
            </div>
            <div v-else>
                <div id="wrapper">
                    <div class="test_message">
                        <h2>中医检测</h2>
                        <p id="time">
                            {{this.healthAssessmentData.createTime}}
                        </p>
                    </div>
                    <div class="time-graph" v-if="this.healthAssessmentData && this.healthAssessmentData.score">
                        <canvas ref="myChart" id="time-graph-canvas" width="400" height="400"></canvas>
                    </div>
                    <div class="chartbox2">
                        {{this.healthAssessmentData.evaluate}}
                    </div>
                </div>
                <div v-if="this.healthAssessmentData.faceDiagnose">
                    <div id="medicine_result" style="clear: both;">
                        <p class="f20 yc_title" style="text-align: center;">诊断结果</p>
                        <ul id="medicine_result_list">
                            <li style="text-align: left" v-if="this.healthAssessmentData.faceDiagnose.face">
                                {{this.healthAssessmentData.faceDiagnose.face}}
                            </li>
                            <li style="text-align: left" v-if="this.healthAssessmentData.faceDiagnose.tongue">
                                {{this.healthAssessmentData.faceDiagnose.tongue}}
                            </li>
                            <li style="text-align: left" v-if="this.healthAssessmentData.faceDiagnose.moss">
                                {{this.healthAssessmentData.faceDiagnose.moss}}
                            </li>
                            <li style="text-align: left" v-if="this.healthAssessmentData.faceDiagnose.pulse">
                                {{this.healthAssessmentData.faceDiagnose.pulse}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="zh_test">
                    <div id="disease_box" class="pg_result" style="margin-bottom:20px ;clear: both;"
                         v-if="this.healthAssessmentData && this.healthAssessmentData.ur && this.healthAssessmentData.ur.length !== 0">
                        <p class="f20 yc_title">评估结论</p>
                        <div v-for="(urItem,index) in this.healthAssessmentData.ur" :key="index">
                            <p class="f20">{{urItem.diseaseName}}</p>
                        </div>
                    </div>
                </div>
                <div id="wuyang" @click="hopRouting()"><img src="../../../images/tyjianyi.png" alt=" "/></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        XHeader
    } from 'vux'
    import * as type from './module/mutations_types'
    import {
        mapGetters
    } from 'vuex'

    export default {
        components: {
            XHeader
        },
        computed: {
            ...mapGetters(['chineseMedicineLoading', 'chineseMedicineData', 'chineseMedicinerequestStatus'])
        },
        mounted() {
            this.seqNo = this.$route.query.seqNo
            console.log('this.seqNo', this.seqNo)
            this.$store.dispatch({
                type: type.GET_CHINESEMEDICINE_DATA,
                payload: {
                    seqNo: this.seqNo
                }
                // payload: {
                //     seqNo: '2017121509544800057'
                // }
            });
            if (this.healthAssessmentData.score) {
                this.ringCanvas(this.healthAssessmentData.score)
            }
        },
        updated() {
            if (this.healthAssessmentData) {
                if (this.healthAssessmentData.score) {
                    this.ringCanvas(this.healthAssessmentData.score)
                }
            }
        },
        data() {
            return {
                headerData: {
                    headerTitle: '评估报告'
                },
                diseaseCode: [],
                loadError: false,
                firstLoad: true,
                seqNo: '',
                healthAssessmentData: {},
                disease: ''
            }
        },
        watch: {
            chineseMedicineLoading(loading) {
                console.log('chineseMedicineLoading', loading)
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.firstLoad = false
                    console.log(this.firstLoad)
                    this.$layer.close()
                    let chineseMedicinerequestStatus = this.$store.getters.chineseMedicinerequestStatus
                    if (chineseMedicinerequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(chineseMedicinerequestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        let chineseMedicineData = this.$store.getters.chineseMedicineData
                        console.log('chineseMedicineData', this.chineseMedicineData)
                        this.healthAssessmentData = chineseMedicineData
                        if (this.healthAssessmentData.ur) {
                            this.diseaseToString(this.healthAssessmentData.ur)
                        }
                        if (this.healthAssessmentData.score) {
                            this.ringCanvas(this.healthAssessmentData.score)
                        }
                    }
                }
            }
        },
        methods: {
            diseaseToString(ur) {
                for (let i = 0; i < ur.length; i++) {
                    this.diseaseCode.push(ur[i].medical + ':' + ur[i].diseaseId)
                }
            },
            hopRouting() {
                this.$router.push({
                    path: '/aftercare',
                    query: {
                        diseaseCode: this.diseaseCode.join(';')
                    }
                })
            },
            againLoad() {
                this.$store.dispatch({
                    type: type.GET_CHINESEMEDICINE_DATA,
                    payload: {
                        seqNo: this.seqNo
                    }
                });
            },
            showLoadMsg(msg, time = 2000) {
                this.$layer.toast({
                    content: msg,
                    time: time
                })
            },
            drawFrame() {
                // window.requestAnimationFrame(this.drawFrame);
                this.ringCanvas(this.healthAssessmentData.score)
            },
            ringCanvas(speed) {
                let canvas = this.$refs.myChart;
                if (!canvas) {
                    return
                }
                let rad = Math.PI * 2 / 100;
                let bgcolor = '#e7e7e7';
                let forecolor = '#ff801a';
                let context = canvas.getContext('2d');
                let centerX = canvas.width / 2;
                let centerY = canvas.height / 2;
                context.clearRect(0, 0, canvas.width, canvas.height);
                // 绘制背景圆圈
                context.save();
                context.beginPath();
                // 设置线宽
                context.lineWidth = 20;
                let radius = centerX - context.lineWidth;
                context.lineCap = 'round'
                context.strokeStyle = bgcolor;
                context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
                context.stroke();
                context.closePath();
                context.restore();
                // 绘制运动圆环
                context.save();
                context.strokeStyle = forecolor;
                context.lineWidth = 20;
                context.lineCap = 'round';
                context.beginPath();
                // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                context.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + speed * rad, false);
                context.stroke();
                context.closePath();
                context.restore();
                // 绘制文字
                // save和restore可以保证样式属性只运用于该段canvas元素
                context.save();
                context.fillStyle = forecolor;
                let fontZize = 50;
                context.font = fontZize + 'px Helvetica';
                // let textWidth = context.measureText(speed.toFixed(0) + '%').width;
                context.font = 130 + 'px Helvetica';
                // 分数
                context.fillText(speed, 120, centerY + fontZize / 5);
                context.font = 30 + 'px Helvetica';
                context.fillText('分', 260, centerY + fontZize / 5);
                context.font = 40 + 'px Helvetica';
                context.fillText('评估指数', 120, 280);
                context.restore();
                // if (speed !== 80) {
                //     this.speed += 1;
                //     this.drawFrame()
                // }
            }
        }
    }
</script>

<style scoped>
    @import '../../../style/healthReport/ChineseMedicine.css';

    * {
        margin: 0;
        padding: 0;
    }

    body {
        width: 100%;
        height: 100%;
    }

    .newmessage {
        padding: 20px;
    }

    .newmessage p {
        margin: 3px 0;
        font-size: 18px;
    }

    .message {
        width: 100px;
    }

    .message img {
        width: 100%
    }

    .inputHei {
        height: 44px;
    }

    .imgp {
        margin-top: 12px;
        margin-bottom: 12px;
        float: left;
        width: 20px;
    }

    .textGrayColor {
        color: rgb(128, 128, 128);
    }

    .new {
        color: #04BE02;
        font-weight: bold;
    }

    .warning {
        color: #D7342E;
        font-weight: bold;
    }

    .test_message,
    .wzresult,
    .tz_test {
        background: #fff;
        padding: 10px;
        text-align: center;
    }

    .tz_test {
        border-bottom: 1px solid gainsboro;
    }

    .test_message .title {
        font-size: 18px;
    }

    .wz_bg {
        display: inline-block;
        vertical-align: top;
        width: 24%;
        height: 30%;
        text-align: center;
    }

    .wz_photo {
        width: 100%;
        text-align: center;
        margin: auto;
    }

    img {
        width: 100%;
    }

    .wz_photo img {
        width: 100%;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
    }

    .wzresult {
        border-bottom: 1px solid gainsboro;
    }

    .wzresult ul {
        margin: 10px auto;
        text-align: left;
        font-size: 14px;
    }

    .wzresult ul li {
        margin: 3px 0;
    }

    .xy {
        text-align: start;
    }

    .xy div {
        display: inline-block;
        width: 49%;
        text-align: center;
    }

    h2 {
        padding: 20px;
    }

    .tz_list > div {
        overflow: hidden;
        padding: 10px;
        width: 80px;
        height: 80px;
        display: inline-block;
        background: red;
        border-radius: 5px;
        margin-bottom: 5px;
    }

    .tz_list > div p {
        font-size: 12px;
        line-height: 1.2;
    }

    .f12 {
        font-size: 14px;
    }

    .f25 {
        font-size: 30px !important
    }

    .f20 {
        font-size: 20px !important
    }

    .red {
        color: red;
    }

    .grey {
        color: darkgrey;
    }

    .yc_test {
        /*padding-bottom: 20px;*/
    }

    .yc_test p {
        font-size: 12px;
    }

    .more {
        padding: 10px;
        text-align: right;
    }

    .more span {
        display: inline-block;
        width: 70px;
        height: 20px;
        border: 1px solid #0076FF;
        color: #0076FF;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        border-radius: 15px;
    }

    #anomaly_list {
        margin: 0;
        height: 77px;
        overflow: hidden;
    }

    #anomaly_list span {
        font-size: 12px;
        margin: -2px;
        margin-left: 5px;
    }

    .history_pg span {
        display: inline-block;
        width: 120px;
        height: 30px;
        border-radius: 15px;
        background: #0000FF;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
    }

    .zh_test {
        padding-top: 10px;
        text-align: center;
        background: #fff;
    }

    .history_pg {
        margin: 10px 0;
    }

    .time {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-right: 5px;
    }

    .history_pg span img {
        width: 100%;
        vertical-align: middle;
    }

    .jl_result {
        text-align: start;
    }

    .jl_result a {
        display: inline-block;
        width: 49%;
        text-align: center;
        color: #000;
        font-size: 14px;
    }

    .nj_result {
        text-align: center;
        background: #ffffff;
        padding: 10px;
    }

    .chartbox {
        margin: 0 auto;
        background: #ffffff;
    }

    .chartbox2 {
        margin: 0 auto;
        text-align: center;
        font-size: 18px;
        color: #ff801a;
    }

    .myChart {
        /*width: 180px;*/
        height: 180px;
        display: block;
        margin: 0 auto;
    }

    .yc_title {
        border: 1px solid #0076FF;
        width: 40%;
        margin: 20px auto;
        border-radius: 15px;
        color: #0076FF;
    }

    .face p {
        text-align: start;
    }

    .face div {
        display: inline-block;
        width: 35%;
        text-align: center;
        padding-left: 54px;
    }

    .Tongue p {
        text-align: start;
    }

    .Tongue div {
        display: inline-block;
        width: 35%;
        text-align: center;
        padding-left: 54px;
    }

    #wuyang {
        cursor: pointer;
    }

    #faceList {
        margin-top: 0;
        margin-left: 14px;
        display: inline-block;
        width: 70%;
        list-style: none;
        counter-reset: count;
    }

    #faceList li {
        line-height: 24px;
        font-size: 12px;
    }

    #faceList li:before {
        content: "●";
        color: #2AA6FF;
    }

    .time-graph {
        padding-top: 20px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
    }

    #time-graph-canvas {
        width: 400px;
        height: 400px;
    }

    .tz_title {
        position: relative;
        text-align: start;
        margin: 10px 0;
    }

    .tz_more {
        position: absolute;
        right: 0;
        top: 0;
        font-family: PingFangSC-Light;
        font-size: 10px;
        color: #2AA6FF;
    }

    .nj_more {
        position: absolute;
        right: 0;
        top: 0;
        font-family: PingFangSC-Light;
        font-size: 10px;
        color: #2AA6FF;
    }

    .wz_title {
        position: relative;
        text-align: start;
        margin: 16px 0;
    }

    .wz_more {
        position: absolute;
        right: 0;
        top: 0;
        font-family: PingFangSC-Light;
        font-size: 10px;
        color: #2AA6FF;
    }

    #plan {
        background: #fff;
        padding: 10px;
        border-bottom: 1px solid gainsboro;
    }

    .plan_title {
        position: relative;
    }

    .plan_detail {
        position: absolute;
        top: 5px;
        right: 0;
        font-family: PingFangSC-Light;
        font-size: 10px;
        color: #2AA6FF;
    }

    .plan_list {
        margin: 10px 0;
    }

    .plan_list ul {
        display: flex;
        justify-content: space-between;
        list-style: none;
        text-align: center;
    }

    .plan_list ul div {
        margin: 0;
        font-size: 12px;
        color: #4A4A4A;
    }

    .plan_list ul li {
        width: 18%;
        font-size: 12px;
        color: #4A4A4A;
    }

    #anomaly_index {
        padding: 10px;
        background: #fff;
        position: relative;
        border-bottom: 1px solid gainsboro;
    }

    #anomaly_list {
        display: inline-block;
        width: 75%;
        margin: 0;
        height: 77px;
        overflow: hidden;
    }

    #anomaly_list li {
        height: 25.6px !important;
    }

    #anomaly_list span {
        font-size: 12px;
        margin: -2px;
        margin-left: 5px;
    }

    #no_anomaly {
        color: darkgreen;
        font-size: 12px;
        display: none;
    }

    #anomaly_btn {
        display: none;
        position: absolute;
        top: 26px;
        right: 16px;
        font-family: PingFangSC-Light;
        font-size: 10px;
        color: #2AA6FF;
    }

    .anomaly_icon {
        display: inline-block;
        width: 23%;
        vertical-align: top;
        margin-top: 10px;
    }

    .weui-grid:after {
        border: 0;
    }

    .weui-grid:before {
        border: 0;
    }

    .weui-grids:before {
        border: 0;
    }

    .weui-grids:after {
        border: 0;
    }

    .weui-grid {
        padding: 0;
        margin-top: 20px;
    }

    .weui-grid__icon {
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }

    .time-graph {
        padding-top: 20px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
    }

    #time-graph-canvas {
        width: 200px;
        height: 200px;
    }
</style>

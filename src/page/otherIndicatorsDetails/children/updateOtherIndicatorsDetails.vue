<template>
    <div class="div1">
        <custom-header :headerData="headerData"></custom-header>
        <div style="margin-top: 0px; " class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="  weui-label" style="font-size:17px">{{indexContent.title}}</label>
                </div>
                <div class="weui-cell__bd">
                    <input id="heightS" class="weui-input" type="number" :placeholder="indexContent.reminder"
                           v-model="val">
                </div>
                <div>{{indexContent.unit}}</div>
            </div>
        </div>
        <group style="margin-top: -13px;">
            <datetime title="测量日期" v-model="date" :end-date="endDate" format="YYYY-MM-DD"></datetime>
        </group>
        <!--<div style="margin-top: 0px; " class="weui-cells weui-cells_form" v-if="unit2[0]">-->
            <!--<div class="weui-cell">-->
                <!--<div class="weui-cell__hd">-->
                    <!--<label class="weui-label" style="font-size:17px">{{unit2[0]}}</label>-->
                <!--</div>-->
                <!--<div class="weui-cell__bd">-->
                    <!--<input class="weui-input" type="number" :placeholder="reminder1"-->
                    <!--&gt;-->
                <!--</div>-->
                <!--<div>{{unit2[1]}}</div>-->
            <!--</div>-->
        <!--</div>-->
        <a style="border-radius:10px; margin-top: 20px;margin-bottom:10px;background-color: #B81C26;"
           class="weui-btn weui-btn_warn2"
           @click="submitHandler"
        >
            提交
        </a>
    </div>
</template>
<script>
    //  import { mapGetters } from 'vuex'
    import moment from 'moment'
    import { mapGetters } from 'vuex'
    import { XHeader, Group, Datetime } from 'vux'
    export default {
        data() {
            return {
                headerData: {
                    headerTitle: ''
                },
                endDate: moment().format('YYYY-MM-DD'),
                indexContent: {
                    title: '体重',
                    unit: 'kg',
                    reminder: '请输入体重如 98'
                },
                val: '',
                date: ''
            }
        },
        components: {
            XHeader, Group, Datetime
        },
        watch: {
            loadingUpdateOtherIndicators (loading) {
                if (loading) {
                    this.$layer.loading('更新中...')
                } else {
                    this.$layer.close()
                    let requestStatus = this.$store.getters.updateOtherIndicatorsRequestStatus
                    if (requestStatus.status === '1') {
                        // 显示提示信息
                        this.$layer.toast({
                            content: requestStatus.msg,
                            time: 2000
                        })
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 500)
                        // this.$router.push({
                        //     name: 'otherIndicatorsDetails',
                        //     query: {
                        //         quotaCode: this.$route.query.quotaCode
                        //     }
                        // })
                    }
                }
            }
        },
        computed: {
            ...mapGetters(['loadingUpdateOtherIndicators'])
        },
        methods: {
            submitHandler () {
                if (this.val === '') {
                    this.$layer.toast({
                        content: '提交数据不能为空',
                        time: 2000
                    })
                    return false
                }
                if (this.date === '') {
                    this.$layer.toast({
                        content: '请选择测量日期',
                        time: 2000
                    })
                    return false
                }
                this.$store.dispatch({
                    type: 'UPDATEOTHERINDICATORS',
                    payload: {
                        data: [
                            {
                                quotaCode: this.$route.query.quotaCode,
                                quotaDate: this.date,
                                systemDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                quotaValue: this.val,
                                quotaText: ''
                            }
                        ]
                    }
                })
            }
        },
        mounted() {
            console.log(this.$route.query, 'this.$route.query')
            let code = this.$route.query.quotaCode
            switch (code) {
                case 'XYZBXY0010240':
                    this.headerData.headerTitle = '体脂录入'
                    this.indexContent.title = '体脂'
                    this.indexContent.unit = '%'
                    this.indexContent.reminder = '请输入体脂'
                    break
                case 'XYZBXY0010241':
                    this.headerData.headerTitle = '体脂录入'
                    this.indexContent.title = '体脂'
                    this.indexContent.unit = '%'
                    this.indexContent.reminder = '请输入体脂'
                    break
                case 'XYZBXY001007':
                    this.headerData.headerTitle = '体重录入'
                    this.indexContent.title = '体重'
                    this.indexContent.unit = 'kg'
                    this.indexContent.reminder = '请输入体重'
                    break
                case 'XYZBXY001008':
                    this.headerData.headerTitle = '血糖录入'
                    this.indexContent.title = '血糖'
                    this.indexContent.unit = 'mmol/l'
                    this.indexContent.reminder = '请输入血糖'
                    break
                case 'XYZBXY001013':
                    this.headerData.headerTitle = '身高录入'
                    this.indexContent.title = '身高'
                    this.indexContent.unit = 'cm'
                    this.indexContent.reminder = '请输入身高'
                    break
                case 'XYZBXY001006':
                    this.headerData.headerTitle = '体温录入'
                    this.indexContent.title = '体温'
                    this.indexContent.unit = '℃'
                    this.indexContent.reminder = '请输入体温'
                    break
                case 'XYZBXY001004':
                    this.headerData.headerTitle = '血氧录入'
                    this.indexContent.title = '血氧'
                    this.indexContent.unit = '%'
                    this.indexContent.reminder = '请输入血氧'
                    break
                case 'XYZBXY001025':
                    this.headerData.headerTitle = '防摔指数录入'
                    this.indexContent.title = '防摔指数'
                    this.indexContent.unit = '分'
                    this.indexContent.reminder = '请输入防摔指数'
                    break
                case 'XYZBXY001026':
                    this.headerData.headerTitle = '睡眠时间录入'
                    this.indexContent.title = '睡眠'
                    this.indexContent.unit = '小时'
                    this.indexContent.reminder = '请输入睡眠时间'
                    break
                case 'XYZBXY001027/XYZBXY001028/XYZBXY001026':
                    this.headerData.headerTitle = '睡眠时间录入'
                    this.indexContent.title = '睡眠'
                    this.indexContent.unit = '小时'
                    this.indexContent.reminder = '请输入睡眠时间'
                    break
                case 'XYZBXY001005':
                    this.headerData.headerTitle = '心率录入'
                    this.indexContent.title = '心率'
                    this.indexContent.unit = 'b/min'
                    this.indexContent.reminder = '请输入心率指标'
                    break
            }
        }
    }
</script>
<style scoped>
    label {
        margin-bottom: 0px;
    }

    .div1 {
        /*background-color: #efeff4;*/
    }

    .weui-cells {
        /*margin-top: 1.17647059em;*/
        background-color: #fff;
        line-height: 1.41176471;
        font-size: 17px;
        overflow: hidden;
        position: relative;
        text-align: left;
    }

    .weui-cell {
        padding: 10px 15px;
        position: relative;
        display: flex;
        align-items: center;
    }

    .weui-label {
        display: block;
        width: 105px;
        word-wrap: break-word;
        word-break: break-all;
    }

    .weui-cell__bd {
        -webkit-box-flex: 1;
        flex: 1;
    }

    .weui-input {
        width: 100%;
        border: 0;
        outline: 0;
        -webkit-appearance: none;
        background-color: transparent;
        font-size: inherit;
        color: inherit;
        height: 1.41176471em;
        line-height: 1.41176471;
    }

    .weui-btn {
        position: relative;
        display: block;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 14px;
        padding-right: 14px;
        box-sizing: border-box;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        color: #fff;
        line-height: 2.55555556;
        border-radius: 5px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        overflow: hidden;
        background-color: #2378f7;
    }
</style>

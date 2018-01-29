<template>
    <div class="home" v-if="homeData" style="background-color: #ffffff;" ref="home">
        <custom-header :headerData="headerData"></custom-header>
        <div v-if="this.loadError">
            <keep-alive>
                <reload-page :reload="this.againLoad"></reload-page>
            </keep-alive>
        </div>
        <div v-else>
            <div v-if="this.firstLoadStatus">
                <p>正在加载中</p>
            </div>
            <div v-else>
                <div class="health_title">
                    <p>健康概述</p>
                    <router-link to="/healthPortrait">
                        <span>查看健康肖像</span>
                    </router-link>
                </div>
                <group label-width="5.5em" label-margin-right="1em" label-align="left" v-if="homeData.healthDescription"
                       gutter="0">
                    <x-input readonly="readonly" title="姓名"
                             :value="homeData.healthDescription.userName ? homeData.healthDescription.userName:''"></x-input>
                    <x-input readonly="readonly" title="性别"
                             :value="genderType(homeData.healthDescription.gender)"></x-input>
                    <x-input readonly="readonly" title="出生日期"
                             :value="homeData.healthDescription.birthday ? homeData.healthDescription.birthday : ''"></x-input>
                    <x-input readonly="readonly" title="血型"
                             :value="bloodType(homeData.healthDescription.blood)"></x-input>
                    <x-input readonly="readonly" title="禁忌药品"
                             :value="getValue(homeData.healthDescription.tabooDrugs, 'drug')">
                    </x-input>
                    <!--<x-input readonly="readonly" title="过敏原"-->
                             <!--:value="getValue(homeData.healthDescription.allergen, 'allergen')"></x-input>-->
                    <div style="width: 100%;height: 1px;background-color: #d9d9d9;margin: 0px 15px;"></div>
                    <health-item :itemValue="getValue(homeData.healthDescription.allergen, 'allergen')">
                        <div slot="illnessTitle">
                            <div class="weui-cell__hd">
                                <label class="weui-label"
                                       style="width: 5.5em; text-align: left; margin-right: 1em;">
                                    过敏原
                                </label>
                            </div>
                        </div>
                    </health-item>
                    <div style="width: 100%;height: 1px;background-color: #d9d9d9;margin: 0px 15px;"></div>
                    <health-item :itemValue="getValue(homeData.healthDescription.nowMedicalHistory, 'healthProblems')">
                        <div slot="illnessTitle">
                            <div class="weui-cell__hd">
                                <label class="weui-label"
                                       style="width: 5.5em; text-align: left; margin-right: 1em;">
                                    现病史
                                </label>
                            </div>
                        </div>
                    </health-item>
                    <div style="width: 100%;height: 1px;background-color: #d9d9d9;margin: 0px 15px;"></div>

                    <health-item :itemValue="getValue(homeData.healthDescription.pastMedicalHistory, 'jwHis')">
                        <div slot="illnessTitle">
                            <div class="weui-cell__hd">
                                <label class="weui-label"
                                       style="width: 5.5em; text-align: left; margin-right: 1em;">
                                    既往病史
                                </label>
                            </div>
                        </div>
                    </health-item>

                    <x-input readonly="readonly" title="视力情况"
                             :value="getVisionValue(homeData.healthDescription.vision, 'eyesight')"></x-input>
                    <x-input readonly="readonly" title="听力情况"
                             :value="getVisionValue(homeData.healthDescription.hearing, 'hearing')"></x-input>
                </group>

                <div style="background-color:#efeff4;height: 15px;width: 100%;"></div>
                <div class="health_title" style="margin-top: 15px;">
                    <p>异常指标</p>
                    <router-link to="/indicators/allIndicators">
                        <span>查看所有指标</span>
                    </router-link>
                </div>
                <div class="abnormal" v-for="(item ,index) in homeData.abnormalQuota" :key="index">
                    <div style="font-size: 14px;flex-grow: 5;" class="title">{{item.quotaName}}</div>
                    <div style="font-size: 14px;flex-grow:6;color: #FF0202;text-align: left;">
                    <span v-if="item.quotaCode==='XYZBXY003018/XYZBXY003017'">
                        {{resolverValue(item.quotaValue)}}{{item.quotaUnit}}
                    </span>
                        <span v-else>{{item.quotaValue}}{{item.quotaUnit}}</span>

                    </div>

                    <div v-if="item.quotaCode !== 'XYZBXY001006'"
                         style="font-size: 11px;flex-grow:9;line-height: 1.7;text-align: right;">
                        <div>
                            <div v-if="item.quotaCode !== 'XYZBXY001027/XYZBXY001028/XYZBXY001026'">
                                <div v-if="item.quotaCode === 'XYZBXY001010'">
                                    <p style="margin: 0px;"></p>
                                    <p style=""></p>
                                </div>
                                <div v-else>
                                    <p style="margin: 0px;">
                                        参考范围</p>
                                    <p style="">{{item.quotaRange}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="item.quotaCode === 'XYZBXY001006'"
                         style="font-size: 12px;width:120px;line-height: 1.7;text-align: right;">
                        <my-pop :itemText="item.quotaRange"></my-pop>
                    </div>

                </div>

                <div style="background-color:#efeff4;height: 15px;width: 100%;"></div>

                <div class="health_title" style="margin-top: 15px;">
                    <p>重点关注指标</p>
                </div>
                <grid>
                    <grid-item style="width: 50%;border-bottom: 1px solid #efeff4;height: 188px;"
                               v-for="(indicator, index) in attentionIndexArr(homeData.careQuota)" :key="index">
                        <indicator-item :indicator="indicator"></indicator-item>
                    </grid-item>

                    <grid-item style="height: 188px;text-align: left;width: 50%;">
                        <router-link to="/indicators/addIndicator">
                            <div style="font-size: 14px;color: #000;margin-bottom: 16px;">添加您要重点关注的指标</div>
                            <img src="../../images/add.png" style="width: 48px;height: 48px;"/>
                        </router-link>
                    </grid-item>
                </grid>

                <div style="background-color:#efeff4;height: 15px;width: 100%;"></div>



                <div class="health_title" style="margin-top: 15px;">
                    <p>最近评估</p>
                    <router-link to="/appraisalRepor/appraisalReportList">
                        <span>查看更多</span>
                    </router-link>
                </div>
                <div>
                    <div v-if="!homeData.reportList.length" style="line-height: 40px;text-align: left;padding-left: 15px;">
                        未检测到数据!!!
                    </div>
                    <div v-else>
                        <div style="display: flex;line-height: 30px;padding: 0 15px;border-bottom: 1px solid #EFEFF4;">
                            <div style="width:30%;font-size: 16px;color: #000000;text-align: center;">时间</div>
                            <div style="width:35%;font-size: 16px;color: #000000;text-align: center;">地点</div>
                            <div style="width:35%;font-size: 16px;color: #4a4a4a;text-align: center;">名称</div>
                        </div>

                        <div style="background-color: #FFFFFF;text-align: left;padding: 0 15px;"
                             v-for="(item, index) in homeData.reportList" :key="index" @click="reportItemClick(item)">
                            <div style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;">
                                <div style="width:30%;font-size: 12px;color: #000000;text-align: center;">{{ conversionTime(item.reportDate)
                                    }}
                                </div>
                                <div style="flex-grow:5;font-size: 18px;color: #9b9b9b;text-align: center;word-wrap:break-word;">{{ item.reportAdress }}</div>
                                <div style="flex-grow:5;font-size: 17px;color: #4a4a4a;text-align: center;word-wrap:break-word;">{{ item.reportName
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="background-color:#efeff4;height: 15px;width: 100%;"></div>



                <div class="health_title" style="margin-top: 15px;">
                    <p>最近体检记录</p>
                    <router-link to="/medicalRecord">
                        <span>查看更多</span>
                    </router-link>
                </div>

                <div>
                    <div v-if="!homeData.recordList.length" style="line-height: 40px;text-align: left;padding-left: 15px;">
                        未检测到数据!!!
                    </div>
                    <div v-else>
                        <div style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;">
                            <div style="width:30%;font-size: 16px;color: #000000;text-align: center;">时间</div>
                            <div style="width: 35%;font-size: 16px;color: #000000;text-align: center;">地点</div>
                            <div style="width: 35%;font-size: 16px;color: #4a4a4a;text-align: center;">名称</div>
                        </div>
                        <div style="background-color: #FFFFFF;text-align: left;padding: 0px 15px;"
                             v-for="(item, index) in homeData.recordList" :key="index" @click="medicalRecordItemClick(item)">
                            <div style="display: flex;border-bottom: 1px solid #EFEFF4;line-height: 30px;">
                                <div style="width:30%;font-size: 13px;color: #000000;text-align: center;">{{ conversionTime(item.reportDate) }}
                                </div>
                                <div style="width:35%;word-wrap:break-word;font-size: 14px;color: #9b9b9b;text-align: center;">{{ item.reportAdress }}</div>
                                <div style="width:35%;word-wrap:break-word;font-size: 14px;color: #4a4a4a;text-align: center;">{{ item.reportName
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div style="background-color:#efeff4;height: 15px;width: 100%;"></div>


            </div>
        </div>
    </div>
</template>
<script>
    import CustomHeader from '../../../src/components/CustomHeader'
    import ItemHome from './components/ItemHome'
    import HealthItem from './components/HealthItem'
    import * as type from './module/mutations_types'
    import moment from 'moment'
    import storage from '../../config/storageHelp'
    import IndicatorItem from '../indicators/allIndicators/components/indicatorItem'
    import MyPop from '../../components/MyPop'
    import axios from 'axios'
    import {
        mapGetters
    } from 'vuex'
    import {
        Cell,
        Group,
        XHeader,
        XInput,
        Grid,
        GridItem
    } from 'vux'
    import * as dictionary from '../../utils/dictionaryUtils'
    import qs from 'qs'
    export default {
        data() {
            return {
                headerData: {
                    headerTitle: '健康档案首页',
                    routerTitle: '',
                    routerPath: '',
                    backCall: () => {
                        if (this.isPC()) {
                            // pc不做任何处理
                            // window.location.href = 'www.123.lkj'
                            // alert('pc')
                        } else {
                            window.location.href = 'www.back.lkj'
                        }
                    }
                },
                showDialogStyle: false,
                loadError: false,
                msg: 'clickMe',
                firstLoadStatus: true,
                tabooDrugs: '青霉素',
                routerList: [{
                    path: '/pressure'
                }, {
                    path: '/mianshezhen'
                }]
            }
        },
        components: {
            Cell,
            Group,
            XHeader,
            XInput,
            Grid,
            GridItem,
            ItemHome,
            HealthItem,
            CustomHeader,
            IndicatorItem,
            MyPop
        },
        computed: {
            ...mapGetters([
                'homeDataLoading', 'homeData', 'HomeRequestStatus'
            ])
        },
        watch: {
            homeDataLoading(loading) {
                if (loading) {
                    this.$layer.loading('加载中...')
                    this.firstLoadStatus = true
                } else {
                    this.$layer.close()
                    this.firstLoadStatus = false
                    let homeRequestStatus = this.$store.getters.HomeRequestStatus
                    // console.log('homeRequestStatus', homeRequestStatus);
                    if (homeRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(homeRequestStatus.msg)
                        this.loadError = true
                        // this.getToken()
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        let homePosition = sessionStorage.getItem('homePosition')
                        this.scrollYPosition(homePosition)
                        // console.log('allIndicatorsData', JSON.stringify(allIndicatorsData))
                    }
                }
            }
        },
        methods: {
            attentionIndexArr (item) {
                return dictionary.reorderArr(item)
            },
            conversionTime(time) {
                return moment(time).format('YYYY/MM/DD')
            },
            isPC() {
                let userAgentInfo = navigator.userAgent;
                let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
                let flag = true;
                for (let v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            },
            resolverValue(item) {
                let str = ''
                //  console.log(item, 'itemitemitemitemitemitem')
                if (item) {
                    let arr = item.split('#')
                    console.log(arr, 'valuesvaluesvaluesvaluesvaluesvalues')
                    str = arr[0] + '/' + arr[1]
                    return str
                }
                return false
            },
            reportItemClick(reportItem) {
                console.log('reportItem click', reportItem)
                if (reportItem.reportType === '1') {
                    // 内部评估报告
                    console.log('checkType', reportItem)
                    if (reportItem.checkType === 'WESTERN') {
                        this.$router.push({
                            path: '/westernMedicine',
                            query: {
                                checkType: reportItem.checkType,
                                seqNo: reportItem.seqNo,
                                reportName: reportItem.reportName
                            }
                        })
                    } else if (reportItem.checkType === 'FACE_TONGUE') {
                        this.$router.push({
                            path: '/chineseMedicine',
                            query: {
                                checkType: reportItem.checkType,
                                seqNo: reportItem.seqNo,
                                reportName: reportItem.reportName
                            }
                        })
                    }
                } else if (reportItem.reportType === '2') {
                    // 外部评估报告
                    console.log('checkType', reportItem)
                    this.$router.push({
                        path: '/appraisalRepor/appraisalReportList/externalDetails',
                        query: {
                            seqNo: reportItem.seqNo,
                            reportName: reportItem.reportName
                        }
                    })
                } else {
                    console.log('reportType 不存在', reportItem.reportType)
                }
            },
            medicalRecordItemClick(item) {
                this.$router.push({
                    path: '/medicalRecordDetail',
                    query: {
                        checkType: item.checkType,
                        seqNo: item.seqNo,
                        reportName: item.reportName
                    }
                })
            },
            selectedPath(item) {
                if (item.quotaCode === 'XYZBXY001001' | item.quotaName === '面舌诊' | item.quotaName === '防摔指数') {
                    return false
                } else if (item.quotaName === '血压' | item.quotaName === '血脂') {
                    this.$router.push({
                        'name': 'pressure',
                        query: {
                            highCode: item.quotaCode.split('/')[0],
                            lowCode: item.quotaCode.split('/')[1]
                        }
                    })
                } else if (item.quotaCode === 'XYZBXY001010') {
                    this.$router.push({
                        'name': 'ecg',
                        query: {
                            quotaCode: item.quotaCode
                        }
                    })
                } else if (item.quotaCode === 'XYZBXY001027/XYZBXY001028/XYZBXY001026') {
                    console.log(item.quotaCode.split('/'))
                    this.$router.push({
                        'name': 'pressure',
                        query: {
                            totalCode: item.quotaCode.split('/')[2],
                            lowCode: item.quotaCode.split('/')[0],
                            highCode: item.quotaCode.split('/')[1]
                        }
                    })
                } else {
                    this.$router.push({
                        name: 'otherIndicatorsDetails',
                        query: {
                            'quotaCode': item.quotaCode,
                            'queryTime': item.time,
                            'queryFlag': '4'
                        }
                    })
                }
            },
            bloodType(item) {
                if (!item) {
                    return '未知'
                }
                return dictionary.getValueByDictionaryKeyAndCode('blood', item)
            },
            getValue(item, key) {
                let drugList = dictionary.getListByDictionaryKey(key)
                //  console.log(typeof item)
                if (!item) {
                    return '无'
                } else if (!item.length) {
                    return '无'
                } else {
                    let str = ''
                    for (let i = 0; i < item.length; i++) {
                        for (let j = 0; j < drugList.length; j++) {
                            if (item[i].code === drugList[j].code) {
                                item[i].value = drugList[j].name
                                str = item[i].value + ' ' + str
                                // str += item[i].value
                            }
                        }
                    }
                    return str
                }
            },
            getVisionValue(item, key) {
                console.log(item, key)
                if (!item) {
                    return '无'
                }
                let visionList = dictionary.getListByDictionaryKey(key)
                for (let i = 0; i < visionList.length; i++) {
                    if (item === parseInt(visionList[i].code)) {
                        return visionList[i].name
                    }
                }
            },
            genderType(item) {
                if (!item) {
                    return '未知'
                }
                switch (item) {
                    case '0':
                        return '未知'
                    case '1':
                        return '男'
                    case '2':
                        return '女'
                }
            },
            againLoad() {
                this.$store.dispatch({
                    type: type.GET_HOME_DATA,
                    payload: {}
                })
            },
            getToken() {
                axios({
                    url: 'http://cudoc-web-dev-laikang.opaas.enncloud.cn/cu/user/login.do',
                    method: 'post',
                    data: {
                        userCode: '18512345675',
                        pwd: '123456',
                        tid: '',
                        ogid: ''
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: [function (data) {
                        // transformRequest 允许在向服务器发送前，修改请求数据
                        // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
                        // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
                        let submitData = qs.stringify(data)
                        // console.log('转化后', submitData)
                        return submitData;
                    }]
                }).then(function (response) {
                    // console.log('getToken ok', response)
                    let res = response.data
                    if (res.status && res.status === 'ok') {
                        let result = res.data
                        // console.log('result', result);
                        if (result && result.key) {
                            console.log('getToken--------', result.key)
                            storage.lktoken = result.key
                            storage.save()
                        }
                    }
                }).catch(function (error) {
                    // error
                    console.log('getToken error', error)
                })
            }
        },
        mounted() {
            let routerParams = this.$route.query
            //  console.log('routerParams', routerParams)
            if (routerParams.lktoken) {
                storage.lktoken = routerParams.lktoken
                storage.save()
            } else {
                // storage.lktoken = ''
            }
            this.againLoad()
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../style/reset.css";

    .home {
        /*padding-bottom: 15px;*/
        /*background-color: #FFFFFF;*/
        /*background-color: #efeff4;*/
    }

    .health_title {
        /*padding: 20px 15px;*/
        padding: 0 15px;
        text-align: left;
        background-color: #FFFFFF;
        display: flex;
        height: 60px;
        line-height: 60px;
        justify-content: space-between;
        p {
            font-size: 22px;
            color: #4a4a4a;
        }
        span {
            font-size: 14px;
            color: #2AA6FF;
        }
    }

    .special {
        color: #FF0202;
    }

    .home {
        background-color: #EFEFF4;
    }

    .abnormal {
        display: flex;
        /*justify-content: space-between;*/
        /*height: 41px;*/
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding: 0 15px;
        background-color: #FFFFFF;
        align-items: center;
        margin-bottom: 5px;
    }

    .abnormal > div > p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .abnormal .title {
        padding-left: 16px;
        background: url("../../images/abnormalIcon.png") no-repeat;
        background-position: left center;
        background-size: 14px 14px;
        /*border: 1px solid red;*/
    }

    .dialog-demo {
        .weui-dialog {
            border-radius: 8px;
            padding-bottom: 8px;
        }
        .dialog-title {
            line-height: 30px;
            color: #666;
        }
        .img-box {
            height: 200px;
            overflow: hidden;
        }
        .vux-close {
            margin-top: 8px;
            margin-bottom: 8px;
        }
    }
</style>

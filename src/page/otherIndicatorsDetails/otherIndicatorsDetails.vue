<!-- 柱状图 -->
<template>
    <div id="main" v-if="otherIndicatorsDetailsData">
            <custom-header :headerData="headerData"></custom-header>
            <div v-if="this.loadError">
                <keep-alive>
                    <reload-page :reload="this.againLoad"></reload-page>
                </keep-alive>
            </div>
            <!--<div style="display: flex;height: 36px;line-height: 36px;margin: 0 auto;font-size: 14px;-->
            <!--border: 1px solid #C0CCDA;border-radius: 2px;width: 296px;margin-top: 30px;">-->
            <!--<div style="width: 74px;border-right: 1px solid #C0CCDA;margin-bottom: -1px;">日</div>-->
            <!--<div style="width: 74px;border-right: 1px solid #C0CCDA;background-color: #20A0FF;color: #FFFFFF;margin-bottom: -1px;">-->
            <!--周-->
            <!--</div>-->
            <!--<div style="width: 74px;border-right: 1px solid #C0CCDA;margin-bottom: -1px;">月</div>-->
            <!--<div style="width: 74px;margin-bottom: -1px;">年</div>-->
            <!--</div>-->
            <!--<div style="text-align: left;padding-left: 15px;margin-top: 50px;">-->
            <!--&lt;!&ndash;<h1 style="font-size: 18px;font-weight: normal;margin-bottom: 10px;">本周历史记录</h1>&ndash;&gt;-->
            <!--<p style="font-size: 15px;color: #4a4a4a;">时间范围:-->
            <!--{{otherIndicatorsDetailsData.contentData.timeRange}}</p>-->
            <!--<p style="font-size: 15px;color: #4a4a4a;">当前日期: {{otherIndicatorsDetailsData.contentData.curTime}}</p>-->
            <!--<p style="color: orangered;">所选日期体重值: {{otherIndicatorsDetailsData.contentData.curIndicator}}</p>-->
            <!--</div>-->
        <!--<div id="myChart">-->
        <!--</div>-->
            <div v-else>
                <div v-if="this.otherIndicatorsDetailsData.dataList && this.otherIndicatorsDetailsData.dataList.length">
                    <echart-bar :barData="otherIndicatorsDetailsData"></echart-bar>
                </div>
                <div v-else>暂时没有数据,请添加数据!!!!</div>
            </div>
    </div>
</template>
<script>
    import EchartBar from './components/EchartBar'
    import { XButton, XHeader } from 'vux'
    import { mapGetters } from 'vuex'
    import * as type from './module/mutations_types'
    import moment from 'moment'
    export default {
        name: 'hello',
        data () {
            return {
                loadError: false,
                firstLoadStatus: true,
                headerData: {
                    headerTitle: '',
                    routerTitle: '',
                    routerPath: '/updateOtherIndicatorsDetails',
                    routerQuery: {
                        quotaCode: this.$route.query.quotaCode
                    }
                }
            }
        },
        components: {
            XButton, XHeader, EchartBar
        },
        computed: {
            ...mapGetters([
                'otherIndicatorsDetailsLoading', 'otherIndicatorsDetailsData'
            ])
        },
        watch: {
            otherIndicatorsDetailsLoading (loading) {
                if (loading) {
                    this.$layer.loading('加载中...')
                    this.firstLoadStatus = true
                } else {
                    this.$layer.close()
                    this.firstLoadStatus = false
                    let requestStatus = this.$store.getters.otherIndicatorsDetailsRequestStatus
                    if (requestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(requestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                    }
                }
            },
            deep: true
        },
        mounted () {
            this.againLoad()
            console.log('routeQuery是多少', this.$route.query)
            let code = this.$route.query.quotaCode
            switch (code) {
                case 'XYZBXY0010240':
                    this.headerData.headerTitle = '体脂历史记录'
                    this.headerData.routerTitle = '添加体脂'
                    break
                case 'XYZBXY0010241':
                    this.headerData.headerTitle = '体脂历史记录'
                    this.headerData.routerTitle = '添加体脂'
                    break
                case 'XYZBXY001007':
                    this.headerData.headerTitle = '体重历史记录'
                    this.headerData.routerTitle = '添加体重'
                    break
                case 'XYZBXY001008':
                    this.headerData.headerTitle = '血糖历史记录'
                    this.headerData.routerTitle = '添加血糖'
                    break
                case 'XYZBXY001013':
                    this.headerData.headerTitle = '身高历史记录'
                    this.headerData.routerTitle = '添加身高'
                    break
                case 'XYZBXY001006':
                    this.headerData.headerTitle = '体温历史记录'
                    this.headerData.routerTitle = '添加体温'
                    break
                case 'XYZBXY001004':
                    this.headerData.headerTitle = '血氧历史记录'
                    this.headerData.routerTitle = '添加血氧'
                    break
                case 'XYZBXY001025':
                    this.headerData.headerTitle = '防摔历史记录'
                    this.headerData.routerTitle = '添加防摔'
                    break
                case 'XYZBXY001005':
                    this.headerData.headerTitle = '心率'
                    this.headerData.routerTitle = '请添加心率'
                    break
                case 'XYZBXY001010':
                    this.headerData.headerTitle = '心电'
                    this.headerData.routerTitle = '添加心电'
                    this.headerData.routerPath = '/updateEcg'
                    break
            }
        },
        methods: {
            showLoadMsg (msg, time = 2000) {
                this.$layer.toast({
                    content: msg,
                    time: time
                })
            },
            againLoad() {
                this.$store.dispatch({
                    type: type.GET_OTHERINDICATORSDETAILS_INFO,
                    payload: {
                        data: {
                            quotaCode: [
                                {
                                    code: this.$route.query.quotaCode
                                }
                            ],
                            queryTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                            queryFlag: '2'
                        }
                    }
                })
            }
        }
    }
</script>
<style scoped>
    /**{box-sizing: border-box;}*/
    html, body, #main {
        width: 100%;
        height: 100%;
        margin: 0;
    }

    #main {
        background: #fff;
    }

    #myChart {
        width: 100%;
        height: 400px;
        margin-top: 10px;
    }

    .chart_title {
        font-size: 18px;
        color: #666666;
    }

    .submit {
        margin-top: 20px;
    }

    button.weui-btn {
        width: 90%;
        background-color: #2378f7;
    }
</style>

<style scoped>
    /**{box-sizing: border-box;}*/
    html, body, #main {
        width: 100%;
        height: 100%;
        margin: 0;
    }

    #main {
        background: #fff;
    }

    #myChart {
        width: 100%;
        height: 400px;
        margin-top: 10px;
    }

    .chart_title {
        font-size: 18px;
        color: #666666;
    }

    .submit {
        margin-top: 20px;
    }

    button.weui-btn {
        width: 90%;
        background-color: #2378f7;
    }
</style>

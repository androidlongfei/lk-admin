<!-- 柱状图 -->
<template>
    <div id="main">
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
            <div v-else>
                <!--<div style="text-align: left;padding-left: 15px;margin-top: 50px;">-->
                    <!--<h1 style="font-size: 18px;font-weight: normal;margin-bottom: 10px;">本周历史记录</h1>-->
                    <!--<p style="font-size: 15px;color: #4a4a4a;">时间范围: 2017年01月-2017年11月</p>-->
                    <!--<p style="font-size: 15px;color: #4a4a4a;">当前日期: 2017年11月29日 星期四</p>-->
                    <!--<p style="color: orangered;">所选日期血压值: 后台获取数据</p>-->
                <!--</div>-->
                <div v-if="this.pressureData.dataList && this.pressureData.dataList.length">
                    <pressure :pressureData="pressureData"></pressure>
                </div>
                <div v-else>暂时没有数据,请添加数据!!!!</div>
            </div>
        <!--<router-link to="/updatePressure">-->
            <!--<div class="submit">-->
                <!--<x-button type="primary">添加血压</x-button>-->
            <!--</div>-->
        <!--</router-link>-->
    </div>
</template>

<script>
    import Pressure from './components/Pressure'
    import CustomHeader from '../../../src/components/CustomHeader'
    import * as type from './module/mutations_types'
    import moment from 'moment'
    import { XButton } from 'vux'
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: 'hello',
        data () {
            return {
                text: '',
                loadError: false,
                firstLoadStatus: true,
                headerData: {
                    headerTitle: '',
                    routerTitle: '添加',
                    routerPath: '/updatePressure',
                    routerQuery: {
                        totalCode: this.$route.query.totalCode,
                        lowCode: this.$route.query.lowCode,
                        highCode: this.$route.query.highCode
                    }
                }
            }
        },
        computed: {
            ...mapGetters([
                'LOADINGPRESSUEDATA', 'pressureData'
            ])
        },
        watch: {
            LOADINGPRESSUEDATA (loading) {
                if (loading) {
                    this.$layer.loading('加载中...')
                    this.firstLoadStatus = true
                } else {
                    this.$layer.close()
                    this.firstLoadStatus = false
                    let requestStatus = this.$store.getters.pressureRequestStatus
                    if (requestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(requestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                    }
                }
            }
        },
        components: {
            XButton, CustomHeader, Pressure
        },
        methods: {
            againLoad() {
                let code = this.$route.query.highCode
                if (code === 'XYZBXY001003') {
                    this.headerData.headerTitle = '血压历史记录'
                } else if (code === 'XYZBXY003018') {
                    this.headerData.headerTitle = '血脂历史记录'
                } else if (code === 'XYZBXY001028') {
                    this.headerData.headerTitle = '睡眠时间历史记录'
                }
                this.$store.dispatch({
                    type: type.GET_PRESSURE_DATA,
                    payload: {
                        data: {
                            quotaCode: [
                                {
                                    code: this.$route.query.highCode
                                }, {
                                    code: this.$route.query.lowCode
                                }
                            ],
                            queryTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                            //  1,2,3,4 是按照日,周,月,年来的
                            queryFlag: '2'
                        }
                    }
                })
            }
        },
        mounted () {
            this.againLoad()
        }
    }
</script>
<style scoped>
    html, body, #main {
        width: 100%;
        height: 100%;
        margin: 0;
    }
    #main {
        background: #fff;
    }
    .submit {
        margin-top: 20px;
    }
    button.weui-btn {
        width: 90%;
        background-color: #2378f7;
    }
</style>

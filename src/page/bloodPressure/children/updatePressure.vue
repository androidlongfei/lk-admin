<template>
    <div class="div1">
        <custom-header :headerData="headerData"></custom-header>
        <div style="margin-top: 0px; " class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="  weui-label" style="font-size:17px">{{indicatorContent.title1}}</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" :placeholder="indicatorContent.reminder1"
                           v-model="h"
                    />
                </div>
                <div>{{indicatorContent.unit}}</div>
            </div>
            <div class="line"></div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="  weui-label" style="font-size:17px">{{indicatorContent.title2}}</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" :placeholder="indicatorContent.reminder2"
                           v-model="l"
                    />
                </div>
                <div>{{indicatorContent.unit}}</div>
            </div>
        </div>
        <group style="margin-top: -13px;">
            <datetime title="测量日期" v-model="date" :end-date="endDate" style="font-size: 16px;" format="YYYY-MM-DD"></datetime>
        </group>
        <a v-if="this.code!=='XYZBXY001028'" style="border-radius:10px; margin-top: 20px;margin-bottom:10px;background-color: #B81C26;"
           @click="updateIndicator"
           class="weui-btn weui-btn_warn2">提交
        </a>
        <a v-if="this.code==='XYZBXY001028'" style="border-radius:10px; margin-top: 20px;margin-bottom:10px;background-color: #B81C26;"
           @click="updateSleepTime"
           class="weui-btn weui-btn_warn2">提交
        </a>
    </div>
</template>
<script>
    //  import { mapGetters } from 'vuex'
    import moment from 'moment'
    import { mapGetters } from 'vuex'
    import CustomHeader from '../../../../src/components/CustomHeader'
    import { XHeader, Datetime, Group } from 'vux'

    export default {
        data () {
            return {
                code: '',
                endDate: moment().format('YYYY-MM-DD'),
                headerData: {
                    headerTitle: '',
                    routerTitle: ''
                },
                indicatorContent: {
                    title1: '',
                    title2: '',
                    unit: '',
                    reminder1: '',
                    reminder2: ''
                },
                date: moment().format('YYYY-MM-DD'),
                h: '',
                l: ''
            }
        },
        components: {XHeader, Datetime, Group, CustomHeader},
        watch: {
            loadingUpdateIndicator (loading) {
                if (loading) {
                    this.$layer.loading('更新中...')
                } else {
                    this.$layer.close()
                    let requestStatus = this.$store.getters.updateIndicatorsRequestStatus
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
                        //     name: 'pressure',
                        //     query: {
                        //         totalCode: this.$route.query.totalCode,
                        //         lowCode: this.$route.query.lowCode,
                        //         highCode: this.$route.query.highCode
                        //     }
                        // })
                    }
                }
            },
            loadingUpdateSleepTime (loading) {
                if (loading) {
                    this.$layer.loading('更新中...')
                } else {
                    this.$layer.close()
                    let requestStatus = this.$store.getters.updateSleepTimeRequestStatus
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
                        //     name: 'pressure',
                        //     query: {
                        //         totalCode: this.$route.query.totalCode,
                        //         lowCode: this.$route.query.lowCode,
                        //         highCode: this.$route.query.highCode
                        //     }
                        // })
                    }
                }
            }
        },
        computed: {
            ...mapGetters(['loadingUpdateIndicator', 'loadingUpdateSleepTime'])
        },
        methods: {
            updateIndicator () {
                if (this.h === '' | this.l === '') {
                    this.$layer.toast({
                        content: '数据不能为空',
                        time: 2000
                    })
                    return false
                }
                this.$store.dispatch({
                    type: 'UPDATEINDICATORSDETAILS',
                    payload: {
                        data: [
                            {
                                quotaCode: this.$route.query.highCode,
                                quotaDate: this.date,
                                systemDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                quotaValue: this.h,
                                quotaText: ''
                            },
                            {
                                quotaCode: this.$route.query.lowCode,
                                quotaDate: this.date,
                                systemDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                quotaValue: this.l,
                                quotaText: ''
                            }
                        ]
                    }
                })
            },
            updateSleepTime () {
                if (this.h === '' | this.l === '') {
                    this.$layer.toast({
                        content: '数据不能为空',
                        time: 2000
                    })
                    return false
                }
                let totalValue = parseFloat(this.l) + parseFloat(this.h)
                this.$store.dispatch({
                    type: 'UPDATESLEEPTIME',
                    payload: {
                        data: [
                            {
                                quotaCode: this.$route.query.highCode,
                                quotaDate: this.date,
                                systemDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                quotaValue: this.h,
                                quotaText: ''
                            },
                            {
                                quotaCode: this.$route.query.lowCode,
                                quotaDate: this.date,
                                systemDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                quotaValue: this.l,
                                quotaText: ''
                            },
                            {
                                quotaCode: this.$route.query.totalCode,
                                quotaDate: this.date,
                                systemDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                quotaValue: totalValue.toString(),
                                quotaText: ''
                            }
                        ]
                    }
                })
            }
        },
        mounted () {
            console.log(this.$route.query, '得到当前路由信息对象的查询字符串')
            this.code = this.$route.query.highCode
            if (this.$route.query.highCode === 'XYZBXY001003') {
                this.headerData.headerTitle = '录入血压'
                this.indicatorContent.title1 = '高压'
                this.indicatorContent.title2 = '低压'
                this.indicatorContent.unit = 'mmHg'
                this.indicatorContent.reminder1 = '请输入高压如: 98'
                this.indicatorContent.reminder2 = '请输入低压如: 65'
            } else if (this.$route.query.highCode === 'XYZBXY003018') {
                this.headerData.headerTitle = '录入血脂'
                this.indicatorContent.title1 = '高血脂'
                this.indicatorContent.title2 = '低血脂'
                this.indicatorContent.unit = 'mmol/L'
                this.indicatorContent.reminder1 = '请输入高血脂如: 1.89'
                this.indicatorContent.reminder2 = '请输入低血脂如: 0.98'
            } else if (this.$route.query.highCode === 'XYZBXY001028') {
                this.headerData.headerTitle = '睡眠时间历史记录'
                this.headerData.headerTitle = '录入睡眠时间'
                this.indicatorContent.title1 = '深度睡眠'
                this.indicatorContent.title2 = '浅度睡眠'
                this.indicatorContent.unit = 'h'
                this.indicatorContent.reminder1 = '请输入睡眠时间如: 7'
                this.indicatorContent.reminder2 = '请输入睡眠时间如: 3'
            }
        }
    }
</script>
<style scoped>
    label {
        margin-bottom: 0px;
    }

    .div1 {
        background-color: #FFFFFF;
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
        width: 95px;
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

    .line {
        width: 100%;
        height: 1px;
        background-color: lightgray;
    }
</style>

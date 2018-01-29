<!-- 柱状图 -->
<template>
    <div id="main">
        <div>
            <custom-header :headerData="headerData"></custom-header>
            <div v-if="ecgData.dataList && ecgData.dataList.length">
                <div v-for="(item, index) in analysisKey(ecgData.dataList)" style="color:#4a4a4a;border-bottom: 1px solid #d9d9d9;height: 35px;line-height: 35px;" :key="index">
                    {{item.name}}
                </div>
            </div>
            <div v-else style="font-size: 20px;">暂时没有数据, 请添加心电数据!!!!</div>
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
                <!--<h1 style="font-size: 18px;font-weight: normal;margin-bottom: 10px;">本周历史记录</h1>-->
                <!--<p style="font-size: 15px;color: #4a4a4a;">时间范围: 2017年01月-2017年11月</p>-->
                <!--<p style="font-size: 15px;color: #4a4a4a;">当前日期: 2017年11月29日 星期四</p>-->
                <!--<p style="color: orangered;">所选日期血压值: 后台获取数据</p>-->
            <!--</div>-->
        </div>
        <!--<router-link to="/updatePressure">-->
        <!--<div class="submit">-->
        <!--<x-button type="primary">添加血压</x-button>-->
        <!--</div>-->
        <!--</router-link>-->
    </div>
</template>

<script>
    import CustomHeader from '../../../../src/components/CustomHeader'
    import { getListByDictionaryKey } from '../../../utils/dictionaryUtils'
    import moment from 'moment'
    import { XButton } from 'vux'
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: 'hello',
        data () {
            return {
                headerData: {
                    headerTitle: '心电历史记录',
                    routerTitle: '添加',
                    routerPath: '/updateEcg',
                    routerQuery: {
                        quotaCode: this.$route.query.quotaCode
                    }
                }
            }
        },
        components: {
            XButton, CustomHeader
        },
        computed: {
            ...mapGetters([
                'loadingEcg', 'ecgData'
            ])
        },
        watch: {
            loadingEcg (loading) {
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.$layer.close()
                    let requestStatus = this.$store.getters.ecgRequestStatus
                    if (requestStatus.msg) {
                        this.$layer.toast({
                            content: requestStatus.msg,
                            time: 2000
                        })
                    }
                }
            }
        },
        methods: {
            analysisKey (item) {
                if (!item.length) {
                    return false
                }
                let arr = getListByDictionaryKey('ecg')
                console.log(arr, '码表数组')
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < item.length; j++) {
                        if (item[j].quotaValue === arr[i].code) {
                            item[j].name = arr[i].name
                        }
                    }
                }
                return item
            }
        },
        mounted () {
            console.log(this.$route.query)
            this.$store.dispatch({
                type: 'GET_ECG',
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

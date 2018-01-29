<template>
<div style="text-align: left;background-color:#EFEFF4;">
    <custom-header :headerData="this.headerData"></custom-header>
    <div style="background-color: #FFFFFF;">
        <div class="health_title">
            <p>体检记录所属人</p>
        </div>
        <div style="display: flex;padding: 0px 15px;line-height: 40px;">
            <div style="width: 100px;">姓名:</div>
            <div>{{ baseInfo.userName }}</div>
        </div>
        <div style="display: flex;padding: 0px 15px;line-height: 40px;">
            <div style="width: 100px;">性别:</div>
            <div>{{ baseInfo.gender }}</div>
        </div>
    </div>

    <div class="health_title">
        <p>最近评估报告</p>
        <router-link to="/appraisalRepor/appraisalReportList">
            <span>查看更多</span>
        </router-link>
    </div>

    <div>
        <div v-if="!reportData.length" style="line-height: 40px;text-align: left;padding-left: 15px;background-color: #ffffff;">
            未检测到数据!!!
        </div>
        <div v-else>
            <div style="background-color: #FFFFFF;text-align: left;padding: 0 15px;">
                <div style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;">
                    <div style="width:30%;font-size: 16px;color: #000000;text-align: center;">时间</div>
                    <div style="width:35%;font-size: 16px;color: #000000;text-align: center;">地点</div>
                    <div style="width:35%;font-size: 16px;color: #4a4a4a;text-align: center;">名称</div>
                </div>

                <div style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;" v-for="(item, index) in reportData" :key="index" @click="reportItemClick(item)">
                    <div style="width: 30%;font-size: 16px;color: #000000;text-align: center;">{{ conversionReportTime(item.reportDate) }}
                    </div>
                    <div style="width:35%;word-wrap:break-word;font-size: 16px;color: #9b9b9b;text-align: center;">{{ item.reportAdress }}</div>
                    <div style="width:35%;word-wrap:break-word;font-size: 16px;color: #4a4a4a;text-align: center;">{{ item.reportName }}</div>
                </div>
            </div>
        </div>
    </div>

    <div style="background-color:#efeff4;height: 15px;width: 100%;"></div>

    <div class="health_title">
        <p>近期监检指标</p>
    </div>
    <grid style="background-color: #FFFFFF;">
        <grid-item style="width: 50%;height: 188px" v-for="(attentionIndicators,index) in attentionIndicatorData" :key="index">
            <indicator-item :indicator="attentionIndicators"></indicator-item>
        </grid-item>
    </grid>


</div>
</template>
<script>
import IndicatorItem from '../../../indicators/allIndicators/components/indicatorItem'
import HeaderTitle from '../../../../../src/components/HeaderTitle'
import storage from '../../../../config/storageHelp'
import * as type from './module/mutations_types'
import moment from 'moment'
import {
    mapGetters
} from 'vuex'
import {
    Grid,
    GridItem
} from 'vux'

export default {
    data() {
        return {
            baseInfo: {
                userName: storage.userName,
                gender: storage.gender
            },
            headerData: {
                headerTitle: '健康近况'
            }
        }
    },
    components: {
        HeaderTitle,
        Grid,
        GridItem,
        IndicatorItem
    },
    methods: {
        conversionReportTime(time) {
            if (time) {
                return moment(time).format('YYYY/MM/DD')
            }
            return ''
        },
        reportItemClick(reportItem) {
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
        againLoad() {
            // this.$store.dispatch({
            //     type: type.GET_LATER_APPRAISAL_REPORT,
            //     payload: {
            //         currentPage: 1,
            //         pageSize: 8
            //     }
            // })
            // this.$store.dispatch({
            //     type: type.GET_LATER_INDICATOR,
            //     payload: {}
            // })
            this.$store.dispatch({
                type: type.GET_HEALTH_CONDITION_ALL,
                payload: {}
            })
        }
    },
    computed: {
        ...mapGetters([
            'healthConditionLoading', 'reportData', 'attentionIndicatorData', 'healthConditionRequestStatus'
        ])
    },
    watch: {
        // 获取健康近况所有数据的loading
        healthConditionLoading(loading) {
            if (loading) {
                this.$layer.loading('加载中...')
            } else {
                this.$layer.close()
                let requestStatus = this.$store.getters.healthConditionRequestStatus
                if (requestStatus.isError) {
                    // 报告和指标任何一个接口出错,显示提示信息
                    this.showLoadMsg(requestStatus.msg)
                } else {
                    // 获取数据成功
                }
            }
        }
    },
    mounted() {
        this.againLoad()
    }
}
</script>
<style lang="scss">
.health_title {
    padding: 0 15px;
    text-align: left;
    background-color: #FFFFFF;
    display: flex;
    line-height: 60px;
    justify-content: space-between;
    p {
        font-size: 22px;
        color: #4a4a4a;
    }

}
</style>

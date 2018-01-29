// 处理同步逻辑

import * as type from './mutations_types'
import { reorderArr } from '../../../../../utils/dictionaryUtils'
export default {
    // 最近评估报告成功
    [type.GET_LATER_APPRAISAL_REPORT_SUCCESS](state, data) {
        let payload = data.payload
        state.healthConditionRequestStatus.msg = payload.result.message
        if (payload.result.status === '1') {
            state.healthConditionRequestStatus.isError = false
            state.reportData = payload.result.data.dataList
            console.log(state.reportData, 'reportDatareportDatareportData')
        } else {
            state.healthConditionRequestStatus.isError = true
        }
    },
    // 最近评估报告失败
    [type.GET_LATER_APPRAISAL_REPORT_FAILED](state, data) {
        let payload = data.payload
        console.log('payload', payload)
        state.loadingHealthConditionData = false
        state.healthConditionRequestStatus.msg = payload.msg
        state.healthConditionRequestStatus.isError = true
    },
    // 最近检测指标成功
    [type.GET_LATER_INDICATOR_SUCCESS](state, data) {
        let payload = data.payload
        state.loadingHealthConditionData = false
        state.healthConditionRequestStatus.msg = payload.result.message
        if (payload.result.status === '1') {
            state.healthConditionRequestStatus.isError = false
            let newArr = payload.result.data.dataList.filter(function (item) {
                return item.quotaMark === '1'
            })
            state.attentionIndicatorData = newArr
        } else {
            state.healthConditionRequestStatus.isError = true
        }
    },
    // 最近检测指标失败
    [type.GET_LATER_INDICATOR_FAILED](state, data) {
        let payload = data.payload
        state.loadingHealthConditionData = false
        state.healthConditionRequestStatus.msg = payload.msg
        state.healthConditionRequestStatus.isError = true
    },
    // 健康近况loading [最近报告,最近标值] 一起
    [type.LOADING_HEALTH_CONDITION_ALL](state) {
        state.healthConditionLoading = true
        state.healthConditionRequestStatus.msg = ''
        state.healthConditionRequestStatus.isError = false
    },
    // 健康近况成功
    [type.GET_HEALTH_CONDITION_ALL_SUCCESS](state, data) {
        let results = data.payload.results
        console.log('results', results);
        let laterReport = results[0]
        let laterIndicator = results[1]
        if (laterReport.isError && laterIndicator.isError) {
            state.healthConditionLoading = false
            state.healthConditionRequestStatus.isError = true
            state.healthConditionRequestStatus.msg = '获取健康近况数据失败，服务器异常'
        } else {
            // 报告
            let laterReportResult = laterReport.result
            if (laterReport.isError) {
                state.healthConditionRequestStatus.isError = true
                state.healthConditionRequestStatus.msg = laterReportResult.msg
            } else {
                if (laterReportResult.status === '1') {
                    state.healthConditionRequestStatus.isError = false
                    state.reportData = laterReportResult.data.dataList
                } else {
                    state.healthConditionRequestStatus.msg = laterReportResult.message
                    state.healthConditionRequestStatus.isError = true
                }
            }
            // console.log('state.reportData', state.reportData)
            // 指标
            let laterIndicatorResult = laterIndicator.result
            if (laterIndicator.isError) {
                state.healthConditionRequestStatus.isError = true
                state.healthConditionRequestStatus.msg = laterIndicatorResult.msg
            } else {
                if (laterIndicatorResult.status === '1') {
                    state.healthConditionRequestStatus.isError = false
                    state.attentionIndicatorData = reorderArr(laterIndicatorResult.data.dataList)
                } else {
                    state.healthConditionRequestStatus.isError = true
                    state.healthConditionRequestStatus.msg = laterIndicatorResult.message
                }
            }
            // console.log('state.attentionIndicatorData', state.attentionIndicatorData)
            state.healthConditionLoading = false
        }
    },
    // 健康近况失败
    [type.GET_HEALTH_CONDITION_ALL_FAILED](state, data) {

    }
}

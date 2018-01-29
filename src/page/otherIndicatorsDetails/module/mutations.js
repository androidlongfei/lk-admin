//  处理同步逻辑
import * as type from './mutations_types'

export default {
    [type.LOADING_OTHERINDICATORSDETAILS_INFO] (state) {
        state.otherIndicatorsDetailsLoading = true
        state.otherIndicatorsDetailsRequestStatus.isError = false
        state.otherIndicatorsDetailsRequestStatus.msg = ''
    },
    [type.GET_OTHERINDICATORSDETAILS_INFO_SUCCESS] (state, data) {
        console.log(data.payload.result, 'GET_OTHERINDICATORSDETAILS_INFO_SUCCESS')
        let payload = data.payload
        state.otherIndicatorsDetailsLoading = false
        state.otherIndicatorsDetailsData = payload.result.data
        state.otherIndicatorsDetailsRequestStatus.msg = '查询成功'
        if (payload.result.status === 'success') {
            state.otherIndicatorsDetailsRequestStatus.isError = false
        }
    },
    [type.GET_OTHERINDICATORSDETAILS_INFO_FAILED] (state, data) {
        let payload = data.payload
        state.otherIndicatorsDetailsLoading = false
        console.log('msg是什么', payload.msg)
        state.otherIndicatorsDetailsRequestStatus.msg = payload.msg
        state.otherIndicatorsDetailsRequestStatus.isError = true
    }
}

// 处理同步逻辑

import * as type from './mutations_types'
import { mergeDate } from '../../../utils/dictionaryUtils'
export default {
    [type.LOADING_PRESSURE_DATA] (state) {
        state.LOADINGPRESSUEDATA = true
        state.pressureRequestStatus.msg = ''
        state.pressureRequestStatus.isError = false
    },

    [type.GET_PRESSURE_DATA_SUCCESS] (state, data) {
        let payload = data.payload
        state.LOADINGPRESSUEDATA = false
        //  state.pressureData = payload.result.data
        console.log('payload.result.data.dataList', payload.result.data.dataList)
        state.pressureData = mergeDate(payload.result.data.dataList)
        state.pressureRequestStatus.msg = payload.result.msg
        if (payload.result.status === 'success') {
            state.pressureRequestStatus.isError = false
        }
    },

    [type.GET_PRESSURE_DATA_FAILED] (state, data) {
        let payload = data.payload
        state.LOADINGPRESSUEDATA = false
        state.pressureRequestStatus.msg = payload.msg
        state.pressureRequestStatus.isError = true
    }
}

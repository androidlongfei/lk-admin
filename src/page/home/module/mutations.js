// 处理同步逻辑

import * as type from './mutations_types'
import storage from '../../../config/storageHelp'
export default {
    [type.LOADING_HOME_DATA](state) {
        state.homeDataLoading = true
        state.HomeRequestStatus.msg = ''
        state.HomeRequestStatus.isError = false
    },

    [type.GET_HOME_DATA_SUCCESS](state, data) {
        console.log('GET_HOME_DATA_SUCCESS', data)
        //  console.log('endTime', Date.parse(new Date()))
        let payload = data.payload
        state.homeDataLoading = false
        // console.log('payload.result', payload.result);
        if (payload.result.status === '1') {
            state.homeData = payload.result.data
            state.baseInfoData.userName = state.homeData.healthDescription.userName
            if (state.homeData.healthDescription.gender === '1') {
                state.baseInfoData.gender = '男'
            } else if (state.homeData.healthDescription.gender === '2') {
                state.baseInfoData.gender = '女'
            } else {
                state.baseInfoData.gender = '未知'
            }
            storage.userName = state.baseInfoData.userName
            storage.gender = state.baseInfoData.gender
            storage.save()
            state.HomeRequestStatus.isError = false
        } else {
            state.HomeRequestStatus.msg = payload.result.message
            state.HomeRequestStatus.isError = true
        }
    },

    [type.GET_HOME_DATA_FAILED](state, data) {
        let payload = data.payload
        state.homeDataLoading = false
        state.HomeRequestStatus.msg = payload.msg
        state.HomeRequestStatus.isError = true
    }
}

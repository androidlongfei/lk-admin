import * as type from './mutations_types'
import {
    getOutReportBySeqNo
} from '../../../../../../service/getOutReportBySeqNo'

// initial state
const state = {
    externalDetailsLoading: false,
    externalDetailsData: {},
    externalDetailsRequestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    externalDetailsLoading: (state, getters, rootState) => {
        return state.externalDetailsLoading
    },
    externalDetailsData: (state, getters, rootState) => {
        return state.externalDetailsData
    },
    externalDetailsRequestStatus: (state, getters, rootState) => {
        return state.externalDetailsRequestStatus
    }
}

// actions
const actions = {
    // 获取外部体检
    [type.GET_EXTERNALDETAILS_DATA]({
                                    dispatch,
                                    commit,
                                    state
                                }, data) {
        commit(type.GET_EXTERNALDETAILS_DATA_LOADING)
        getOutReportBySeqNo(data.payload).then(res => {
            commit({
                type: type.GET_EXTERNALDETAILS_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_EXTERNALDETAILS_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取外部体检失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取外部体检loading
    [type.GET_EXTERNALDETAILS_DATA_LOADING](state) {
        state.externalDetailsLoading = true
        state.externalDetailsRequestStatus.msg = ''
        state.externalDetailsRequestStatus.isError = false
    },
    [type.GET_EXTERNALDETAILS_DATA_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_EXTERNALDETAILS_DATA_SUCCESS', payload.result);
        state.externalDetailsLoading = false
        state.externalDetailsRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        // state.aftercareData = payload.result.data
        console.log('payload.result.data', state.externalDetailsData)
        if (payload.result.status === '1') {
            state.externalDetailsRequestStatus.isError = false
            state.externalDetailsData = payload.result.data
        } else {
            state.externalDetailsRequestStatus.isError = true
        }
    },
    [type.GET_EXTERNALDETAILS_DATA_FAILED](state, data) {
        let payload = data.payload
        state.externalDetailsLoading = false
        state.externalDetailsRequestStatus.msg = payload.msg
        state.externalDetailsRequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

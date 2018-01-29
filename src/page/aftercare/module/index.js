import * as type from './mutations_types'
import {
    findAftercare
} from '../../../service/aftercare'

// initial state
const state = {
    aftercareLoading: false,
    aftercareData: {},
    aftercareRequestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    aftercareLoading: (state, getters, rootState) => {
        return state.aftercareLoading
    },
    aftercareData: (state, getters, rootState) => {
        return state.aftercareData
    },
    aftercareRequestStatus: (state, getters, rootState) => {
        return state.aftercareRequestStatus
    }
}

// actions
const actions = {
    // 获取调养建议
    [type.GET_AFTERCARE_DATA]({
                                    dispatch,
                                    commit,
                                    state
                                }, data) {
        commit(type.GET_AFTERCARE_DATA_LOADING)
        findAftercare(data.payload).then(res => {
            commit({
                type: type.GET_AFTERCARE_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_AFTERCARE_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取调养建议失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取西医报告loading
    [type.GET_AFTERCARE_DATA_LOADING](state) {
        state.aftercareLoading = true
        state.aftercareRequestStatus.msg = ''
        state.aftercareRequestStatus.isError = false
    },
    [type.GET_AFTERCARE_DATA_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_AFTERCARE_DATA_SUCCESS', payload.result);
        state.aftercareLoading = false
        state.aftercareRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        // state.aftercareData = payload.result.data
        console.log('payload.result.data', state.aftercareData)
        if (payload.result.status === '1') {
            state.aftercareRequestStatus.isError = false
            state.aftercareData.data = payload.result.data
            state.aftercareData.tenantId = payload.result.tenantId
        } else {
            state.aftercareRequestStatus.isError = true
        }
    },
    [type.GET_AFTERCARE_DATA_FAILED](state, data) {
        let payload = data.payload
        state.aftercareLoading = false
        state.aftercareRequestStatus.msg = payload.msg
        state.aftercareRequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

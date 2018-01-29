import * as type from './mutations_types'
import {
    findAftercare
} from '../../../../../service/aftercare'

// initial state
const state = {
    kungfuLoading: false,
    kungfuData: {},
    kungfuRequestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    kungfuLoading: (state, getters, rootState) => {
        return state.kungfuLoading
    },
    kungfuData: (state, getters, rootState) => {
        return state.kungfuData
    },
    kungfuRequestStatus: (state, getters, rootState) => {
        return state.kungfuRequestStatus
    }
}

// actions
const actions = {
    // 获取调养建议
    [type.GET_KUNGFU_DATA]({
                                    dispatch,
                                    commit,
                                    state
                                }, data) {
        commit(type.GET_KUNGFU_DATA_LOADING)
        findAftercare(data.payload).then(res => {
            commit({
                type: type.GET_KUNGFU_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_KUNGFU_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取调术养数据失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取术养loading
    [type.GET_KUNGFU_DATA_LOADING](state) {
        state.kungfuLoading = true
        state.kungfuRequestStatus.msg = ''
        state.kungfuRequestStatus.isError = false
    },
    [type.GET_KUNGFU_DATA_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_KUNGFU_DATA_SUCCESS', payload.result);
        state.kungfuLoading = false
        state.kungfuRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        console.log('payload.result.data', state.kungfuData)
        if (payload.result.status === '1') {
            state.kungfuRequestStatus.isError = false
            state.kungfuData = payload.result.data
        } else {
            state.kungfuRequestStatus.isError = true
        }
    },
    [type.GET_KUNGFU_DATA_FAILED](state, data) {
        let payload = data.payload
        state.kungfuLoading = false
        state.kungfuRequestStatus.msg = payload.msg
        state.kungfuRequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

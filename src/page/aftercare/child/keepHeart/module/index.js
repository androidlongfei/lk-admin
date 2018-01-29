import * as type from './mutations_types'
import {
    findAftercare
} from '../../../../../service/aftercare'

// initial state
const state = {
    keepHeartLoading: false,
    keepHeartData: {},
    keepHeartRequestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    keepHeartLoading: (state, getters, rootState) => {
        return state.keepHeartLoading
    },
    keepHeartData: (state, getters, rootState) => {
        return state.keepHeartData
    },
    keepHeartRequestStatus: (state, getters, rootState) => {
        return state.keepHeartRequestStatus
    }
}

// actions
const actions = {
    // 获取调养建议
    [type.GET_KEEPHEART_DATA]({
                                    dispatch,
                                    commit,
                                    state
                                }, data) {
        commit(type.GET_KEEPHEART_DATA_LOADING)
        findAftercare(data.payload).then(res => {
            commit({
                type: type.GET_KEEPHEART_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_KEEPHEART_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取调心养数据失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取术养loading
    [type.GET_KEEPHEART_DATA_LOADING](state) {
        state.keepHeartLoading = true
        state.keepHeartRequestStatus.msg = ''
        state.keepHeartRequestStatus.isError = false
    },
    [type.GET_KEEPHEART_DATA_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_KEEPHEART_DATA_SUCCESS', payload.result);
        state.keepHeartLoading = false
        state.keepHeartRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        console.log('payload.result.data', state.keepHeartData)
        if (payload.result.status === '1') {
            state.keepHeartRequestStatus.isError = false
            state.keepHeartData = payload.result.data
        } else {
            state.keepHeartRequestStatus.isError = true
        }
    },
    [type.GET_KEEPHEART_DATA_FAILED](state, data) {
        let payload = data.payload
        state.keepHeartLoading = false
        state.keepHeartRequestStatus.msg = payload.msg
        state.keepHeartRequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

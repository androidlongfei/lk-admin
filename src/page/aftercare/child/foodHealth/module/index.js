import * as type from './mutations_types'
import {
    findAftercare
} from '../../../../../service/aftercare'

// initial state
const state = {
    foodHealthLoading: false,
    foodHealthData: {},
    foodHealthRequestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    foodHealthLoading: (state, getters, rootState) => {
        return state.foodHealthLoading
    },
    foodHealthData: (state, getters, rootState) => {
        return state.foodHealthData
    },
    foodHealthRequestStatus: (state, getters, rootState) => {
        return state.foodHealthRequestStatus
    }
}

// actions
const actions = {
    // 获取调养建议
    [type.GET_FOODHEALTH_DATA]({
                                    dispatch,
                                    commit,
                                    state
                                }, data) {
        commit(type.GET_FOODHEALTH_DATA_LOADING)
        findAftercare(data.payload).then(res => {
            commit({
                type: type.GET_FOODHEALTH_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_FOODHEALTH_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取调食养数据失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取食养loading
    [type.GET_FOODHEALTH_DATA_LOADING](state) {
        state.foodHealthLoading = true
        state.foodHealthRequestStatus.msg = ''
        state.foodHealthRequestStatus.isError = false
    },
    [type.GET_FOODHEALTH_DATA_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_FOODHEALTH_DATA_SUCCESS', payload.result);
        state.foodHealthLoading = false
        state.foodHealthRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        // state.foodHealthData = payload.result.data
        console.log('payload.result.data', state.foodHealthData)
        if (payload.result.status === '1') {
            state.foodHealthRequestStatus.isError = false
            state.foodHealthData = payload.result.data
        } else {
            state.foodHealthRequestStatus.isError = true
        }
    },
    [type.GET_FOODHEALTH_DATA_FAILED](state, data) {
        let payload = data.payload
        state.foodHealthLoading = false
        state.foodHealthRequestStatus.msg = payload.msg
        state.foodHealthRequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

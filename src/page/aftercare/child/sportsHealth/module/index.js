import * as type from './mutations_types'
import {
    findAftercare
} from '../../../../../service/aftercare'

// initial state
const state = {
    sportsHealthLoading: false,
    sportsHealthData: {},
    sportsHealthRequestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    sportsHealthLoading: (state, getters, rootState) => {
        return state.sportsHealthLoading
    },
    sportsHealthData: (state, getters, rootState) => {
        return state.sportsHealthData
    },
    sportsHealthRequestStatus: (state, getters, rootState) => {
        return state.sportsHealthRequestStatus
    }
}

// actions
const actions = {
    // 获取调养建议
    [type.GET_SPORTSHEALTH_DATA]({
                                    dispatch,
                                    commit,
                                    state
                                }, data) {
        commit(type.GET_SPORTSHEALTH_DATA_LOADING)
        findAftercare(data.payload).then(res => {
            commit({
                type: type.GET_SPORTSHEALTH_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_SPORTSHEALTH_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取调动养数据失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取西医报告loading
    [type.GET_SPORTSHEALTH_DATA_LOADING](state) {
        state.sportsHealthLoading = true
        state.sportsHealthRequestStatus.msg = ''
        state.sportsHealthRequestStatus.isError = false
    },
    [type.GET_SPORTSHEALTH_DATA_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_SPORTSHEALTH_DATA_SUCCESS', payload.result);
        state.sportsHealthLoading = false
        state.sportsHealthRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        console.log('payload.result.data', state.sportsHealthData)
        if (payload.result.status === '1') {
            state.sportsHealthRequestStatus.isError = false
            state.sportsHealthData = payload.result.data
        } else {
            state.sportsHealthRequestStatus.isError = true
        }
    },
    [type.GET_SPORTSHEALTH_DATA_FAILED](state, data) {
        let payload = data.payload
        state.sportsHealthLoading = false
        state.sportsHealthRequestStatus.msg = payload.msg
        state.sportsHealthRequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

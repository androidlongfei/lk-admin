import * as type from './mutations_types'
import {
    findHealthPortrait
} from '../../../service/healthPortrait'

// initial state
const state = {
    healthPortraitLoading: false,
    healthPortraitData: {},
    requestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    getHealthPortraitLoading: (state, getters, rootState) => {
        return state.healthPortraitLoading
    },
    healthPortraitData: (state, getters, rootState) => {
        return state.healthPortraitData
    },
    getRequestStatus: (state, getters, rootState) => {
        return state.requestStatus
    }
}

// actions
const actions = {
    // 获取健肖像数据
    [type.GET_HEALTHPORTRAIT_DATA]({
                                    dispatch,
                                    commit,
                                    state
                                }, data) {
        commit(type.GET_HEALTHPORTRAIT_DATA_LOADING)
        findHealthPortrait().then(res => {
            commit({
                type: type.GET_HEALTHPORTRAIT_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_HEALTHPORTRAIT_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取健康肖像数据失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取健康肖像数据loading
    [type.GET_HEALTHPORTRAIT_DATA_LOADING](state) {
        state.healthPortraitLoading = true
        state.requestStatus.msg = ''
        state.requestStatus.isError = false
    },
    [type.GET_HEALTHPORTRAIT_DATA_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_HEALTHPORTRAIT_DATA_SUCCESS', payload.result);
        state.healthPortraitLoading = false
        state.requestStatus.msg = payload.result.message
        // 正式接口时打开判断
        // state.healthPortraitData = payload.result.data
        console.log('payload.result.data', state.healthPortraitData)
        if (payload.result.status === '1') {
            state.requestStatus.isError = false
            state.healthPortraitData = payload.result.data
        } else {
            state.requestStatus.isError = true
        }
    },
    [type.GET_HEALTHPORTRAIT_DATA_FAILED](state, data) {
        let payload = data.payload
        state.healthPortraitLoading = false
        state.requestStatus.msg = payload.msg
        state.requestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

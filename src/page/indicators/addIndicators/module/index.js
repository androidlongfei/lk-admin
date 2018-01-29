import * as type from './mutations_types'
import {
    findAlreadyFocusIndicators,
    updateFocusIndicators
} from '../../../../service/indicators'

// initial state
const state = {
    focusIndicatorsLoading: false,
    submitIndicatorsLoading: false,
    focusIndicatorsData: [],
    requestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    getFocusIndicatorsLoading: (state, getters, rootState) => {
        return state.focusIndicatorsLoading
    },
    getSubmitIndicatorsLoading: (state, getters, rootState) => {
        return state.submitIndicatorsLoading
    },
    focusIndicatorsData: (state, getters, rootState) => {
        return state.focusIndicatorsData
    },
    focusIndicatorsRequestStatus: (state, getters, rootState) => {
        return state.requestStatus
    },
    sunmitIndicatorsLoading: (state, getters, rootState) => {
        return state.focusIndicatorsLoading
    }

}

// actions
const actions = {
    // 获取关注指标
    [type.GET_FOCUS_INDICATORS]({
        dispatch,
        commit,
        state
    }, data) {
        commit(type.FOCUS_INDICATORS_LOADING)
        findAlreadyFocusIndicators().then(res => {
            commit({
                type: type.GET_FOCUS_INDICATORS_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_FOCUS_INDICATORS_FAILED,
                payload: {
                    isError: true,
                    msg: '获取指标失败,服务器异常'
                }
            })
        })
    },

    // 提交关注指标
    [type.SUNMIT_FOCUS_INDICATORS]({
        dispatch,
        commit,
        state
    }, data) {
        commit(type.SUNMIT_FOCUS_INDICATORS_LOADING)
        console.log('SUNMIT_FOCUS_INDICATORS_LOADING', data.payload)
        updateFocusIndicators(data.payload).then(res => {
            commit({
                type: type.SUNMIT_FOCUS_INDICATORS_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.SUNMIT_FOCUS_INDICATORS_FAILED,
                payload: {
                    isError: true,
                    msg: '保存指标失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取指标
    [type.FOCUS_INDICATORS_LOADING](state) {
        state.focusIndicatorsLoading = true
        state.requestStatus.msg = ''
        state.requestStatus.isError = false
    },
    [type.GET_FOCUS_INDICATORS_SUCCESS](state, data) {
        let payload = data.payload
        // console.log('GET_FOCUS_INDICATORS_SUCCESS', payload.result);
        state.focusIndicatorsLoading = false
        state.requestStatus.msg = payload.result.message
        if (payload.result.status === '1') {
            state.requestStatus.isError = false
            state.focusIndicatorsData = payload.result.data.dataList
        } else {
            state.requestStatus.isError = true
        }
    },
    [type.GET_FOCUS_INDICATORS_FAILED](state, data) {
        let payload = data.payload
        state.focusIndicatorsLoading = false
        state.requestStatus.msg = payload.msg
        state.requestStatus.isError = true
    },

    //  保存指标
    [type.SUNMIT_FOCUS_INDICATORS_LOADING](state) {
        state.submitIndicatorsLoading = true
        state.requestStatus.msg = ''
        state.requestStatus.isError = false
    },
    [type.SUNMIT_FOCUS_INDICATORS_SUCCESS](state, data) {
        let payload = data.payload
        // console.log(`${type.SUNMIT_FOCUS_INDICATORS_SUCCESS}-data-payload`, payload)
        state.submitIndicatorsLoading = false
        state.requestStatus.msg = payload.result.message
        if (payload.result.status === '1') {
            state.requestStatus.isError = false
        } else {
            state.requestStatus.isError = true
        }
    },
    [type.SUNMIT_FOCUS_INDICATORS_FAILED](state, data) {
        let payload = data.payload
        state.submitIndicatorsLoading = false
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

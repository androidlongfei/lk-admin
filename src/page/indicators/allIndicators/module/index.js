import * as type from './mutations_types'
import {
    findAllIndicators
} from '../../../../service/indicators'

// initial state
const state = {
    allIndicatorsLoading: false,
    allIndicatorsData: [],
    requestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    getAllIndicatorsLoading: (state, getters, rootState) => {
        return state.allIndicatorsLoading
    },
    allIndicatorsData: (state, getters, rootState) => {
        return state.allIndicatorsData
    },
    allIndicatorsRequestStatus: (state, getters, rootState) => {
        return state.requestStatus
    }

}

// actions
const actions = {
    // 获取关注指标
    [type.GET_ALL_INDICATORS]({
        dispatch,
        commit,
        state
    }, data) {
        //  console.log('endTime', Date.parse(new Date()))
        commit(type.ALL_INDICATORS_LOADING)
        findAllIndicators().then(res => {
            commit({
                type: type.GET_ALL_INDICATORS_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_ALL_INDICATORS_FAILED,
                payload: {
                    isError: true,
                    msg: '获取指标失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取所有指标
    [type.ALL_INDICATORS_LOADING](state) {
        state.allIndicatorsLoading = true
        state.requestStatus.msg = ''
        state.requestStatus.isError = false
    },
    [type.GET_ALL_INDICATORS_SUCCESS](state, data) {
        let payload = data.payload
        // console.log('GET_ALL_INDICATORS_SUCCESS', payload.result);
        //  console.log('endTime', Date.parse(new Date()))
        state.allIndicatorsLoading = false
        state.requestStatus.msg = payload.result.message
        if (payload.result.status === '1') {
            state.requestStatus.isError = false
            state.allIndicatorsData = payload.result.data.dataList
        } else {
            state.requestStatus.isError = true
        }
    },
    [type.GET_ALL_INDICATORS_FAILED](state, data) {
        let payload = data.payload
        state.allIndicatorsLoading = false
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

import * as type from './mutations_types'
import {
    findHealthAssessment
} from '../../../../service/healthAssessment'

// initial state
const state = {
    chineseMedicineLoading: false,
    chineseMedicineData: {},
    chineseMedicinerequestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    chineseMedicineLoading: (state, getters, rootState) => {
        return state.chineseMedicineLoading
    },
    chineseMedicineData: (state, getters, rootState) => {
        return state.chineseMedicineData
    },
    chineseMedicinerequestStatus: (state, getters, rootState) => {
        return state.chineseMedicinerequestStatus
    }
}

// actions
const actions = {
    // 获取中医报告
    [type.GET_CHINESEMEDICINE_DATA]({
                                    dispatch,
                                    commit,
                                    state
                                }, data) {
        commit(type.GET_CHINESEMEDICINE_DATA_LOADING)
        console.log('data', data)
        findHealthAssessment(data.payload).then(res => {
            commit({
                type: type.GET_CHINESEMEDICINE_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_CHINESEMEDICINE_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取中医报告失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取健康肖像数据loading
    [type.GET_CHINESEMEDICINE_DATA_LOADING](state) {
        state.chineseMedicineLoading = true
        state.chineseMedicinerequestStatus.msg = ''
        state.chineseMedicinerequestStatus.isError = false
    },
    [type.GET_CHINESEMEDICINE_DATA_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_CHINESEMEDICINE_DATA_SUCCESS', payload.result);
        state.chineseMedicineLoading = false
        state.chineseMedicinerequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        // state.chineseMedicineData = payload.result.data
        console.log('payload.result.data', state.chineseMedicineData)
        if (payload.result.status === '1') {
            state.chineseMedicinerequestStatus.isError = false
            state.chineseMedicineData = payload.result.data
        } else {
            state.chineseMedicinerequestStatus.isError = true
        }
    },
    [type.GET_CHINESEMEDICINE_DATA_FAILED](state, data) {
        let payload = data.payload
        state.chineseMedicineLoading = false
        state.chineseMedicinerequestStatus.msg = payload.msg
        state.chineseMedicinerequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

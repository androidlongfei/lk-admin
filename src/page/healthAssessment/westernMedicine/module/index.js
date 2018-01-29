import * as type from './mutations_types'
import {
    findHealthAssessment
} from '../../../../service/healthAssessment'

// initial state
const state = {
    westernMedicineLoading: false,
    westernMedicineData: {},
    westernMedicinerequestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    westernMedicineLoading: (state, getters, rootState) => {
        return state.westernMedicineLoading
    },
    westernMedicineData: (state, getters, rootState) => {
        return state.westernMedicineData
    },
    westernMedicinerequestStatus: (state, getters, rootState) => {
        return state.westernMedicinerequestStatus
    }
}

// actions
const actions = {
    // 获取西医报告
    [type.GET_WESTERMEDICINE_DATA]({
                                    dispatch,
                                    commit,
                                    state
                                }, data) {
        commit(type.GET_WESTERMEDICINE_DATA_LOADING)
        findHealthAssessment(data.payload).then(res => {
            commit({
                type: type.GET_WESTERMEDICINE_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_WESTERMEDICINE_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取西医报告失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取西医报告loading
    [type.GET_WESTERMEDICINE_DATA_LOADING](state) {
        state.westernMedicineLoading = true
        state.westernMedicinerequestStatus.msg = ''
        state.westernMedicinerequestStatus.isError = false
    },
    [type.GET_WESTERMEDICINE_DATA_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_WESTERMEDICINE_DATA_SUCCESS', payload.result);
        state.westernMedicineLoading = false
        state.westernMedicinerequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        // state.westernMedicineData = payload.result.data
        console.log('payload.result.data', state.westernMedicineData)
        if (payload.result.status === '1') {
            state.westernMedicinerequestStatus.isError = false
            state.westernMedicineData = payload.result.data
        } else {
            state.westernMedicinerequestStatus.isError = true
        }
    },
    [type.GET_WESTERMEDICINE_DATA_FAILED](state, data) {
        let payload = data.payload
        state.westernMedicineLoading = false
        state.westernMedicinerequestStatus.msg = payload.msg
        state.westernMedicinerequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

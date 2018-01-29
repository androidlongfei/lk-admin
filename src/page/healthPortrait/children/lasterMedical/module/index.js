import * as type from './mutations_types'
import {
    getLaterMedicalRecord
} from '../../../../../service/medicalRecord'

// initial state
const state = {
    laterMedicalRecordLoading: false,
    laterMedicalRecordData: {},
    requestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    getLaterMedicalRecordLoading: (state, getters, rootState) => {
        return state.laterMedicalRecordLoading
    },
    laterMedicalRecordData: (state, getters, rootState) => {
        return state.laterMedicalRecordData
    },
    laterMedicalRecordRequestStatus: (state, getters, rootState) => {
        return state.requestStatus
    }

}

// actions
const actions = {
    // 获取关注指标
    [type.GET_LATER_MEDICALRECORD]({
        dispatch,
        commit,
        state
    }, data) {
        commit(type.LATER_MEDICALRECORD_LOADING)
        getLaterMedicalRecord(data.payload).then(res => {
            commit({
                type: type.GET_LATER_MEDICALRECORD_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_LATER_MEDICALRECORD_FAILED,
                payload: {
                    isError: true,
                    msg: '获取体检记录失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取最近一次的体检记录
    [type.LATER_MEDICALRECORD_LOADING](state) {
        state.laterMedicalRecordLoading = true
        state.requestStatus.msg = ''
        state.requestStatus.isError = false
    },
    [type.GET_LATER_MEDICALRECORD_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_LATER_MEDICALRECORD_SUCCESS', payload.result);
        state.laterMedicalRecordLoading = false
        state.requestStatus.msg = payload.result.message
        if (payload.result.status === '1') {
            state.requestStatus.isError = false
            state.laterMedicalRecordData = payload.result.data
        } else {
            state.requestStatus.isError = true
        }
    },
    [type.GET_LATER_MEDICALRECORD_FAILED](state, data) {
        let payload = data.payload
        state.laterMedicalRecordLoading = false
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

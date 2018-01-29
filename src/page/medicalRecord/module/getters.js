//  store 的计算属性
//  import state from '../../../store/state'

export default {
    loadingMedicalRecordList: (state, getters, rootState) => {
        return state.loadingMedicalRecordList
    },
    medicalRecordListData: (state, getters, rootState) => {
        return state.medicalRecordListData
    },
    medicalRecordLisRequestStatus: (state, getters, rootState) => {
        return state.medicalRecordLisRequestStatus
    }
}

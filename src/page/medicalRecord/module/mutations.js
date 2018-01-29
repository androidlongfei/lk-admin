// 处理同步逻辑

import * as type from './mutations_types'
export default {
    [type.LOADING_MEDICALRECORD_DATA] (state) {
        state.loadingMedicalRecordList = true
        state.medicalRecordLisRequestStatus.msg = ''
        state.medicalRecordLisRequestStatus.isError = false
    },

    [type.GET_MEDICALRECORD_DATA_SUCCESS] (state, data) {
        let payload = data.payload
        state.loadingMedicalRecordList = false
        state.medicalRecordListData = payload.result.data
        console.log('GET_MEDICALRECORD_DATA_SUCCESS', payload)
        state.medicalRecordLisRequestStatus.msg = payload.result.msg
        if (payload.result.status === 'success') {
            state.medicalRecordLisRequestStatus.isError = false
        }
    },

    [type.GET_MEDICALRECORD_DATA_FAILED] (state, data) {
        let payload = data.payload
        state.loadingMedicalRecordList = false
        state.medicalRecordLisRequestStatus.msg = payload.msg
        state.medicalRecordLisRequestStatus.isError = true
    }
}


import { getMedicalDetails } from '../../../../service/medicalRecord'
let store = {
    state: {
        loadingMedicalRecordImg: false,
        medicalRecordImgList: [],
        medicalRecordImgRequestStatus: {
            isError: false,
            msg: ''
        }
    },
    getters: {
        loadingMedicalRecordImg (state) {
            return state.loadingMedicalRecordImg
        },
        medicalRecordImgList (state) {
            return state.medicalRecordImgList
        },
        medicalRecordImgRequestStatus (state) {
            return state.medicalRecordImgRequestStatus
        }
    },
    mutations: {
        LOADING_MEDICALRECORDIMG (state) {
            state.loadingMedicalRecordImg = true
            state.medicalRecordImgRequestStatus.isError = false
            state.medicalRecordImgRequestStatus.msg = ''
        },
        GET_MEDICALRECORDIMG_SUCCESS (state, data) {
            let payload = data.payload
            state.loadingMedicalRecordImg = false
            //  console.log(data.payload.result.data.imgList, 'GET_MEDICALRECORDIMG_SUCCESS')
            state.medicalRecordImgList = payload.result.data.imgList
            state.medicalRecordImgRequestStatus.msg = payload.result.msg
            if (payload.result.status === 'success') {
                state.medicalRecordImgRequestStatus.isError = false
            } else {
                state.medicalRecordImgRequestStatus.isError = true
            }
        },
        GET_MEDICALRECORDIMG_FAILED (state, data) {
            let payload = data.payload
            state.loadingMedicalRecordImg = false
            state.medicalRecordImgRequestStatus.msg = payload.msg
            state.medicalRecordImgRequestStatus.isError = true
        }
    },
    actions: {
        GETMEDICALRECORDEIMGS ({dispatch, commit, state}, data) {
            commit('LOADING_MEDICALRECORDIMG')
            getMedicalDetails(data.payload).then(res => {
                console.log(res, 'MEDICALRECORDETAILS datas')
                commit({
                    type: 'GET_MEDICALRECORDIMG_SUCCESS',
                    payload: {
                        result: res
                    }
                })
            }).catch((ex) => {
                console.log(ex)
                commit({
                    type: 'GET_MEDICALRECORDIMG_FAILED',
                    payload: {
                        isError: true,
                        msg: '获取图片信息失败'
                    }
                })
            })
        }
    }
}
export default store

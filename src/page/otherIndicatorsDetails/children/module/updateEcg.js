import { updateIndicatorsDetails } from '../../../../service/indicatorsDetails'
let store = {
    state: {
        loadingUpdateEcg: false,
        updateEcgRequestStatus: {
            isError: false,
            msg: '',
            status: ''
        }
    },
    getters: {
        loadingUpdateEcg (state) {
            return state.loadingUpdateEcg
        },
        updateEcgRequestStatus (state) {
            return state.updateEcgRequestStatus
        }
    },
    mutations: {
        LOADING_UPDATE_ECG (state) {
            state.loadingUpdateEcg = true
            state.updateEcgRequestStatus.isError = false
            state.updateEcgRequestStatus.msg = ''
        },
        UPDATE_ECG_SUCCESS (state, data) {
            let payload = data.payload
            state.loadingUpdateEcg = false
            state.updateEcgRequestStatus.msg = payload.result.message
            state.updateEcgRequestStatus.status = payload.result.status
            if (payload.result.status === 'success') {
                state.updateEcgRequestStatus.isError = false
            } else {
                state.updateEcgRequestStatus.isError = true
            }
        },
        UPDATE_ECG_FAILED (state, data) {
            let payload = data.payload
            state.loadingUpdateEcg = false
            state.updateEcgRequestStatus.msg = payload.msg
            state.updateEcgRequestStatus.isError = true
        }
    },
    actions: {
        UPDATE_ECG ({dispatch, commit, state}, data) {
            commit('LOADING_UPDATE_ECG')
            updateIndicatorsDetails(data.payload).then(res => {
                console.log(res, 'UPDATE_ECG_SUCCESS datas')
                commit({
                    type: 'UPDATE_ECG_SUCCESS',
                    payload: {
                        result: res
                    }
                })
            }).catch((ex) => {
                commit({
                    type: 'UPDATE_ECG_FAILED',
                    payload: {
                        isError: true,
                        msg: '更新ECG信息失败'
                    }
                })
                console.log(ex)
            })
        }
    }
}
export default store

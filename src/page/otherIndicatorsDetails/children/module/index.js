import { updateIndicatorsDetails } from '../../../../service/indicatorsDetails'
let store = {
    state: {
        loadingUpdateOtherIndicators: false,
        loadingUpdateOtherIndicatorData: {},
        updateOtherIndicatorsRequestStatus: {
            isError: false,
            msg: '',
            status: ''
        }
    },
    getters: {
        loadingUpdateOtherIndicators (state) {
            return state.loadingUpdateOtherIndicators
        },
        updateOtherIndicatorsRequestStatus (state) {
            return state.updateOtherIndicatorsRequestStatus
        }
    },
    mutations: {
        LOADING_UPDATE_OTHERS_INDICATORSDETAILS (state) {
            state.loadingUpdateOtherIndicators = true
            state.updateOtherIndicatorsRequestStatus.isError = false
            state.updateOtherIndicatorsRequestStatus.msg = ''
        },
        UPDATE_OTHER_INDICATORSDETAILS_SUCCESS (state, data) {
            let payload = data.payload
            state.loadingUpdateOtherIndicators = false
            state.updateOtherIndicatorsRequestStatus.msg = payload.result.message
            state.updateOtherIndicatorsRequestStatus.status = payload.result.status
            if (payload.result.status === 'success') {
                state.updateOtherIndicatorsRequestStatus.isError = false
            } else {
                state.updateOtherIndicatorsRequestStatus.isError = true
            }
        },
        UPDATE_OTHER_INDICATORSDETAILS_FAILED (state, data) {
            let payload = data.payload
            state.loadingUpdateOtherIndicators = false
            state.updateOtherIndicatorsRequestStatus.msg = payload.msg
            state.updateOtherIndicatorsRequestStatus.isError = true
        }
    },
    actions: {
        UPDATEOTHERINDICATORS ({dispatch, commit, state}, data) {
            commit('LOADING_UPDATE_OTHERS_INDICATORSDETAILS')
            updateIndicatorsDetails(data.payload).then(res => {
                console.log(res, 'UPDATEOTHERINDICATORS datas')
                commit({
                    type: 'UPDATE_OTHER_INDICATORSDETAILS_SUCCESS',
                    payload: {
                        result: res
                    }
                })
            }).catch((ex) => {
                commit({
                    type: 'UPDATE_OTHER_INDICATORSDETAILS_FAILED',
                    payload: {
                        isError: true,
                        msg: '更新指标信息失败'
                    }
                })
                console.log(ex)
            })
        }
    }
}
export default store

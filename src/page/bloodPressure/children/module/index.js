import { updateIndicatorsDetails } from '../../../../service/indicatorsDetails'

let store = {
    state: {
        loadingUpdateIndicator: false,
        loadingUpdateIndicatorData: [],
        updateIndicatorsRequestStatus: {
            isError: false,
            msg: '',
            status: ''
        }
    },
    getters: {
        loadingUpdateIndicator (state) {
            return state.loadingUpdateIndicator
        },
        updateIndicatorsRequestStatus (state) {
            return state.updateIndicatorsRequestStatus
        }
    },
    mutations: {
        LOADING_UPDATE_INDICATORSDETAILS (state) {
            state.loadingUpdateIndicator = true
            state.updateIndicatorsRequestStatus.isError = false
            state.updateIndicatorsRequestStatus.msg = ''
        },
        UPDATE_INDICATORSDETAILS_SUCCESS (state, data) {
            let payload = data.payload
            console.log(data.payload, 'data.payload')
            state.loadingUpdateIndicator = false
            state.updateIndicatorsRequestStatus.msg = payload.result.message
            state.updateIndicatorsRequestStatus.status = payload.result.status
            if (payload.result.status === 'success') {
                state.updateIndicatorsRequestStatus.isError = false
            } else {
                state.updateIndicatorsRequestStatus.isError = true
            }
        },
        UPDATE_INDICATORSDETAILS_FAILED (state, data) {
            let payload = data.payload
            state.loadingUpdateIndicator = false
            state.updateIndicatorsRequestStatus.msg = payload.msg
            state.updateIndicatorsRequestStatus.isError = true
        }
    },
    actions: {
        UPDATEINDICATORSDETAILS ({dispatch, commit, state}, data) {
            commit('LOADING_UPDATE_INDICATORSDETAILS')
            updateIndicatorsDetails(data.payload).then(res => {
                console.log(res, 'UPDATEINDICATORSDETAILS datas')
                commit({
                    type: 'UPDATE_INDICATORSDETAILS_SUCCESS',
                    payload: {
                        result: res
                    }
                })
            }).catch((ex) => {
                console.log(ex)
                commit({
                    type: 'UPDATE_INDICATORSDETAILS_FAILED',
                    payload: {
                        isError: true,
                        msg: '更新指标信息失败'
                    }
                })
            })
        }

    }
}
export default store

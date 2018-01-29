import { updateIndicatorsDetails } from '../../../../service/indicatorsDetails'

let store = {
    state: {
        loadingUpdateSleepTime: false,
        updateSleepTimeRequestStatus: {
            isError: false,
            msg: '',
            status: ''
        }
    },
    getters: {
        loadingUpdateSleepTime (state) {
            return state.loadingUpdateSleepTime
        },
        updateSleepTimeRequestStatus (state) {
            return state.updateSleepTimeRequestStatus
        }
    },
    mutations: {
        LOADING_UPDATE_SLEEP_TIME (state) {
            state.loadingUpdateSleepTime = true
            state.updateSleepTimeRequestStatus.isError = false
            state.updateSleepTimeRequestStatus.msg = ''
        },
        UPDATE_SLEEP_TIME_SUCCESS (state, data) {
            let payload = data.payload
            state.loadingUpdateSleepTime = false
            state.updateSleepTimeRequestStatus.msg = payload.result.message
            state.updateSleepTimeRequestStatus.status = payload.result.status
            if (payload.result.status === 'success') {
                state.updateSleepTimeRequestStatus.isError = false
            } else {
                state.updateSleepTimeRequestStatus.isError = true
            }
        },
        UPDATE_SLEEP_TIME_FAILED (state, data) {
            let payload = data.payload
            state.loadingUpdateSleepTime = false
            state.updateSleepTimeRequestStatus.msg = payload.message
            state.updateSleepTimeRequestStatus.isError = true
        }
    },
    actions: {
        UPDATESLEEPTIME ({dispatch, commit, state}, data) {
            commit('LOADING_UPDATE_SLEEP_TIME')
            updateIndicatorsDetails(data.payload).then(res => {
                console.log(res, 'UPDATESLEEPTIME')
                commit({
                    type: 'UPDATE_SLEEP_TIME_SUCCESS',
                    payload: {
                        result: res
                    }
                })
            }).catch((ex) => {
                console.log(ex)
                commit({
                    type: 'UPDATE_SLEEP_TIME_FAILED',
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

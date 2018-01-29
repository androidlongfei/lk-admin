import { getIndicatorsDetails } from '../../../../service/indicatorsDetails'
let store = {
    state: {
        loadingEcg: false,
        ecgData: {},
        ecgRequestStatus: {
            isError: false,
            msg: ''
        }
    },
    getters: {
        loadingEcg (state) {
            return state.loadingEcg
        },
        ecgData (state) {
            return state.ecgData
        },
        ecgRequestStatus (state) {
            return state.ecgRequestStatus
        }
    },
    mutations: {
        LOADING_ECG (state) {
            state.loadingEcg = true
            state.ecgRequestStatus.isError = false
            state.ecgRequestStatus.msg = ''
        },
        GET_ECG_SUCCESS (state, data) {
            let payload = data.payload
            state.loadingEcg = false
            console.log('ecgData', payload.result.data)
            state.ecgData = payload.result.data
            state.ecgRequestStatus.msg = payload.result.msg
            if (payload.result.status === 'success') {
                state.ecgRequestStatus.isError = false
            } else {
                state.ecgRequestStatus.isError = true
            }
        },
        GET_ECG_FAILED (state, data) {
            let payload = data.payload
            state.loadingEcg = false
            state.ecgRequestStatus.msg = payload.message
            state.ecgRequestStatus.isError = true
        }
    },
    actions: {
        GET_ECG ({dispatch, commit, state}, data) {
            commit('LOADING_ECG')
            getIndicatorsDetails(data.payload).then(res => {
                console.log(res, 'GET_ECG_SUCCESS datas')
                commit({
                    type: 'GET_ECG_SUCCESS',
                    payload: {
                        result: res
                    }
                })
            }).catch((ex) => {
                commit({
                    type: 'GET_ECG_FAILED',
                    payload: {
                        isError: true,
                        msg: '获取心电数据失败, 服务器异常'
                    }
                })
                console.log(ex)
            })
        }
    }
}
export default store

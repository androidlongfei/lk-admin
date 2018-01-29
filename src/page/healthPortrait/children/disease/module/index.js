import * as type from './mutations_types'
import {
    upDateDisease, getDisease
} from '../../../../../service/disease'

const state = {
    upDateDiseaseLoading: false,
    diseaseLoading: false,
    diseaseData: {},
    diseaseRequestStatus: {
        isError: false,
        msg: ''
    }
}

//  store 的计算属性

const getters = {
    upDateDiseaseLoading: (state, getters, rootState) => {
        return state.upDateDiseaseLoading
    },
    diseaseLoading: (state, getters, rootState) => {
        return state.diseaseLoading
    },
    diseaseData: (state, getters, rootState) => {
        return state.diseaseData
    },
    diseaseRequestStatus: (state, getters, rootState) => {
        return state.diseaseRequestStatus
    }
}

const actions = {
    // 提交病史状况
    [type.UPDATE_DISEASE]({
                               dispatch,
                               commit,
                               state
                           }, data) {
        commit(type.DISEASE_LOADING)
        console.log(data.payload, '这个参数有什么不一样的地方')
        upDateDisease(data.payload).then(res => {
            //  console.log('进入updata函数了')
            commit({
                type: type.UPDATE_DISEASE_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.UPDATE_DISEASE_FAILED,
                payload: {
                    isError: true,
                    msg: '更新信息失败'
                }
            })
        })
    },
    // 获取病史状况
    [type.GET_DISEASE]({
                            dispatch,
                            commit,
                            state
                        }, data) {
        // console.log(`${type.UPDATE_USER_INFO}-data-payload`, data.payload)
        commit(type.GET_DISEASE_LOADING)
        console.log(data.payload, '这个参数有什么不一样的地方')
        getDisease(data.payload).then(res => {
            //  console.log('进入updata函数了')
            commit({
                type: type.GET_DISEASE_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_DISEASE_FAILED,
                payload: {
                    isError: true,
                    msg: '获取病史状况失败'
                }
            })
        })
    }
}


const mutations = {
    [type.DISEASE_LOADING](state) {
        state.upDateDiseaseLoading = true
        state.diseaseRequestStatus.msg = ''
        state.diseaseRequestStatus.isError = false
    },
    [type.UPDATE_DISEASE_SUCCESS](state, data) {
        let payload = data.payload
        state.upDateDiseaseLoading = false
        state.diseaseRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        if (payload.result.status === '1') {
            state.diseaseRequestStatus.isError = false
            state.diseaseData = payload.result.data
        } else {
            state.diseaseRequestStatus.isError = true
        }
    },
    [type.UPDATE_DISEASE_FAILED](state, data) {
        let payload = data.payload
        state.upDateDiseaseLoading = false
        state.diseaseRequestStatus.msg = payload.msg
        state.diseaseRequestStatus.isError = true
    },
    [type.GET_DISEASE_LOADING](state) {
        state.diseaseLoading = true
        state.diseaseRequestStatus.msg = ''
        state.diseaseRequestStatus.isError = false
    },
    [type.GET_DISEASE_SUCCESS](state, data) {
        let payload = data.payload
        state.diseaseLoading = false
        state.diseaseRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        // console.log('payload.result.data', state.diseaseData)
        if (payload.result.status === '1') {
            state.diseaseRequestStatus.isError = false
            state.diseaseData = payload.result.data
        } else {
            state.diseaseRequestStatus.isError = true
        }
    },
    [type.GET_DISEASE_FAILED](state, data) {
        let payload = data.payload
        state.diseaseLoading = false
        state.diseaseRequestStatus.msg = payload.msg
        state.diseaseRequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

import * as type from './mutations_types'
import {
    upDateBaseInfo, getBaseInfo
} from '../../../../../service/baseInfo'

const state = {
    upDateBaseInfoLoading: false,
    baseInfoLoading: false,
    baseInfoData: {},
    baseInfoRequestStatus: {
        isError: false,
        msg: ''
    }
}

//  store 的计算属性

const getters = {
    upDateBaseInfoLoading: (state, getters, rootState) => {
        return state.upDateBaseInfoLoading
    },
    baseInfoLoading: (state, getters, rootState) => {
        return state.baseInfoLoading
    },
    baseInfoData: (state, getters, rootState) => {
        return state.baseInfoData
    },
    baseInfoRequestStatus: (state, getters, rootState) => {
        return state.baseInfoRequestStatus
    }
}

const actions = {
    // 提交个人信息
    [type.UPDATE_BASEINFO]({
                               dispatch,
                               commit,
                               state
                           }, data) {
        // console.log(`${type.UPDATE_USER_INFO}-data-payload`, data.payload)
        commit(type.BASEINFO_LOADING)
        console.log(data.payload, '这个参数有什么不一样的地方')
        upDateBaseInfo(data.payload).then(res => {
            //  console.log('进入updata函数了')
            commit({
                type: type.UPDATE_BASEINFO_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.UPDATE_BASEINFO_FAILED,
                payload: {
                    isError: true,
                    msg: '更新信息失败'
                }
            })
        })
    },
    // 获取个人信息
    [type.GET_BASEINFO]({
                            dispatch,
                            commit,
                            state
                        }, data) {
        // console.log(`${type.UPDATE_USER_INFO}-data-payload`, data.payload)
        commit(type.GET_BASEINFO_LOADING)
        console.log(data.payload, '这个参数有什么不一样的地方')
        getBaseInfo(data.payload).then(res => {
            //  console.log('进入updata函数了')
            commit({
                type: type.GET_BASEINFO_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_BASEINFO_FAILED,
                payload: {
                    isError: true,
                    msg: '获取信息失败'
                }
            })
        })
    }
}


const mutations = {
    [type.BASEINFO_LOADING](state) {
        state.upDateBaseInfoLoading = true
        state.baseInfoRequestStatus.msg = ''
        state.baseInfoRequestStatus.isError = false
    },
    [type.UPDATE_BASEINFO_SUCCESS](state, data) {
        let payload = data.payload
        console.log('UPDATE_BASEINFO_SUCCESS', payload.result);
        state.upDateBaseInfoLoading = false
        state.baseInfoRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        if (payload.result.status === '1') {
            state.baseInfoRequestStatus.isError = false
            state.baseInfoData = payload.result.data
        } else {
            state.baseInfoRequestStatus.isError = true
        }
    },
    [type.UPDATE_BASEINFO_FAILED](state, data) {
        let payload = data.payload
        state.upDateBaseInfoLoading = false
        state.baseInfoRequestStatus.msg = payload.msg
        state.baseInfoRequestStatus.isError = true
    },
    [type.GET_BASEINFO_LOADING](state) {
        state.baseInfoLoading = true
        state.baseInfoRequestStatus.msg = ''
        state.baseInfoRequestStatus.isError = false
    },
    [type.GET_BASEINFO_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_BASEINFO_SUCCESS', payload.result);
        state.baseInfoLoading = false
        state.baseInfoRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        // state.baseInfoData = payload.result.data
        console.log('payload.result.data', state.baseInfoData)
        if (payload.result.status === '1') {
            state.baseInfoRequestStatus.isError = false
            state.baseInfoData = payload.result.data
        } else {
            state.baseInfoRequestStatus.isError = true
        }
    },
    [type.GET_BASEINFO_FAILED](state, data) {
        let payload = data.payload
        state.baseInfoLoading = false
        state.baseInfoRequestStatus.msg = payload.msg
        state.baseInfoRequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

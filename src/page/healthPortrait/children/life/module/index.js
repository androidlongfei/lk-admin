import * as type from './mutations_types'
import {
    upDateLife,
    getLife
} from '../../../../../service/life'

const state = {
    upDateLifeLoading: false,
    lifeLoading: false,
    lifeData: {},
    lifeRequestStatus: {
        isError: false,
        msg: ''
    }
}

//  store 的计算属性

const getters = {
    upDateLifeLoading: (state, getters, rootState) => {
        return state.upDateLifeLoading
    },
    lifeLoading: (state, getters, rootState) => {
        return state.lifeLoading
    },
    lifeData: (state, getters, rootState) => {
        return state.lifeData
    },
    lifeRequestStatus: (state, getters, rootState) => {
        return state.lifeRequestStatus
    }
}

const actions = {
    // 提交病史状况
    [type.UPDATE_LIFE]({
        dispatch,
        commit,
        state
    }, data) {
        commit(type.LIFE_LOADING)
        console.log(data.payload, '这个参数有什么不一样的地方')
        upDateLife(data.payload).then(res => {
            //  console.log('进入updata函数了')
            commit({
                type: type.UPDATE_LIFE_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.UPDATE_LIFE_FAILED,
                payload: {
                    isError: true,
                    msg: '更新信息失败'
                }
            })
        })
    },
    // 获取病史状况
    [type.GET_LIFE]({
        dispatch,
        commit,
        state
    }, data) {
        // console.log(`${type.UPDATE_USER_INFO}-data-payload`, data.payload)
        commit(type.GET_LIFE_LOADING)
        console.log(data.payload, '这个参数有什么不一样的地方')
        getLife(data.payload).then(res => {
            //  console.log('进入updata函数了')
            commit({
                type: type.GET_LIFE_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_LIFE_FAILED,
                payload: {
                    isError: true,
                    msg: '获取病史状况失败'
                }
            })
        })
    }
}


const mutations = {
    [type.LIFE_LOADING](state) {
        state.upDateLifeLoading = true
        state.lifeRequestStatus.msg = ''
        state.lifeRequestStatus.isError = false
    },
    [type.UPDATE_LIFE_SUCCESS](state, data) {
        let payload = data.payload
        state.upDateLifeLoading = false
        state.lifeRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        if (payload.result.status === '1') {
            state.lifeRequestStatus.isError = false
            // state.lifeData = payload.result.data
        } else {
            state.lifeRequestStatus.isError = true
        }
    },
    [type.UPDATE_LIFE_FAILED](state, data) {
        let payload = data.payload
        state.upDateLifeLoading = false
        state.lifeRequestStatus.msg = payload.msg
        state.lifeRequestStatus.isError = true
    },
    [type.GET_LIFE_LOADING](state) {
        state.lifeLoading = true
        state.lifeRequestStatus.msg = ''
        state.lifeRequestStatus.isError = false
    },
    [type.GET_LIFE_SUCCESS](state, data) {
        let payload = data.payload
        state.lifeLoading = false
        state.lifeRequestStatus.msg = payload.result.message
        // 正式接口时打开判断
        // state.lifeData = payload.result.data
        // console.log('payload.result.data', state.lifeData)
        if (payload.result.status === '1') {
            state.lifeRequestStatus.isError = false
            state.lifeData = payload.result.data
        } else {
            state.lifeRequestStatus.isError = true
        }
    },
    [type.GET_LIFE_FAILED](state, data) {
        let payload = data.payload
        state.lifeLoading = false
        state.lifeRequestStatus.msg = payload.msg
        state.lifeRequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

import { LOGIN_BY_USERNAME, LOGIN_SUCCESS_BY_USERNAME, LOGIN_FAILED_BY_USERNAME } from './mutations_types'
import { login } from '../../../service/user'

// 初始化state状态
const state = {
    user: {}, // 当前用户
    requestStatus: {
        isError: false,
        message: ''
    }
}

const getters = {
    getCurrentUserInfo: (state, getters, rootState) => {
        return state.user
    },
    loginRequestStatus: (state) => {
        return state.requestStatus
    }
}

const actions = {
    // 登录
    [LOGIN_BY_USERNAME]({
        dispatch,
        commit,
        state
    }, data) {
        console.log('login param', data)
        return new Promise((resolve, reject) => {
            login(data).then(res => {
                console.log('login action success', res)
                commit(LOGIN_SUCCESS_BY_USERNAME, res)
                resolve(res)
            }).catch((ex) => {
                console.log('login error', ex)
                commit(LOGIN_FAILED_BY_USERNAME)
                reject(ex)
            })
        })
    }
}

const mutations = {
    [LOGIN_SUCCESS_BY_USERNAME](state, data) {
        const content = data.data
        console.log('login mutation', data)
        if (data.status === '1') {
            // 登录成功
            state.requestStatus.isError = false
            state.user = content.user
        } else {
            // 登录失败
            state.requestStatus.isError = true
            state.requestStatus.message = data.message ? data.message : '登录失败,服务器异常'
        }
    },
    [LOGIN_FAILED_BY_USERNAME](state, data) {
        // 登录失败
        state.requestStatus.isError = true
        state.requestStatus.message = '登录失败,服务器异常'
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

import { LOGIN_BY_USERNAME, LOGIN_SUCCESS_BY_USERNAME, LOGIN_FAILED_BY_USERNAME, GET_USER_INFO, GET_USER_INFO_SUCCESS } from './mutations_types'
import { login, getUserInfo, logout } from '../../../service/user'

// 初始化state状态
const state = {
    user: {}, // 当前用户
    roles: [], // 权限
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    requestStatus: {
        isError: false,
        message: ''
    }
}

const getters = {
    currentUserInfo: (state, getters, rootState) => {
        return state.user
    },
    loginRequestStatus: (state) => {
        return state.requestStatus
    },
    roles: (state) => {
        return state.roles
    }
}

const actions = {
    // 登录
    [LOGIN_BY_USERNAME]({
        dispatch,
        commit,
        state
    }, data) {
        // console.log('login param', data)
        return new Promise((resolve, reject) => {
            login(data).then(res => {
                // console.log('login action success', res)
                commit(LOGIN_SUCCESS_BY_USERNAME, res)
                resolve(res)
            }).catch((ex) => {
                // console.log('login error', ex)
                commit(LOGIN_FAILED_BY_USERNAME)
                reject(ex)
            })
        })
    },
    // 获取用户信息
    [GET_USER_INFO]({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo().then(res => {
                // console.log('getUserInfo', res)
                commit(GET_USER_INFO_SUCCESS, res)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 登出
    LogOut({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                resolve()
            }).catch(error => {
                console.log(error)
                resolve()
                // reject(error)
            })
        })
    }
}

const mutations = {
    // 登录
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
    },
    [GET_USER_INFO_SUCCESS](state, data) {
        // 获取用户信息成功
        console.log('getUserInfo mutations', data)
        const content = data.data
        if (data.status === '1') {
            state.roles = content.roles
            state.user = content.user
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

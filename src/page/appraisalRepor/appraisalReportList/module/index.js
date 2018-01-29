import * as type from './mutations_types'
import {
    findExternalReportList,
    findInternalReportList
} from '../../../../service/appraisalReport'

// initial state
const state = {
    externalReportListLoading: false,
    moreExternalReportListLoading: false,
    internalReportListLoading: false,
    moreInternalReportListLoading: false,
    externalReportListData: [],
    internalReportListData: [],
    externalReportListTotalPage: 0,
    internalReportListTotalPage: 0,
    requestStatus: {
        isError: false,
        msg: ''
    }
}

// getters
const getters = {
    getExternalReportListLoading: (state, getters, rootState) => {
        return state.externalReportListLoading
    },
    getInternalReportListLoading: (state, getters, rootState) => {
        return state.internalReportListLoading
    },
    getMoreExternalReportListLoading: (state, getters, rootState) => {
        return state.moreExternalReportListLoading
    },
    getMoreInternalReportListLoading: (state, getters, rootState) => {
        return state.moreInternalReportListLoading
    },
    externalReportListTotalPage: (state, getters, rootState) => {
        return state.externalReportListTotalPage
    },
    internalReportListTotalPage: (state, getters, rootState) => {
        return state.internalReportListTotalPage
    },
    externalReportListData: (state, getters, rootState) => {
        return state.externalReportListData
    },
    internalReportListData: (state, getters, rootState) => {
        return state.internalReportListData
    },
    reportListRequestStatus: (state, getters, rootState) => {
        return state.requestStatus
    },
    localUserInfo: (state, getters, rootState) => {
        return rootState.home.baseInfoData || {}
    }
}

// actions
const actions = {
    // 获取外部评估报告列表
    [type.GET_EXTERNAL_REPORT_LIST]({
        dispatch,
        commit,
        state
    }, data) {
        console.log('-----GET_EXTERNAL_REPORT_LIST', data.payload)
        commit(type.EXTERNAL_REPORT_LIST_LOADING)
        findExternalReportList(data.payload).then(res => {
            commit({
                type: type.GET_EXTERNAL_REPORT_LIST_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_EXTERNAL_REPORT_LIST_FAILED,
                payload: {
                    isError: true,
                    msg: '获取报告列表失败,服务器异常'
                }
            })
        })
    },
    // 获取内部评估报告列表
    [type.GET_INTERNAL_REPORT_LIST]({
        dispatch,
        commit,
        state
    }, data) {
        commit(type.INTERNAL_REPORT_LIST_LOADING)
        findInternalReportList(data.payload).then(res => {
            commit({
                type: type.GET_INTERNAL_REPORT_LIST_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_INTERNAL_REPORT_LIST_FAILED,
                payload: {
                    isError: true,
                    msg: '获取报告列表失败,服务器异常'
                }
            })
        })
    },
    // 加载更多外部评估报告列表
    [type.GET_MORE_EXTERNAL_REPORT_LIST]({
        dispatch,
        commit,
        state
    }, data) {
        console.log('-----GET_MORE_EXTERNAL_REPORT_LIST', data.payload)
        commit(type.MORE_EXTERNAL_REPORT_LIST_LOADING)
        findExternalReportList(data.payload).then(res => {
            commit({
                type: type.GET_MORE_EXTERNAL_REPORT_LIST_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_MORE_EXTERNAL_REPORT_LIST_FAILED,
                payload: {
                    isError: true,
                    msg: '获取报告列表失败,服务器异常'
                }
            })
        })
    },
    // 加载更多内部评估报告列表
    [type.GET_MORE_INTERNAL_REPORT_LIST]({
        dispatch,
        commit,
        state
    }, data) {
        // console.log('-----GET_MORE_INTERNAL_REPORT_LIST', data.payload)
        commit(type.MORE_INTERNAL_REPORT_LIST_LOADING)
        findInternalReportList(data.payload).then(res => {
            commit({
                type: type.GET_MORE_INTERNAL_REPORT_LIST_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_MORE_INTERNAL_REPORT_LIST_FAILED,
                payload: {
                    isError: true,
                    msg: '获取报告列表失败,服务器异常'
                }
            })
        })
    }
}

// mutations
const mutations = {
    // 获取外部评估报告
    [type.EXTERNAL_REPORT_LIST_LOADING](state) {
        state.externalReportListLoading = true
        state.requestStatus.msg = ''
        state.requestStatus.isError = false
    },
    [type.GET_EXTERNAL_REPORT_LIST_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_EXTERNAL_REPORT_LIST_SUCCESS', payload.result);
        state.externalReportListLoading = false
        state.requestStatus.msg = payload.result.message
        // mock 测试数据
        state.requestStatus.isError = false
        // state.externalReportListData = payload.result.data.dataList
        // state.externalReportListTotalPage = payload.result.data.totalPages
        if (payload.result.status === '1') {
            state.requestStatus.isError = false
            state.externalReportListData = payload.result.data.dataList
            state.externalReportListTotalPage = payload.result.data.totalPages
        } else {
            state.requestStatus.isError = true
        }
    },
    [type.GET_EXTERNAL_REPORT_LIST_FAILED](state, data) {
        let payload = data.payload
        state.externalReportListLoading = false
        state.requestStatus.msg = payload.msg
        state.requestStatus.isError = true
    },

    // 获取内评估报告
    [type.INTERNAL_REPORT_LIST_LOADING](state) {
        state.internalReportListLoading = true
        state.requestStatus.msg = ''
        state.requestStatus.isError = false
    },
    [type.GET_INTERNAL_REPORT_LIST_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_INTERNAL_REPORT_LIST_SUCCESS', payload.result);
        state.internalReportListLoading = false
        state.requestStatus.msg = payload.result.message
        // mock 测试数据
        state.requestStatus.isError = false
        // state.internalReportListData = payload.result.data.dataList
        // state.internalReportListTotalPage = payload.result.data.totalPages
        if (payload.result.status === '1') {
            state.requestStatus.isError = false
            state.internalReportListData = payload.result.data.dataList
            state.internalReportListTotalPage = payload.result.data.totalPages
        } else {
            state.requestStatus.isError = true
        }
    },
    [type.GET_INTERNAL_REPORT_LIST_FAILED](state, data) {
        let payload = data.payload
        state.internalReportListLoading = false
        state.requestStatus.msg = payload.msg
        state.requestStatus.isError = true
    },

    // 加载更多外部评估报告列表
    [type.MORE_EXTERNAL_REPORT_LIST_LOADING](state) {
        state.moreExternalReportListLoading = true
        state.requestStatus.msg = ''
        state.requestStatus.isError = false
    },
    [type.GET_MORE_EXTERNAL_REPORT_LIST_SUCCESS](state, data) {
        let payload = data.payload
        console.log('GET_MORE_EXTERNAL_REPORT_LIST_SUCCESS', payload.result);
        state.moreExternalReportListLoading = false
        state.requestStatus.msg = payload.result.message
        // mock 测试数据
        state.requestStatus.isError = false
        // state.externalReportListData = payload.result.data.dataList
        // state.externalReportListTotalPage = payload.result.data.totalPages
        if (payload.result.status === '1') {
            state.requestStatus.isError = false
            state.externalReportListTotalPage = payload.result.data.totalPages
            state.externalReportListData = payload.result.data.dataList
        } else {
            state.requestStatus.isError = true
        }
    },
    [type.GET_MORE_EXTERNAL_REPORT_LIST_FAILED](state, data) {
        let payload = data.payload
        state.moreExternalReportListLoading = false
        state.requestStatus.msg = payload.msg
        state.requestStatus.isError = true
    },

    // 加载更多内部评估报告列表
    [type.MORE_INTERNAL_REPORT_LIST_LOADING](state) {
        state.moreInternalReportListLoading = true
        state.requestStatus.msg = ''
        state.requestStatus.isError = false
    },
    [type.GET_MORE_INTERNAL_REPORT_LIST_SUCCESS](state, data) {
        let payload = data.payload
        // console.log('GET_MORE_INTERNAL_REPORT_LIST_SUCCESS', payload.result);
        state.moreInternalReportListLoading = false
        state.requestStatus.msg = payload.result.message
        // mock 测试数据
        // state.requestStatus.isError = false
        // state.internalReportListData = payload.result.data.dataList
        // state.internalReportListTotalPage = payload.result.data.totalPages
        if (payload.result.status === '1') {
            state.requestStatus.isError = false
            state.internalReportListData = payload.result.data.dataList
            state.internalReportListTotalPage = payload.result.data.totalPages
        } else {
            state.requestStatus.isError = true
        }
    },
    [type.GET_MORE_INTERNAL_REPORT_LIST_FAILED](state, data) {
        let payload = data.payload
        state.moreInternalReportListLoading = false
        state.requestStatus.msg = payload.msg
        state.requestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

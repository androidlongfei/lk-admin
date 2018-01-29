import * as type from './mutations_types'
import {
    findAftercare
} from '../../../../../service/aftercare'

// initial state
const state = {
    liveHealthLoading: false,
    liveHealthData: {},
    liveHealthRequestStatus: {
        isError: false,
        msg: ''
    }
};

// getters
const getters = {
    liveHealthLoading: (state, getters, rootState) => {
        return state.liveHealthLoading
    },
    liveHealthData: (state, getters, rootState) => {
        return state.liveHealthData
    },
    liveHealthRequestStatus: (state, getters, rootState) => {
        return state.liveHealthRequestStatus
    }
};

// actions
const actions = {
    // 获取调养建议
    [type.GET_LIVEHEALTH_DATA]({
                                   dispatch,
                                   commit,
                                   state
                               }, data) {
        commit(type.GET_LIVEHEALTH_DATA_LOADING);
        findAftercare(data.payload).then(res => {
            commit({
                type: type.GET_LIVEHEALTH_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_LIVEHEALTH_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取调居养数据失败,服务器异常'
                }
            })
        })
    }
};

// mutations
const mutations = {
    // 获取居养loading
    [type.GET_LIVEHEALTH_DATA_LOADING](state) {
        state.liveHealthLoading = true;
        state.liveHealthRequestStatus.msg = '';
        state.liveHealthRequestStatus.isError = false
    },
    [type.GET_LIVEHEALTH_DATA_SUCCESS](state, data) {
        let payload = data.payload;
        console.log('GET_LIVEHEALTH_DATA_SUCCESS', payload.result);
        state.liveHealthLoading = false;
        state.liveHealthRequestStatus.msg = payload.result.message;
        // 正式接口时打开判断
        console.log('payload.result.data', state.liveHealthData)
        if (payload.result.status === '1') {
            state.liveHealthRequestStatus.isError = false
            state.liveHealthData = payload.result.data
        } else {
            state.liveHealthRequestStatus.isError = true
        }
    },
    [type.GET_LIVEHEALTH_DATA_FAILED](state, data) {
        let payload = data.payload;
        state.liveHealthLoading = false;
        state.liveHealthRequestStatus.msg = payload.msg
        state.liveHealthRequestStatus.isError = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

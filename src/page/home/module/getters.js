//  store 的计算属性
//  import state from '../../../store/state'

export default {
    homeDataLoading: (state, getters, rootState) => {
        // console.log(rootState, 'rootState是什么啊')
        return state.homeDataLoading
    },
    homeData: (state, getters, rootState) => {
        return state.homeData
    },
    HomeRequestStatus: (state, getters, rootState) => {
        return state.HomeRequestStatus
    }
}

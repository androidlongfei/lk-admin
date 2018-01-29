import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// 初始化state状态
const state = {
    homeDataLoading: false,
    homeData: {},
    baseInfoData: {
        userName: '',
        gender: ''
    },
    HomeRequestStatus: {
        isError: false,
        msg: ''
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

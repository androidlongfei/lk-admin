import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// 初始化state状态
const state = {
    configData: {
        title: ''
    },
    otherIndicatorsDetailsLoading: false,
    otherIndicatorsDetailsData: {},
    otherIndicatorsDetailsRequestStatus: {
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

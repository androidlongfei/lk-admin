import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// 初始化state状态
const state = {
    healthConditionLoading: false,
    reportData: [],
    attentionIndicatorData: [],
    healthConditionRequestStatus: {
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

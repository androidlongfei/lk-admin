//  store 的计算属性
export default {
    otherIndicatorsDetailsLoading: (state, getters, rootState) => {
        return state.otherIndicatorsDetailsLoading
    },
    otherIndicatorsDetailsData: (state, getters, rootState) => {
        return state.otherIndicatorsDetailsData
    },
    otherIndicatorsDetailsRequestStatus: (state, getters, rootState) => {
        return state.otherIndicatorsDetailsRequestStatus
    }
}

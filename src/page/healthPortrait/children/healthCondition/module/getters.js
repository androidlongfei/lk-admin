export default {
    reportData: (state, getters, rootState) => {
        return state.reportData
    },
    attentionIndicatorData: (state, getters, rootState) => {
        return state.attentionIndicatorData
    },
    healthConditionRequestStatus: (state, getters, rootState) => {
        return state.healthConditionRequestStatus
    },
    healthConditionLoading: (state, getters, rootState) => {
        return state.healthConditionLoading
    }
}

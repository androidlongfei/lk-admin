export default {
    LOADINGPRESSUEDATA: (state, getters, rootState) => {
        // console.log(rootState, 'rootState是什么啊')
        return state.LOADINGPRESSUEDATA
    },
    pressureData: (state, getters, rootState) => {
        return state.pressureData
    },
    pressureRequestStatus: (state, getters, rootState) => {
        return state.pressureRequestStatus
    }
}

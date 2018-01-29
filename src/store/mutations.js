// 处理同步逻辑

import * as type from './mutations_types'

export default {
    [type.LOADING_INIT](state) {
        state.loading = false
        state.requestStatus.isError = false
        state.requestStatus.msg = ''
    },
    [type.LOADING](state) {
        state.loading = true
        state.requestStatus.isError = false
        state.requestStatus.msg = ''
    },

    [type.LOADING_FINISH](state, payload) {
        state.loading = false
        console.log('LOADING_FINISH', payload)
        state.requestStatus.isError = payload.isError
        state.requestStatus.msg = payload.msg
    }
}

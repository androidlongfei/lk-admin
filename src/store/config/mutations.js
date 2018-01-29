// 处理同步逻辑

import * as type from './mutations_types'

export default {
    [type.SHOW_CONFIG_INFO](states, payload) {
        states.loading = payload.loading
    }
}

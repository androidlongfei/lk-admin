import actions from './actions';
import mutations from './mutations';
import getters from './getters';

// 初始化state状态
const state = {
    appConfig: {},
    loading: false
}

export default {
    state,
    getters,
    actions,
    mutations
}

import Vue from 'vue'
import Vuex from 'vuex'

import config from './config'
import user from '../page/login/module'
import permission from '../page/permission/module'

const state = {
    loading: false
}

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        'config': config,
        'permission': permission,
        'user': user
    },
    state
})

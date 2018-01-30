import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../page/auth/module'
import home from '../page/home/module'

import config from './config'
import addIndicators from '../page/indicators/addIndicators/module'
import allIndicators from '../page/indicators/allIndicators/module'

import user from '../page/login/module'

// 权限
import permission from '../page/permission/module'

const state = {
    loading: false
}


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        'auth': auth,
        'home': home,
        'config': config,
        'addIndicators': addIndicators,
        'allIndicators': allIndicators,
        'permission': permission,
        'user': user
    },
    state
})

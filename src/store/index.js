import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../page/auth/module'
import home from '../page/home/module'

import configStore from './config'
import addIndicators from '../page/indicators/addIndicators/module'
import allIndicators from '../page/indicators/allIndicators/module'

// 权限
import permission from './permission'

const state = {
    loading: false
}


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        'auth': auth,
        'home': home,
        'config': configStore,
        'addIndicators': addIndicators,
        'allIndicators': allIndicators,
        'permission': permission
    },
    state
})

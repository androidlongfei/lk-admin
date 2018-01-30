import Vue from 'vue'
import Vuex from 'vuex'

import app from './config/app'
import errorLog from './config/errorLog'
import tagsView from './config/tagsView'

import user from '../page/login/module'
import permission from '../page/permission/module'

import getters from './getters'

const state = {
    loading: false
}

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        errorLog,
        tagsView,
        permission,
        user
    },
    state,
    getters
})

import Vue from 'vue'

import 'normalize.css/normalize.css' // reset css

import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang' // Internationalization
import store from './store/index'
import router from './router'
import globalFun from './config/globalFun'
import ReloadPage from './components/ReloadPage'
import CustomHeader from './components/CustomHeader'
import 'font-awesome/css/font-awesome.css'



import './styles/index.scss' // global css

import './icons' // icon

// 权限控制器
import './page/permission'

import 'babel-polyfill'

Vue.use(ElementUI, {
    size: 'medium', // set element-ui default size
    i18n: (key, value) => {
        // console.log('key', i18n.t(key, value))
        return i18n.t(key, value)
    }
})

// 全局方法
Vue.use(globalFun)

// 注册全局组件
// 服务器出错, 重新加载组件
Vue.component('reload-page', ReloadPage)
// 标题栏组件
Vue.component('custom-header', CustomHeader)

// 配置是否允许 vue-devtools 检查代码。开发版本默认为 true，生产版本默认为 false。
Vue.config.devtools = true
// 全局错误追踪
Vue.config.errorHandler = (err, vm, info) => {
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    if (err) {
        console.error('errorHandler-err', err)
        console.error('errorHandler-info', info)
    }
}


/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    i18n,
    template: '<App/>',
    components: {
        App
    }
})

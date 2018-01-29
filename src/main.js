import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import store from './store/index'
import 'vue-layer-mobile/need/layer.css'
import layer from 'vue-layer-mobile'
import router from './router'
import globalFun from './config/globalFun'
import ReloadPage from './components/ReloadPage'
import CustomHeader from './components/CustomHeader'
import 'font-awesome/css/font-awesome.css'
import VueScroller from 'vue-scroller'
// 引入echarts
import echarts from 'echarts'
import 'babel-polyfill'
Vue.prototype.$echarts = echarts

// ElementUI
Vue.use(ElementUI, { locale })

// use layer
Vue.use(layer)

//  滚动插件
Vue.use(VueScroller)
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
    template: '<App/>',
    components: {
        App
    }
})

import Vue from 'vue'
import Router from 'vue-router'

// 懒加载

// 登录
const login = r => require.ensure([], () => r(require('../page/login')), 'login')

// dashboard
const dashboard = r => require.ensure([], () => r(require('../page/dashboard')), 'dashboard')

Vue.use(Router)

export const constantRouterMap = [{
    path: '/',
    name: 'dashboard',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: dashboard
}, {
    path: '/login',
    component: login,
    hidden: true
}, {
    path: '/404',
    component: dashboard,
    hidden: true
}, {
    path: '/401',
    component: dashboard,
    hidden: true
}]

// 动态权限
export const asyncRouterMap = []

const router = new Router({
    // mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            if (to && to.name === 'home') {
                sessionStorage.setItem('homePosition', savedPosition.y)
            }
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    routes: constantRouterMap
});

export default router

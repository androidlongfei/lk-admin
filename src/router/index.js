import Vue from 'vue'
import Router from 'vue-router'

// 懒加载

const layout = r => require.ensure([], () => r(require('../page/layout/Layout')), 'layout')

// 登录
const login = r => require.ensure([], () => r(require('../page/login')), 'login')

// dashboard
const dashboard = r => require.ensure([], () => r(require('../page/dashboard')), 'dashboard')

// documentation
const documentation = r => require.ensure([], () => r(require('../page/documentation')), 'documentation')

// jsonEditor
const jsonEditor = r => require.ensure([], () => r(require('../page/components/children/JsonEditor')), 'JsonEditor')

Vue.use(Router)

export const constantRouterMap = [{
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
}, {
    path: '',
    component: layout,
    redirect: 'dashboard',
    children: [{
        path: 'dashboard',
        component: dashboard,
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
}, {
    path: '/documentation',
    component: layout,
    redirect: '/documentation/index',
    children: [{
        path: 'index',
        component: documentation,
        name: 'documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }]
}]

// 动态权限
export const asyncRouterMap = [{
    path: '/components',
    component: layout,
    name: 'components',
    meta: {
        title: 'components',
        icon: 'component'
    },
    children: [{
        path: 'json-editor',
        component: jsonEditor,
        name: 'jsonEditor',
        meta: { title: 'jsonEditor' }
    }]
}]

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

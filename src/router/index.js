import Vue from 'vue'
import Router from 'vue-router'

// 懒加载

const layout = r => require.ensure([], () => r(require('../page/layout')), 'layout')

// 登录
const login = r => require.ensure([], () => r(require('../page/login')), 'login')

// dashboard
const dashboard = r => require.ensure([], () => r(require('../page/dashboard')), 'dashboard')

// documentation
const documentation = r => require.ensure([], () => r(require('../page/documentation')), 'documentation')


// -----example
// form
const form = r => require.ensure([], () => r(require('../page/example/form')), 'form')
// table
const table = r => require.ensure([], () => r(require('../page/example/table')), 'table')
const complexTable = r => require.ensure([], () => r(require('../page/example/table/complexTable')), 'complexTable')
const drapTable = r => require.ensure([], () => r(require('../page/example/table/drapTable')), 'drapTable')


// errorPage
// 无权限
const errorPage401 = r => require.ensure([], () => r(require('../page/errorPage/401')), 'errorPage401')
// 找不到页面
const errorPage404 = r => require.ensure([], () => r(require('../page/errorPage/404')), 'errorPage404')


/**
 * 配置详解
 * hidden: true 路由不会再侧边栏出现 如401，login等页面(默认 false)
 * redirect: 'noredirect' 表示该路由不会在面包屑导航中出现
 */

Vue.use(Router)

export const constantRouterMap = [{
    path: '/login',
    component: login,
    hidden: true
}, {
    path: '/404',
    component: errorPage404,
    hidden: true
}, {
    path: '/401',
    component: errorPage401,
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
    path: '*',
    redirect: '/404',
    hidden: true
}]

// 动态权限
export const asyncRouterMap = [{
    path: '/example',
    component: layout,
    redirect: 'noredirect',
    name: 'example',
    meta: {
        title: 'example',
        icon: 'example'
    },
    children: [{
        path: 'form',
        component: form,
        name: 'testForm',
        meta: { title: 'form', icon: 'form', noCache: false }
    }, {
        path: '/example/table',
        component: table,
        redirect: 'noredirect',
        name: 'table',
        meta: { title: 'Table', icon: 'table' },
        children: [{
            path: 'complex-table',
            component: complexTable,
            name: 'complexTable',
            meta: { title: 'complexTable', icon: 'table', noCache: true }
        }, {
            path: 'drap-table',
            component: drapTable,
            name: 'drapTable',
            meta: { title: 'dragTable', icon: 'table', noCache: false }
        }]
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
}, {
    path: '/error',
    component: layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
        title: 'errorPages',
        icon: '404'
    },
    children: [
        { path: '401', component: errorPage401, name: 'page401', meta: { title: 'page401', noCache: true } },
        { path: '404', component: errorPage404, name: 'page404', meta: { title: 'page404', noCache: true } }
    ]
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

import Vue from 'vue'
import Router from 'vue-router'

import storage from '../config/storageHelp'

// 懒加载
//  首页
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
// 全部指标
const allIndicators = r => require.ensure([], () => r(require('../page/indicators/allIndicators/allIndicators')), 'allIndicators');
// 增加指标
const addIndicator = r => require.ensure([], () => r(require('../page/indicators/addIndicators/addIndicators')), 'addIndicator');

// 登录
const login = r => require.ensure([], () => r(require('../page/login')), 'login');

Vue.use(Router);

const Layout = 'ss'
const errorPage = ''
const dashboard = ''
const documentation = ''

export const constantRouterMap = [{
    path: '/',
    name: 'home',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: home
}, {
    path: '/indicators/addIndicator',
    name: 'addIndicator',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: addIndicator
}, {
    path: '/indicators/allIndicators',
    name: 'allIndicators',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: allIndicators
}, {
    path: '/login',
    component: login,
    hidden: true
}, {
    path: '/authredirect',
    component: home,
    hidden: true
}, {
    path: '/404',
    component: home,
    hidden: true
}, {
    path: '/401',
    component: home,
    hidden: true
}, {
    path: '',
    component: home,
    redirect: 'dashboard',
    children: [{
        path: 'dashboard',
        component: home,
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
}, {
    path: '/documentation',
    component: home,
    redirect: '/documentation/index',
    children: [{
        path: 'index',
        component: home,
        name: 'documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }]
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

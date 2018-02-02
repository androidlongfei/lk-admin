import router from '../../router'
import store from '../../store'
import {
    Message
} from 'element-ui'
import * as user from '../login/module/mutations_types'
import * as permission from './module/mutations_types'

import storage from '../../config/storageHelp'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
    showSpinner: false
}) // NProgress Configuration

function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// 不需要token
const whiteList = ['/login']

const checkAuth = () => {
    // console.log('checkAuth', storage);
    if (storage.lktoken) {
        // console.log('storage.lktoken', storage.lktoken);
        return true
    } else {
        return true
    }
};
// 权限校验
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 有token
    if (checkAuth()) {
        console.log('to.path', to.path)
        if (to.path === '/login') {
            // next({
            //     path: '/'
            // })
            next()
            NProgress.done()
        } else {
            // 判断当前用户是否已拉取完user_info信息
            if (store.getters.roles.length === 0) {
                // 获取用户信息
                store.dispatch(user.GET_USER_INFO).then(res => {
                    const roles = res.data.roles
                    // console.log('roles', roles)
                    // ['editor','develop'] 根据用户的权限动态生成路由
                    store.dispatch(permission.GENERATE_ROUTER_BY_ROLES, {
                        roles
                    }).then(() => {
                        // 根据roles权限生成可访问的路由表
                        // console.log('store.getters.addRouters', store.getters.addRouters)
                        // 动态添加可访问路由表
                        router.addRoutes(store.getters.addRouters)
                        // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                        console.log('替换');
                        next({ ...to,
                            replace: true
                        })
                    })
                }).catch(() => {
                    console.log('LogOut')
                    store.dispatch('LogOut').then(() => {
                        Message.error('Verification failed, please login again')
                        next({
                            path: '/login'
                        })
                    })
                })
            } else {
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                if (hasPermission(store.getters.roles, to.meta.roles)) {
                    next()
                } else {
                    next({
                        path: '/401',
                        replace: true,
                        query: {
                            noGoBack: true
                        }
                    })
                }
            }
        }
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            // 既没token,又不在免登陆的名单中，全部重定向到登录页
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})

import router from './router'
import store from './store'
import {
    Message
} from 'element-ui'

import storage from './config/storageHelp'

function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// 不需要token
const whiteList = ['/login', '/authredirect']

const checkAuth = () => {
    console.log('checkAuth', storage);
    if (storage.lktoken) {
        console.log('storage.lktoken', storage.lktoken);
        return true
    } else {
        return true
    }
};
// 权限校验
router.beforeEach((to, from, next) => {
    if (checkAuth()) {
        // 有token
        if (to.path === '/login') {
            // next({
            //     path: '/'
            // })
            next()
        } else {
            // 判断当前用户是否已拉取完user_info信息
            if (store.getters.roles.length === 0) {
                store.dispatch('GetUserInfo').then(res => { // 拉取user_info
                    console.log('用户的权限 res', res)
                    const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
                    store.dispatch('GenerateRoutes', {
                        roles
                    }).then(() => { // 根据roles权限生成可访问的路由表
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        next({ ...to,
                            replace: true
                        }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
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
        }
    }
});

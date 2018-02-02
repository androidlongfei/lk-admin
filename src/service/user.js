//  用户模块
import fetch from '../config/axios'

// 登录接口
export const login = (data) => fetch('/lk/login', data, 'POST', true)

// 获取用户的基本信息
export const getUserInfo = (data) => fetch('/lk/getUserInfo', data, 'POST', true)

// 登录接口
export const logout = (data) => fetch('/lk/logout', data, 'POST')

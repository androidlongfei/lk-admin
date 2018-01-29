//  用户模块
import fetch from '../config/axios'

// 登录接口
export const login = (data) => fetch('/lk/login', data, 'POST')

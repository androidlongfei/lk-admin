//  指标接口(所有)
import fetch from '../config/axios'

// 2.更新个人信息
export const upDateBaseInfo = (data) => fetch('/cu/user/updateUserMessage.do', data, 'POST')
// 获取个人信息
export const getBaseInfo = (data) => fetch('/cu/user/getUserMessage.do', data, 'POST')

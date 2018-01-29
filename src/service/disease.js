//  病史状况据请求
import fetch from '../config/axios'

// 更新状况病史
export const upDateDisease = (data) => fetch('/cu/user/updateUserSickness.do', data, 'POST')
// 获取病史状况
export const getDisease = (data) => fetch('/cu/user/getUserSickness.do', data, 'POST')

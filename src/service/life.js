//  生活养生请求
import fetch from '../config/axios'


// 更新生活养生
export const upDateLife = (data) => fetch('/cu/user/updateLivingAndRegimen.do', data, 'POST')
// 获取生活养生
export const getLife = (data) => fetch('/cu/user/getLivingAndRegimen.do', data, 'POST')

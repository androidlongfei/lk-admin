//  调养建议
import fetch from '../config/axios'

// 1.获取调养建议
export const findAftercare = (data) => fetch('/lkj/report/getAdviceByDi.do', data, 'GET')

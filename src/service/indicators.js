//  指标接口(所有)
import fetch from '../config/axios'

// 1.获取已经的关注指标
export const findAlreadyFocusIndicators = () => fetch('/lkj/user/getFocusCodeList.do', {}, 'POST')
// export const findAlreadyFocusIndicators = () => fetch('/indicators/queryFocus', {}, 'POST')

// 2.更新关注的指标
export const updateFocusIndicators = (data) => fetch('/lkj/user/updatetFocusCode.do', data, 'POST')

// 3.所有指标
export const findAllIndicators = (data) => fetch('/lkj/user/getAllQouta.do', data, 'POST')

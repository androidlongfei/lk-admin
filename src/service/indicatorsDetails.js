//  指标接口(所有)
import fetch from '../config/axios'

//  获取指标详情数据
export const getIndicatorsDetails = (data) => fetch('/lkj/user/getQuotaDetails.do', data, 'POST')

//  更新指标详情接口
export const updateIndicatorsDetails = (data) => fetch('/lkj/report/insertReport.do', data, 'POST')



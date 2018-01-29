// 首页请求数据接口
import fetch from '../config/axios'

// 获取体检列表数据信息
export const getMedicalRecord = (data) => fetch('/lkj/exam/getExamnationList.do', data, 'POST')

//  获取列表详情数据信息
export const getMedicalDetails = (data) => fetch('/lkj/exam/getExamnationBySeqNo.do', data, 'POST')

//  添加体检记录
export const addMedicalRecord = (data) => fetch('/lkj/report/insertOutReport.do', data, 'POST')

// 获取最近一次的体检记录
export const getLaterMedicalRecord = (data) => fetch('/lkj/exam/getLastExamnation.do', data, 'POST')

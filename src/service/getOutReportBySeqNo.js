//  调养建议
import fetch from '../config/axios'

// 1.获取调养建议
export const getOutReportBySeqNo = (data) => fetch('lkj/report/getOutReportBySeqNo.do', data, 'POST')

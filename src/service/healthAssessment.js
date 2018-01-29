//  健康报告
import fetch from '../config/axios'

// 1.获取健康肖像
export const findHealthAssessment = (data) => fetch('/lkj/report/getInsideReportBySeqNo.do', data, 'POST')

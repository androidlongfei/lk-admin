//  评估报告
import fetch from '../config/axios'

/** 1.获取外部评估报告列表(分页)
 * [findExternalReportList description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const findExternalReportList = (data) => fetch('/lkj/report/getOutReportList.do', data, 'POST')

/** 2.获取内部评估报告列表(分页)
 * [findInternalReportList description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const findInternalReportList = (data) => fetch('/lkj/report/getInsideReportList.do', data, 'POST')

//  健康近况数据请求
import fetch from '../config/axios'
// 1.获取内部评估报告列表  然后筛选几条数据渲染到页面
// 1.获取内如评估报告列表
export const getAppraisalReport = (data) => fetch('/lkj/report/getInsideReportList.do', data, 'POST')
//  2.获取所有指标，需要自己进行分离出关注的指标
//  此接口暂时没有
export const getLaterIndicator = () => fetch('/lkj/user/getAllQouta.do', {}, 'POST')

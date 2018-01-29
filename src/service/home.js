// 首页请求数据接口
import fetch from '../config/axios'

// 获取首页数据信息
export const getHomeData = () => fetch('/index/user/getHealthRecord.do', {}, 'POST')



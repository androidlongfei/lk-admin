//  健康肖像数据请求
import fetch from '../config/axios'

// 1.获取健康肖像
export const findHealthPortrait = () => fetch('/cu/user/getHealthRecord.do', {}, 'POST')

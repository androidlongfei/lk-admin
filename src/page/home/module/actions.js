// 主要处理异步逻辑

import * as type from './mutations_types'
//  import moment from 'moment'
import {
    getHomeData
} from '../../../service/home'

export default {
    [type.GET_HOME_DATA]({
        dispatch,
        commit,
        state
    }, data) {
        //  console.log('startTime', Date.parse(new Date()))
        commit(type.LOADING_HOME_DATA)
        getHomeData().then(res => {
            commit({
                type: type.GET_HOME_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_HOME_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取首页数据失败, 服务器异常'
                }
            })
        })
    },
    [type.GET_HOME_DATA_CESHI] (context, data) {
        console.log(context, 'context是什么啊')
    }
}



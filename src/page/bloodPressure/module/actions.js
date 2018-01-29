// 主要处理异步逻辑

import * as type from './mutations_types'
import {
    getIndicatorsDetails
} from '../../../service/indicatorsDetails'

export default {
    [type.GET_PRESSURE_DATA]({
        dispatch,
        commit,
        state
    }, data) {
        commit(type.LOADING_PRESSURE_DATA)
        getIndicatorsDetails(data.payload).then(res => {
            //  console.log(res, 'GET_PRESSURE_DATA')
            commit({
                type: type.GET_PRESSURE_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_PRESSURE_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取血压数据失败,服务器异常'
                }
            })
        })
    }
}



// 主要处理异步逻辑

import * as type from './mutations_types'
import {
    getMedicalRecord
} from '../../../service/medicalRecord'

export default {
    [type.GET_MEDICALRECORD_DATA]({
        dispatch,
        commit,
        state
    }, data) {
        console.log(data.payload, 'data.payload')
        commit(type.LOADING_MEDICALRECORD_DATA)
        getMedicalRecord(data.payload).then(res => {
            console.log(res, 'GET_MEDICALRECORD_DATA')
            commit({
                type: type.GET_MEDICALRECORD_DATA_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            console.log(ex, 'ex错误信息')
            commit({
                type: type.GET_MEDICALRECORD_DATA_FAILED,
                payload: {
                    isError: true,
                    msg: '获取体检数据失败,服务器异常'
                }
            })
        })
    }
}



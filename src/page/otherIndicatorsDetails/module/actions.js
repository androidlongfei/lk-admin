import * as type from './mutations_types'
import { getIndicatorsDetails } from '../../../service/indicatorsDetails'

export default {

    [type.GET_OTHERINDICATORSDETAILS_INFO] ({
                                dispatch, commit, state
                            }, data) {
        console.log('GET_OTHERINDICATORSDETAILS_INFO')
        commit(type.LOADING_OTHERINDICATORSDETAILS_INFO)
        //  getIndicatorsDetails(data.payload)这里data.payload要传的是不同的指标码
        getIndicatorsDetails(data.payload).then(res => {
            console.log('res是', res)
            commit({
                type: type.GET_OTHERINDICATORSDETAILS_INFO_SUCCESS,
                payload: {
                    result: res
                }
            })
        }).catch((ex) => {
            commit({
                type: type.GET_OTHERINDICATORSDETAILS_INFO_FAILED,
                payload: {
                    isError: true,
                    msg: '获取指标数据失败, 服务器异常'
                }
            })
        })
    }
}

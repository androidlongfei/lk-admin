// 处理同步逻辑

import * as type from './mutations_types'
import storageHelp from '../../../config/storageHelp'
import {
    sendStrDataToNative
} from '../../../config/nativeCommunication'
export default {
    // token过期
    [type.CLEAR_LKTOKEN]({
        dispatch,
        commit,
        state
    }, data) {
        // let payload = data.payload
        // console.log('payload', payload)
        storageHelp.clearStorage()
        // alert('令牌过期,请重新登录')

        // 给app发送消息关闭当前页面,跳转到登录页面
        sendStrDataToNative('close')

        // webapp路由跳转
        // window.location.replace('/')
        // window.location.href = 'http://localhost:9088'
    }
}

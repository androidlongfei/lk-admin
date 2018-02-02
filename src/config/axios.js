import axios from 'axios'
import {
    baseUrl,
    lktoken
} from './env'
import { Loading } from 'element-ui'; // 全局loading
import storage from './storageHelp'

import store from '../store'
// import qs from 'qs'

let isShowElementLoading = true // 默认显示loading
let elementLoadingObj = null

// 创建axios实例
const service = axios.create({
    baseURL: baseUrl, // api的base_url
    timeout: 6 * 1000, // 请求超时时间
    withCredentials: false, // 表示跨域请求时是否需要使用凭证。默认不需要
    responseType: 'json', // 表示服务器响应的数据类型。默认为json
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        'Content-Type': 'application/json; charset=UTF-8'
    },

    transformRequest: [function (data) {
        // transformRequest 允许在向服务器发送前，修改请求数据
        // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
        // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream

        // form-data格式化数据，这里可以使用开头引入的qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
        // console.log('转化前', data)
        // var submitData = qs.stringify(data)
        // console.log('转化后', submitData);
        // return submitData;
        return data
    }],
    validateStatus: status => {
        // 200~300之间resolve，其余的reject
        return status >= 200 && status < 300
    }
})

// request 请求拦截器, 主要是请求统一增加token
service.interceptors.request.use(config => {
    // 发送请求前，增加Loading
    showElementLoading()
    if (storage.lktoken) {
        // 让每个请求携带token, 根据后台配置
        config.headers.lktoken = storage.lktoken
    } else {
        // 测试token
        config.headers.lktoken = lktoken
    }
    //  console.log('interceptors request', config);
    return config
}, error => {
    // error
    //  console.log('interceptors request error', error)
    console.log('发送失败')
    Notification.error({
        title: '发送失败',
        message: error.message
    })
    closeElementLoading()
    Promise.reject(error)
})

// response 响应拦截器, 主要是对错误统一处理
service.interceptors.response.use(
    response => {
        // status code 200~300之间
        // store.commit('LOADING_FINISH')
        //  console.log('interceptors response', response)
        let res = response.data
        if (res.code === '410') {
            // 410 需要授权或者令牌过期。清除lktoken信息,并提示重新加载页面
            setTimeout(() => {
                store.commit({
                    type: 'CLEAR_LKTOKEN',
                    payload: {
                        message: res.message
                    }
                })
            }, 500)
        } else if (res.code === '411') {
            // 411
        }
        closeElementLoading()
        return response.data
    },
    error => {
        console.error('interceptors response error', error)
        if (error.response) {
            //  console.log('http status code', error.response.status)
            switch (error.response.status) {
                case 400:
                    // 400 页面不存在
                    break;
                case 401:
                    break;
                case 500:
                    // 500 服务器内部出错
                    break;
            }
        }
        closeElementLoading()
        return Promise.reject(error.response)
    })

const closeElementLoading = () => {
    if (elementLoadingObj) {
        elementLoadingObj.close()
    }
}

const showElementLoading = () => {
    if (isShowElementLoading) {
        elementLoadingObj = Loading.service({ fullscreen: true, text: '正在加载中...' })
    }
}

export default async (url = '', data = {}, requesTtype = 'GET', noShowloading) => {
    const type = requesTtype.toUpperCase()
    let requestConfig = {
        method: type,
        url: url
    }
    if (noShowloading) {
        // 不显示 loading
        isShowElementLoading = false
    }
    if (type === 'GET') {
        requestConfig.params = data
    }
    if (type === 'POST') {
        // var submit = {}
        // console.log('axios', data);
        //  submit.data = data
        //  requestConfig.data = JSON.stringify(submit)
        // requestConfig.data = submit
        // submit.data = data
        // requestConfig.data = JSON.stringify(submit)
        // requestConfig.data = submit
        requestConfig.data = JSON.stringify(data)
    }
    //  console.log('requestConfig', requestConfig)
    const response = await service(requestConfig)
    //  console.log('response data', response)
    // const responseJson = await response.json()
    return response
}

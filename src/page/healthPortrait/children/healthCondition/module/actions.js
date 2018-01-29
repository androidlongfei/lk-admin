// 主要处理异步逻辑

import * as type from './mutations_types'
import {
    getAppraisalReport,
    getLaterIndicator
} from '../../../../../service/healthCondition'
import parallel from 'async-es/parallel'
export default {
    // [type.GET_LATER_APPRAISAL_REPORT]({
    //     dispatch,
    //     commit,
    //     state
    // }, data) {
    //     getAppraisalReport(data.payload).then(res => {
    //         // console.log(res, 'GET_LATER_APPRAISAL_REPORT')
    //         commit({
    //             type: type.GET_LATER_APPRAISAL_REPORT_SUCCESS,
    //             payload: {
    //                 result: res
    //             }
    //         })
    //     }).catch((ex) => {
    //         commit({
    //             type: type.GET_LATER_APPRAISAL_REPORT_FAILED,
    //             payload: {
    //                 isError: true,
    //                 msg: '获取最近报告失败，服务器异常'
    //             }
    //         })
    //     })
    // },
    // [type.GET_LATER_INDICATOR]({
    //     dispatch,
    //     commit,
    //     state
    // }, data) {
    //     getLaterIndicator().then(res => {
    //         //  console.log(res, 'GET_ALL_INDICATOR')
    //         commit({
    //             type: type.GET_LATER_INDICATOR_SUCCESS,
    //             payload: {
    //                 result: res
    //             }
    //         })
    //     }).catch((ex) => {
    //         commit({
    //             type: type.GET_LATER_INDICATOR_FAILED,
    //             payload: {
    //                 isError: true,
    //                 msg: '获取最近指标失败，服务器异常'
    //             }
    //         })
    //     })
    // },
    // 获取健康近况的所有数据
    [type.GET_HEALTH_CONDITION_ALL]({
        dispatch,
        commit,
        state
    }, data) {
        commit(type.LOADING_HEALTH_CONDITION_ALL)
        parallel([
            (done) => {
                // 获取最近报告列表
                getAppraisalReport({
                    currentPage: 1,
                    pageSize: 8
                }).then(res => {
                    done(null, {
                        result: res,
                        isError: false
                    })
                }).catch((ex) => {
                    done(null, {
                        result: {
                            isError: true,
                            msg: '获取最近报告失败，服务器异常'
                        },
                        isError: true
                    })
                })
            },
            (done) => {
                // 获取最近指标列表
                getLaterIndicator().then(res => {
                    done(null, {
                        result: res,
                        isError: false
                    })
                }).catch((ex) => {
                    done(null, {
                        result: {
                            isError: true,
                            msg: '获取最近指标失败，服务器异常'
                        },
                        isError: true
                    })
                })
            }
        ], (err, results) => {
            // console.log('results', results)
            if (err) {
                commit({
                    type: type.GET_HEALTH_CONDITION_ALL_FAILED,
                    payload: {
                        results: results
                    }
                })
            } else {
                commit({
                    type: type.GET_HEALTH_CONDITION_ALL_SUCCESS,
                    payload: {
                        results: results
                    }
                })
            }
        });
    }
}

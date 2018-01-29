import Vue from 'vue'
import Router from 'vue-router'

import storage from '../config/storageHelp'

// 懒加载
//  首页
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
// 健康肖像
const healthPortrait = r => require.ensure([], () => r(require('../page/healthPortrait/healthPortrait')), 'healthPortrait');
// 全部指标
const allIndicators = r => require.ensure([], () => r(require('../page/indicators/allIndicators/allIndicators')), 'allIndicators');
// 增加指标
const addIndicator = r => require.ensure([], () => r(require('../page/indicators/addIndicators/addIndicators')), 'addIndicator');
//  体检记录模块
const medicalRecord = r => require.ensure([], () => r(require('../page/medicalRecord/medicalRecord')), 'medicalRecord');
//  体检记录详情
const medicalRecordDetail = r => require.ensure([], () => r(require('../page/medicalRecord/medicalRecordDetails/medicalRecordDetails')), 'medicalRecordDetail');
//  添加体检记录
const addMedicalRecord = r => require.ensure([], () => r(require('../page/medicalRecord/addMedicalRecord/addMedicalRecord')), 'addMedicalRecord');
//  病史状况
const disease = r => require.ensure([], () => r(require('../page/healthPortrait/children/disease/disease')), 'disease');
// 个人信息
const baseInfo = r => require.ensure([], () => r(require('../page/healthPortrait/children/baseInfo/baseInfo')), 'baseInfo');
// 中医报告
const chineseMedicine = r => require.ensure([], () => r(require('../page/healthAssessment/chineseMedicine/chineseMedicine')), 'chineseMedicine');
// 西医报告
const westernMedicine = r => require.ensure([], () => r(require('../page/healthAssessment/westernMedicine/westernMedicine')), 'westernMedicine');

// 生活养生
const life = r => require.ensure([], () => r(require('../page/healthPortrait/children/life/life')), 'life');

// 调养建议
const aftercare = r => require.ensure([], () => r(require('../page/aftercare/aftercareList')), 'aftercare');
// 动养
const sportsHealth = r => require.ensure([], () => r(require('../page/aftercare/child/sportsHealth/sportsHealth')), 'sportsHealth');
// 术养
const kungfu = r => require.ensure([], () => r(require('../page/aftercare/child/kungfu/kungfu')), 'kungfu');
// 心养
const keepHeart = r => require.ensure([], () => r(require('../page/aftercare/child/keepHeart/keepHeart')), 'keepHeart');
// 居养
const liveHealth = r => require.ensure([], () => r(require('../page/aftercare/child/liveHealth/liveHealth')), 'liveHealth');
// 食养
const foodHealth = r => require.ensure([], () => r(require('../page/aftercare/child/foodHealth/foodHealth')), 'foodHealth');

//  血压指标模块  血脂指标模块
const bloodPressure = r => require.ensure([], () => r(require('../page/bloodPressure/bloodPressure')), 'bloodPressure');
const updatePressure = r => require.ensure([], () => r(require('../page/bloodPressure/children/updatePressure')), 'updatePressure')

// 其他指标柱状图模块
const otherIndicatorsDetails = r => require.ensure([], () => r(require('../page/otherIndicatorsDetails/otherIndicatorsDetails')), 'otherIndicatorsDetails')
//  更新其他指标模块
const updateOtherIndicatorsDetails = r => require.ensure([], () => r(require('../page/otherIndicatorsDetails/children/updateOtherIndicatorsDetails')), 'updateOtherIndicatorsDetails')

//  体检报告列表模块
const appraisalReportList = r => require.ensure([], () => r(require('../page/appraisalRepor/appraisalReportList/appraisalReportList')), 'appraisalReportList')
// 体检报告外部详情
const externalDetails = r => require.ensure([], () => r(require('../page/appraisalRepor/appraisalReportList/children/externalDetails/externalDetails')), 'externalDetails')
// 体检报告内部详情
const internalDetails = r => require.ensure([], () => r(require('../page/appraisalRepor/appraisalReportList/children/internalDetails/internalDetails')), 'internalDetails')
// 增加外部体检报告
const addExternalappraisalReport = r => require.ensure([], () => r(require('../page/appraisalRepor/addExternalappraisalReport/addExternalappraisalReport')), 'addExternalappraisalReport')


//  最近一次体检记录
const lasterMedical = r => require.ensure([], () => r(require('../page/healthPortrait/children/lasterMedical/lasterMedical')), 'lasterMedical')

//  健康肖像健康近况模块
const healthCondition = r => require.ensure([], () => r(require('../page/healthPortrait/children/healthCondition/healthCondition')), 'healthCondition');

//  心电模块
const ecg = r => require.ensure([], () => r(require('../page/otherIndicatorsDetails/children/ecg')), 'ecg')

// 添加心电模块
const updateEcg = r => require.ensure([], () => r(require('../page/otherIndicatorsDetails/children/updateEcg')), 'updateEcg')


Vue.use(Router);

const routes = [{
    path: '/',
    name: 'home',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: home
}, {
    path: '/indicators/addIndicator',
    name: 'addIndicator',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: addIndicator
}, {
    path: '/indicators/allIndicators',
    name: 'allIndicators',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: allIndicators
}, {
    path: '/healthPortrait',
    name: 'healthPortrait',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: healthPortrait
}, {
    path: '/medicalRecord',
    name: 'medicalRecord',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: medicalRecord
}, {
    path: '/medicalRecordDetail',
    name: 'medicalRecordDetail',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: medicalRecordDetail
}, {
    path: '/addMedicalRecord',
    name: 'addMedicalRecord',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: addMedicalRecord
}, {
    path: '/healthPortrait/baseInfo',
    name: 'baseInfo',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: baseInfo
}, {
    path: '/healthPortrait/disease',
    name: 'disease',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: disease
}, {

    path: '/pressure/:user?',
    name: 'pressure',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: bloodPressure
}, {
    path: '/updatePressure',
    name: 'updatePressure',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: updatePressure
}, {
    path: '/otherIndicatorsDetails',
    name: 'otherIndicatorsDetails',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: otherIndicatorsDetails
}, {
    path: '/appraisalRepor/appraisalReportList',
    name: 'appraisalReportList',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: appraisalReportList
}, {
    path: '/chineseMedicine',
    name: 'chineseMedicine',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: chineseMedicine
}, {
    path: '/westernMedicine',
    name: 'westernMedicine',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: westernMedicine
}, {
    path: '/healthPortrait/life',
    name: 'life',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: life
}, {
    path: '/appraisalRepor/appraisalReportList/externalDetails',
    name: 'externalDetails',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: externalDetails
}, {
    path: '/appraisalRepor/appraisalReportList/internalDetails',
    name: 'internalDetails',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: internalDetails
}, {
    path: '/aftercare',
    name: 'aftercare',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: aftercare
}, {
    path: '/aftercare/sportsHealth',
    name: 'sportsHealth',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: sportsHealth
}, {
    path: '/aftercare/kungfu',
    name: 'kungfu',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: kungfu
}, {
    path: '/healthPortrait/lasterMedical',
    name: 'lasterMedical',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: lasterMedical
}, {
    path: '/updateOtherIndicatorsDetails',
    name: 'updateOtherIndicatorsDetails',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: updateOtherIndicatorsDetails
}, {
    path: '/appraisalRepor/addExternalappraisalReport',
    name: 'addExternalappraisalReport',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: addExternalappraisalReport
}, {
    path: '/healthPortrait/healthCondition',
    name: 'healthCondition',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: healthCondition
}, {
    path: '/aftercare/keepHeart',
    name: 'keepHeart',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: keepHeart
}, {
    path: '/aftercare/liveHealth',
    name: 'liveHealth',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: liveHealth
}, {
    path: '/aftercare/foodHealth',
    name: 'foodHealth',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: foodHealth
}, {
    path: '/updateEcg',
    name: 'updateEcg',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: updateEcg
}, {
    path: '/ecg',
    name: 'ecg',
    meta: {
        // 需要授权,只有登录(获取usercode)之后才能访问这个页面
        requireAuth: false
    },
    component: ecg
}];

const router = new Router({
    // mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            if (to && to.name === 'home') {
                sessionStorage.setItem('homePosition', savedPosition.y)
            }
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    routes
});

const checkAuth = () => {
    console.log('checkAuth', storage);
    if (storage.lktoken) {
        console.log('storage.lktoken', storage.lktoken);
        return true
    } else {
        return false
    }
};
// 权限校验
router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (checkAuth()) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
});

export default router

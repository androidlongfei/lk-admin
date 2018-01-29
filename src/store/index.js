import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../page/auth/module'
import home from '../page/home/module'

import configStore from './config'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import addIndicators from '../page/indicators/addIndicators/module'
import healthPortrait from '../page/healthPortrait/module'
import otherIndicatorsDetails from '../page/otherIndicatorsDetails/module'
import baseInfo from '../page/healthPortrait/children/baseInfo/module'

import disease from '../page/healthPortrait/children/disease/module'
import life from '../page/healthPortrait/children/life/module'

import allIndicators from '../page/indicators/allIndicators/module'
import appraisalReportList from '../page/appraisalRepor/appraisalReportList/module'
import chineseMedicine from '../page/healthAssessment/chineseMedicine/module'
import westernMedicine from '../page/healthAssessment/westernMedicine/module'
import aftercare from '../page/aftercare/module'
import sportsHealth from '../page/aftercare/child/sportsHealth/module'
import kungfu from '../page/aftercare/child/kungfu/module'
import keepHeart from '../page/aftercare/child/keepHeart/module'
import liveHealth from '../page/aftercare/child/liveHealth/module'
import foodHealth from '../page/aftercare/child/foodHealth/module'

import healthCondition from '../page/healthPortrait/children/healthCondition/module'
import medicalRecord from '../page/medicalRecord/module'
import medicalRecordDetails from '../page/medicalRecord/medicalRecordDetails/module'
import addMedicalRecord from '../page/medicalRecord/addMedicalRecord/module'
import bloodPressure from '../page/bloodPressure/module'
import updatePressure from '../page/bloodPressure/children/module'
import updateSleepTime from '../page/bloodPressure/children/module/updateSleepTime'
import updateOtherIndicatorsDetails from '../page/otherIndicatorsDetails/children/module'
import updateEcg from '../page/otherIndicatorsDetails/children/module/updateEcg'
import ecg from '../page/otherIndicatorsDetails/children/module/ecg'
import externalDetails from '../page/appraisalRepor/appraisalReportList/children/externalDetails/module'
import laterMedical from '../page/healthPortrait/children/lasterMedical/module'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        'auth': auth,
        'home': home,
        'config': configStore,
        'addIndicators': addIndicators,
        'healthPortrait': healthPortrait,
        'baseInfo': baseInfo,
        'disease': disease,
        'otherIndicatorsDetails': otherIndicatorsDetails,
        'allIndicators': allIndicators,
        'life': life,
        'appraisalReportList': appraisalReportList,
        'chineseMedicine': chineseMedicine,
        'westernMedicine': westernMedicine,
        'aftercare': aftercare,
        'sportsHealth': sportsHealth,
        'kungfu': kungfu,
        'keepHeart': keepHeart,
        'liveHealth': liveHealth,
        'healthCondition': healthCondition,
        'medicalRecord': medicalRecord,
        'medicalRecordDetails': medicalRecordDetails,
        'addMedicalRecord': addMedicalRecord,
        'foodHealth': foodHealth,
        'bloodPressure': bloodPressure,
        'updatePressure': updatePressure,
        'updateOtherIndicatorsDetails': updateOtherIndicatorsDetails,
        'externalDetails': externalDetails,
        'updateEcg': updateEcg,
        'updateSleepTime': updateSleepTime,
        'ecg': ecg,
        'laterMedical': laterMedical
    },
    state,
    getters,
    mutations
})

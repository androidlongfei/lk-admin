<template>
    <div>
        <!--<x-header style="background-color: #B81C26" :left-options="{backText: ''}">健康肖像</x-header>-->
        <custom-header :headerData="headerData"></custom-header>
        <div v-if="this.firstLoad" style="width: 100%;height: 500px">
            <div style="margin-top: 50%;text-align: center">正在加载中</div>
        </div>
        <div v-else>
            <div v-if="this.loadError" style="width: 100%;height: 500px">
                <div style="margin-top: 50%;text-align: center">加载出错,点击<span style="color: blue"
                                                                             @click="againLoad()">重试</span>加载
                </div>
            </div>
            <div v-else>
                <div class="wrapper">
                    <div class="bannerComponents">
                        <img src="../../images/compoontent.png"/>
                        <div class="healthStatus">
                            <div style="position: relative;height: 100%;">
                                <div class="healthStatusTitle">健康近况</div>
                                <div class="healthStatusContent">
                                    <ul>
                                        <li v-for="(healthItem,index) in this.healthPortraitData.healthStatus"
                                            :key="index">
                                            <div class="name">{{healthItem.quotaName}}</div>
                                            <div class="nameValue"><span
                                                :class="[healthItem.quotaNormal==='2'?'':'itemActive']">{{healthItem.quotaValue}}</span>{{healthItem.quotaUnit}}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <router-link to="/healthPortrait/healthCondition">
                                    <button>查看更多</button>
                                </router-link>
                            </div>

                        </div>
                        <div class="life">
                            <div style="position: relative;height: 100%;">
                                <div class="lifeTitle">生活&养生</div>
                                <div class="lifeContent">
                                    <ul>
                                        <li v-for="(lifeItem,index) in this.healthPortraitData.life" :key="index">
                                            <div class="name">{{getDictionaryName(lifeItem.name)}}</div>
                                            <div class="nameValue">{{getUserInfo(lifeItem.name,lifeItem.code)}}</div>
                                        </li>
                                    </ul>
                                </div>
                                <router-link to="/healthPortrait/life">
                                    <button>查看更多</button>
                                </router-link>
                            </div>
                        </div>
                        <div class="medicalHistory">
                            <div style="position: relative;height: 100%;">
                                <div class="medicalHistoryTitle">病史状况</div>
                                <div class="medicalHistoryContent">
                                    <ul>
                                        <li>
                                            <div class="name">过敏情况</div>
                                            <div class="nameValue">
                                                {{this.getListValueStr('allergen',this.healthPortraitData.disease.allergen)}}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="name">疾病情况</div>
                                            <div class="nameValue">{{this.getListValueStr('jwHis',
                                                this.healthPortraitData.disease.jwHis)}}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="name">家族病史</div>
                                            <div class="nameValue">{{this.healthPortraitData.disease.familyHis?'有':''}}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="name">遗传病史</div>
                                            <div class="nameValue">{{this.getListValueStr('hereditaryHis',
                                                this.healthPortraitData.disease.hereditaryHis)}}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <router-link to="/healthPortrait/disease">
                                    <button>查看更多</button>
                                </router-link>
                            </div>
                        </div>
                        <div class="examination">
                            <div style="position: relative;height: 100%;">
                                <div class="examinationTitle">体检报告</div>
                                <div class="examinationContent">
                                    <ul>
                                        <li>
                                            <div class="name">体检时间</div>
                                            <div class="nameValue">{{this.healthPortraitData.record.reportDate?this.conversionTime(this.healthPortraitData.record.reportDate):''}}</div>
                                        </li>
                                        <li>
                                            <div class="name">体检地点</div>
                                            <div class="nameValue">{{this.healthPortraitData.record.reportAdress}}</div>
                                        </li>
                                        <li>
                                            <div class="name">体检名称</div>
                                            <div class="nameValue">{{this.healthPortraitData.record.reportName}}</div>
                                        </li>
                                    </ul>
                                </div>
                                <router-link to="/healthPortrait/lasterMedical">
                                    <button>查看更多</button>
                                </router-link>
                            </div>
                        </div>
                        <div class="information">
                            <div style="position: relative;height: 100%;">
                                <div class="informationTitle">个人信息</div>
                                <div class="informationContent">
                                    <ul>
                                        <li>
                                            <div class="name">姓名</div>
                                            <div class="nameValue">{{this.healthPortraitData.basicInformation.userName}}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="name">性别</div>
                                            <div class="nameValue">
                                                {{this.getUserInfo('gender',this.healthPortraitData.basicInformation.gender)}}
                                            </div>
                                        </li>
                                        <!--<li>-->
                                            <!--<div class="name">年龄</div>-->
                                            <!--<div class="nameValue">{{this.healthPortraitData.basicInformation.age}}-->
                                            <!--</div>-->
                                        <!--</li>-->
                                        <li>
                                            <div class="name">血型</div>
                                            <div class="nameValue">
                                                {{this.getUserInfo('blood',this.healthPortraitData.basicInformation.blood)}}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="name">是否租户</div>
                                            <div class="nameValue">
                                                {{this.getUserInfo('yesno',this.healthPortraitData.basicInformation.lessee)}}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <router-link to="/healthPortrait/baseInfo">
                                    <button>查看更多</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import {
        XHeader
    } from 'vux'
    import CustomHeader from '../../../src/components/CustomHeader'
    import * as dictionary from '../../utils/dictionaryUtils'
    import * as type from './module/mutations_types'
    import {
        mapGetters
    } from 'vuex'
    import moment from 'moment'
    export default {
        components: {
            XHeader, CustomHeader
        },
        computed: {
            ...mapGetters(['getHealthPortraitLoading', 'healthPortraitData', 'getRequestStatus'])
        },
        methods: {
            conversionTime(time) {
                return moment(time).format('YYYY-MM-DD HH:MM');
            },
            getListValueStr(key, arr) {
                if (!arr) {
                    return ''
                }
                var newArr = []
                for (var i = 0; i < arr.length; i++) {
                    let value = this.getUserInfo(key, arr[i].code)
                    if (value) {
                        newArr.push(value)
                    }
                }
                // console.log('arr', newArr)
                if (newArr.length > 0) {
                    return newArr.join(',')
                }
                return ''
            },
            getUserInfo(key, code) {
                return dictionary.getValueByDictionaryKeyAndCode(key, code)
            },
            getDictionaryName(key) {
                return dictionary.getNameByDictionaryKey(key)
            },
            showLoadMsg(msg, time = 2000) {
                this.$layer.toast({
                    content: msg,
                    time: time
                })
            },
            againLoad() {
                this.$store.dispatch({
                    type: type.GET_HEALTHPORTRAIT_DATA,
                    payload: {}
                })
            }
        },
        mounted() {
            // console.log('血型', dictionary.getNameByDictionaryKey('exerciseFrequency'))
            this.$store.dispatch({
                type: type.GET_HEALTHPORTRAIT_DATA,
                payload: {}
            })
        },
        watch: {
            getHealthPortraitLoading(loading) {
                // console.log('getHealthPortraitLoading', loading)
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.firstLoad = false
                    // console.log(this.firstLoad)
                    this.$layer.close()
                    let healthPortraitRequestStatus = this.$store.getters.getRequestStatus
                    if (healthPortraitRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(healthPortraitRequestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        // let healthPortraitData = this.$store.getters.healthPortraitData
                        // console.log('healthPortraitData', this.healthPortraitData)
                        // this.healthPortraitData = healthPortraitData
                    }
                }
            }
        },
        data() {
            return {
                headerData: {
                    headerTitle: '健康肖像',
                    routerPath: '',
                    routerTitle: ''
                },
                loadError: false,
                firstLoad: true
            }
        }
    }
</script>
<style scoped lang="css">
    .itemActive {
        color: red;
    }

    .wrapper {
        width: 100%;
        height: 500px;
        background: url(../../images/bgImges.png) no-repeat 100% 100%;
        background-size: 100% 100%;
        /*position: relative;*/
        overflow: hidden;
    }

    .life {
        position: absolute;
        width: 123px;
        top: 56px;
        right: -93px;
        height: 140px;
        background: #3C3C3C;
        overflow: hidden;
        border-radius: 5px;
        opacity: .7;
    }

    .healthStatus {
        position: absolute;
        width: 123px;
        top: 56px;
        left: -103px;
        height: 140px;
        background: #3C3C3C;
        overflow: hidden;
        border-radius: 5px;
        opacity: .7;
    }

    .medicalHistory {
        position: absolute;
        width: 123px;
        top: 204px;
        left: -137px;
        height: 140px;
        background: #3C3C3C;
        overflow: hidden;
        border-radius: 5px;
        opacity: .7;
    }

    .examination {
        position: absolute;
        width: 123px;
        top: 204px;
        right: -134px;
        height: 140px;
        background: #3C3C3C;
        overflow: hidden;
        border-radius: 5px;
        opacity: .7;
    }

    .information {
        position: absolute;
        width: 123px;
        top: 350px;
        right: -10px;
        height: 140px;
        background: #3C3C3C;
        overflow: hidden;
        border-radius: 5px;
        opacity: .7;
    }

    @media screen and (max-width: 360px) {
        .life {
            width: 103px;
            right: -75px;
        }

        .healthStatus {
            width: 103px;
            left: -65px;

        }

        .medicalHistory {
            width: 103px;
            left: -109px;
        }

        .examination {
            width: 103px;
            right: -109px;
        }

        .information {
            width: 105px;
            right: -3px;
        }
    }

    .informationContent,
    .examinationContent,
    .medicalHistoryContent,
    .lifeContent,
    .healthStatusContent {
        font-size: 10px;
        padding: 3px;
    }

    .informationContent ul,
    .examinationContent ul,
    .medicalHistoryContent ul,
    .lifeContent ul,
    .healthStatusContent ul {
        margin: 0;
        padding: 0;
    }

    .information ul li,
    .examinationContent ul li,
    .medicalHistoryContent ul li,
    .lifeContent ul li,
    .healthStatusContent ul li {
        display: flex;
    }

    .informationTitle,
    .examinationTitle,
    .medicalHistoryTitle,
    .lifeTitle,
    .healthStatusTitle {
        text-align: center;
        color: white;
    }

    .name {
        color: white;
        width: auto;
        word-wrap: break-word;
    }

    .nameValue {
        margin-left: 5px;
        flex: 1;
        color: #ffffff;
        overflow: hidden;
        word-wrap: break-word;
    }

    .information button,
    .examination button,
    .medicalHistory button,
    .life button,
    .healthStatus button {
        width: 100%;
        height: 30px;
        line-height: 28px;
        background: deepskyblue;
        color: white;
        text-align: center;
        border: 0;
        position: absolute;
        bottom: 0px;
        left: 0;
        border-radius: 0 0 5px 5px;
    }

    .bannerComponents {
        width: 100px;
        height: 100px;
        text-align: center;
        padding-top: 230px;
        position: relative;
        margin: 0 auto;
    }

    .bannerComponents img {
        width: 100px;
        height: 100px;
    }
</style>

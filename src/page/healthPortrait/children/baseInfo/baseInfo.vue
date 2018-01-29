<template>
    <div class="wrapper">
        <!--<x-header style="background-color: #B81C26" :left-options="{backText: ''}">个人信息</x-header>-->
        <custom-header :headerData="headerData"></custom-header>
        <group label-width="7em" label-margin-right="1em" label-align="left">
            <x-input title="姓名" v-model="name" :readonly="true"></x-input>
            <selector title="性别" v-model="sex" :options="sexList" :readonly="true" style="text-align: left"></selector>
            <datetime title="出生日期" v-model="birth" value-text-align="left" :readonly="true" style="color:#4a4a4a"></datetime>
            <x-input title="证件号码" v-model="idCard" :readonly="true"></x-input>
            <x-input title="民族" v-model="nation"></x-input>
            <div style="height: 1px;width: 100%;background: #D9D9D9;margin-left: 15px;"></div>
            <!--<popup-picker :title="nationTitle" :data="nationList" v-model="nationValue"-->
            <!--:show-name="true" :readonly="true"></popup-picker>-->
            <!--<x-input title="住址" v-model="addressValue"></x-input>-->
            <x-address title="住址" :list="addressData" v-model="addressValue" value-text-align="left"></x-address>
            <!--{{this.addressValue}}{{this.baseInfoData.addr}}-->
            <selector ref="" title="是否租户" v-model="lessee" :readonly="true"  :options="tenantList"></selector>
            <selector ref="" title="常住类型" v-model="liveType" :options="liveTpyeList"></selector>
            <x-input title="工作单位" v-model="work"></x-input>
            <x-input title="联系电话" v-model="phone" :readonly="true"></x-input>
            <x-input title="紧急联系人" v-model="urgencyName"></x-input>
            <x-input title="紧急联系人电话" v-model="urgencyPhone"></x-input>
            <selector ref="" v-model="provide" title="是否自理" :options="careOneself"></selector>
        </group>
        <health-status-item :healthItemData="this.members"></health-status-item>
        <health-status-item :healthItemData="this.blood"></health-status-item>
        <health-status-item :healthItemData="this.marriage"></health-status-item>
        <health-status-item :healthItemData="this.education"></health-status-item>
        <health-status-item :healthItemData="this.job"></health-status-item>
        <health-status-item :healthItemData="this.healthCare"></health-status-item>
        <x-button @click.native="submit()" style="margin-top: 20px;" type="primary">提交</x-button>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import {
        GroupTitle,
        Group,
        Cell,
        XInput,
        XButton,
        Selector,
        PopupPicker,
        Datetime,
        XNumber,
        ChinaAddressData,
        XAddress,
        XTextarea,
        XSwitch,
        XHeader,
        Checker,
        CheckerItem
    } from 'vux'

    import DISEASE_TYPE from '../../module/disease_type'
    import * as type from './module/mutations_types'
    import healthStatusItem from '../components/healthStatusItem'
    import CustomHeader from '../../../../../src/components/CustomHeader'

    export default {
        components: {
            GroupTitle,
            XButton,
            Group,
            Cell,
            XInput,
            Selector,
            PopupPicker,
            Datetime,
            XNumber,
            ChinaAddressData,
            XAddress,
            XTextarea,
            XSwitch,
            XHeader,
            Checker,
            CheckerItem,
            healthStatusItem,
            CustomHeader
        },
        computed: {
            ...mapGetters(['upDateBaseInfoLoading', 'baseInfoLoading', 'baseInfoData'])
        },
        methods: {
            initData() {
                if (!this.baseInfoData) {
                    return
                }
                if (this.baseInfoData.healthCare) {
                    let obj = this.healthCare
                    let nDisease = this.baseInfoData.healthCare
                    this.setChoise(obj, nDisease, '9999')
                }
                if (this.baseInfoData.members) {
                    let obj = this.members
                    let nDisease = this.baseInfoData.members
                    this.setChoise(obj, nDisease, '')
                }
                if (this.baseInfoData.blood) {
                    let obj = this.blood
                    let nDisease = this.baseInfoData.blood.split('')
                    this.setChoise(obj, nDisease, '')
                }
                if (this.baseInfoData.marriage) {
                    let obj = this.marriage
                    let nDisease = this.baseInfoData.marriage.split('')
                    this.setChoise(obj, nDisease, '')
                }
                if (this.baseInfoData.education) {
                    let obj = this.education
                    let nDisease = this.baseInfoData.education.split('')
                    this.setChoise(obj, nDisease, '')
                }
                if (this.baseInfoData.job) {
                    let obj = this.job
                    let nDisease = this.baseInfoData.job.split('')
                    this.setChoise(obj, nDisease, '')
                }
                if (this.baseInfoData.userName) {
                    this.name = this.baseInfoData.userName
                }
                if (this.baseInfoData.gender) {
                    this.sex = this.baseInfoData.gender
                }
                if (this.baseInfoData.birthday) {
                    this.birth = this.baseInfoData.birthday
                }
                if (this.baseInfoData.pid) {
                    this.idCard = this.baseInfoData.pid
                }
                if (this.baseInfoData.nation) {
                    this.nation = this.baseInfoData.nation
                }
                if (this.baseInfoData.addr) {
                    this.addressValue = this.baseInfoData.addr.split(',')
                }
                if (this.baseInfoData.lessee) {
                    this.lessee = this.baseInfoData.lessee
                }
                if (this.baseInfoData.hktype) {
                    this.liveType = this.baseInfoData.hktype
                }
                if (this.baseInfoData.workComp) {
                    this.work = this.baseInfoData.workComp
                }
                if (this.baseInfoData.phone) {
                    this.phone = this.baseInfoData.phone
                }
                if (this.baseInfoData.urgencyName) {
                    this.urgencyName = this.baseInfoData.urgencyName
                }
                if (this.baseInfoData.urgencyPhone) {
                    this.urgencyPhone = this.baseInfoData.urgencyPhone
                }
                if (this.baseInfoData.provide) {
                    this.provide = this.baseInfoData.provide
                }
            },
            setChoise(obj, serverData, dataValue) {
                for (let i = 0; i < serverData.length; i++) {
                    let content = obj.content
                    // console.log('initData', serverData)
                    for (let j = 0; j < content.diseaseList.length; j++) {
                        let item = content.diseaseList
                        let serverDisaseItemCode = serverData[i].code
                        let serverDisaseItemValue = serverData[i].value
                        let localItem = item[j]
                        if (serverDisaseItemCode === localItem.dataValue || serverData[i] === localItem.dataValue) {
                            // console.log(localItem.dataValue)
                            localItem.isCheck = true
                            if (localItem.dataValue === dataValue) {
                                obj.hasOther = true
                                content.otherDiseaseContent = serverDisaseItemValue
                            }
                        }
                    }
                }
            },
            radioData(data) {
                let arr = [];
                let content = data.content;
                // console.log('content', data.content)
                for (let i = 0; i < content.diseaseList.length; i++) {
                    let itemdata = content.diseaseList[i];
                    let item = '';
                    if (itemdata.isCheck) {
                        item = itemdata.dataValue
                        arr.push(item)
                    }
                }
                return arr
            },
            submit() {
                var data = {}
                data[this.marriage.key] = this.radioData(this.marriage, '').join()
                // console.log('this.assemblyData', this.assemblyData(this.marriage, ''))
                data[this.healthCare.key] = this.assemblyData(this.healthCare, '9999')
                data[this.job.key] = this.radioData(this.job, '').join()
                data[this.education.key] = this.radioData(this.education, '').join()
                data[this.blood.key] = this.radioData(this.blood, '').join(',')
                // console.log('this.assemblyData(this.blood, \'\')', this.radioData(this.blood, ''))
                data[this.members.key] = this.assemblyData(this.members, '')
                data.userName = this.name
                data.gender = this.sex
                data.biethday = this.birth
                data.pid = this.idCard
                data.nation = this.nation
                data.addr = this.addressValue.join(',')
                data.lessee = this.lessee
                data.hktype = this.liveType
                data.workComp = this.work
                data.phone = this.phone
                data.provide = this.provide
                data.urgencyName = this.urgencyName
                data.urgencyPhone = this.urgencyPhone
                // console.log('submit', data)
                this.$store.dispatch({
                    type: type.UPDATE_BASEINFO,
                    payload: {
                        data: data
                    }
                })
            },
            assemblyData(data, otherKey) {
                let arr = []
                let content = data.content
                for (let i = 0; i < content.diseaseList.length; i++) {
                    let itemdata = content.diseaseList[i]
                    let item = {}
                    if (itemdata.isCheck) {
                        if (itemdata.dataValue === otherKey) {
                            item[otherKey] = content.otherDiseaseContent
                        } else {
                            item[itemdata.dataValue] = ''
                        }
                        arr.push(item)
                    }
                }
                if (content.type === 'DISEASE_TYPE.RADIO') {
                }
                return arr
            },
            showLoadMsg(msg, time = 2000) {
                this.$layer.toast({
                    content: msg,
                    time: time
                })
            }
        },
        mounted() {
            this.$store.dispatch({
                type: type.GET_BASEINFO,
                payload: {}
            })
        },
        watch: {
            baseInfoLoading(loading) {
                // console.log('baseInfoLoading', loading)
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.$layer.close()
                    let baseInfoRequestStatus = this.$store.getters.baseInfoRequestStatus
                    // console.log('baseInfoRequestStatus', baseInfoRequestStatus)
                    if (baseInfoRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(baseInfoRequestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        // let baseInfoData = this.$store.getters.baseInfoData
                        // console.log('baseInfoData', baseInfoData)
                        this.initData()
                    }
                }
            },
            upDateBaseInfoLoading(loading) {
                // console.log('upDateBaseInfoLoading', loading)
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.$layer.close()
                    let baseInfoRequestStatus = this.$store.getters.baseInfoRequestStatus
                    if (baseInfoRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(baseInfoRequestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.showLoadMsg('更新数据成功')
                        this.loadError = false
                        // let baseInfoData = this.$store.getters.baseInfoData
                        // console.log('baseInfoData', baseInfoData)
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 700)
                    }
                }
            }
        },
        data() {
            return {
                addressData: ChinaAddressData,
                headerData: {
                    headerTitle: '个人信息',
                    routerTitle: '',
                    routerPath: ''
                },
                marriage: {
                    title: '婚姻状况',
                    hasOther: false,
                    type: DISEASE_TYPE.RADIO,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '未婚',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '已婚',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '丧偶',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '离婚',
                            dataValue: '4',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '未说明婚姻状况',
                            dataValue: '5',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'marriage'
                },
                healthCare: {
                    title: '医保类型',
                    hasOther: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '城镇职工基本医疗保险',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '城镇居民基本医疗保险',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '新型农村合作医疗',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '贫困救助',
                            dataValue: '4',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '商业医疗保险',
                            dataValue: '5',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '全公费',
                            dataValue: '6',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '全自费',
                            dataValue: '7',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIOOTHER,
                            text: '其他',
                            dataValue: '9999',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'healthCare'
                },
                job: {
                    title: '职业',
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '国家机关、党群组织、企业、事业单位负责人',
                            dataValue: '0',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '专业技术人员',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '办事人员和有关人员',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '商业、服务业人员',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '农、林、牧、渔、水利业生产人员',
                            dataValue: '4',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '生产、运输设备操作人员及有关人员',
                            dataValue: '5',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '军人',
                            dataValue: '6',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '不便分类的其他从业人员',
                            dataValue: '7',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '无职业',
                            dataValue: '8',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'job'
                },
                education: {
                    title: '文化程度',
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '研究生',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '大学本科',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '大学专科和专科学院',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '中等专业学校',
                            dataValue: '4',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '技工学校',
                            dataValue: '5',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '高中',
                            dataValue: '6',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '初中',
                            dataValue: '7',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '小学',
                            dataValue: '8',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '文盲或半文盲',
                            dataValue: '9',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'education'
                },
                blood: {
                    title: '血型',
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: 'A',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: 'B',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: 'O',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: 'AB',
                            dataValue: '4',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: 'RH阴性',
                            dataValue: '5',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: 'RH阳性',
                            dataValue: '6',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '不详',
                            dataValue: '7',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'blood'
                },
                members: {
                    title: '家庭组成',
                    type: DISEASE_TYPE.NOMAL,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.NOMAL,
                            text: '祖父',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMAL,
                            text: '祖母',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMAL,
                            text: '父',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMAL,
                            text: '母',
                            dataValue: '4',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMAL,
                            text: '子',
                            dataValue: '5',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMAL,
                            text: '女',
                            dataValue: '6',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMAL,
                            text: '孙子',
                            dataValue: '7',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMAL,
                            text: '孙女',
                            dataValue: '8',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'members'
                },
                provide: '',
                liveType: '',
                lessee: '',
                phone: '',
                urgencyName: '',
                urgencyPhone: '',
                work: '',
                nationTitle: '民族',
                nationList: [
                    [{
                        name: '汉',
                        value: '1'
                    }, {
                        name: '满',
                        value: '2'
                    }]
                ],
                nationValue: '',
                name: '',
                sex: '',
                sexList: [{
                    key: '1',
                    value: '男'
                }, {
                    key: '2',
                    value: '女'
                }],
                birth: '',
                idCard: '',
                nation: '',
                addressValue: [],
                tenantList: [{
                    key: '1',
                    value: '是'
                }, {
                    key: '2',
                    value: '否'
                }],
                liveTpyeList: [{
                    key: '1',
                    value: '户籍'
                }, {
                    key: '2',
                    value: '非户籍'
                }],
                careOneself: [{
                    key: '1',
                    value: '是'
                }, {
                    key: '2',
                    value: '否'
                }]
            }
        }
    }
</script>

<style scoped lang="scss">
    .am-btn {
        display: inline-block;
        margin-bottom: 0;
        padding: .5em 1em;
        vertical-align: middle;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.2;
        text-align: center;
        white-space: nowrap;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 0;
        cursor: pointer;
        outline: 0;
        -webkit-appearance: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-transition: background-color .3s ease-out, border-color .3s ease-out;
        transition: background-color .3s ease-out, border-color .3s ease-out
    }
</style>

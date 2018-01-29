<template>
<div class="wrapper">
    <custom-header :headerData="headerData"></custom-header>
    <health-status-item :healthItemData="this.healthProblems"></health-status-item>
    <health-status-item :healthItemData="this.drug"></health-status-item>
    <health-status-item :healthItemData="this.allergen"></health-status-item>
    <health-status-item :healthItemData="this.jwHis"></health-status-item>
    <health-status-item :healthItemData="this.surgical"></health-status-item>
    <health-status-item :healthItemData="this.trauma"></health-status-item>
    <health-status-item :healthItemData="this.bloodTransfusion"></health-status-item>
    <health-status-item :healthItemData="this.father">
        <group slot='title'>
            <cell title='父亲'></cell>
        </group>
    </health-status-item>
    <health-status-item :healthItemData="this.mother">
        <group slot='title'>
            <cell title='母亲'></cell>
        </group>
    </health-status-item>
    <health-status-item :healthItemData="this.son">
        <group slot='title'>
            <cell title='子女'></cell>
        </group>
    </health-status-item>
    <health-status-item :healthItemData="this.brother">
        <group slot='title'>
            <cell title='兄弟姐妹'></cell>
        </group>
    </health-status-item>
    <health-status-item :healthItemData="this.hereditaryHis"></health-status-item>
    <health-status-item :healthItemData="this.disability"></health-status-item>
    <x-button @click.native="submit()" style="margin-top: 20px;" type='primary'>提交</x-button>
</div>
</template>

<script>
import healthStatusItem from '../components/healthStatusItem'
import {
    GroupTitle,
    Group,
    Cell,
    XInput,
    XButton,
    XHeader
} from 'vux'
import DISEASE_TYPE from '../../module/disease_type'
import * as type from './module/mutations_types'
import {
    mapGetters
} from 'vuex'

export default {
    components: {
        GroupTitle,
        Group,
        Cell,
        XInput,
        XButton,
        XHeader,
        healthStatusItem
    },
    methods: {
        submit() {
            let data = {};
            data[this.healthProblems.key] = this.assemblyData(this.healthProblems, '9999');
            data[this.drug.key] = this.assemblyData(this.drug, '9999');
            data[this.allergen.key] = this.assemblyData(this.allergen, '9999');
            data[this.surgical.key] = this.assemblyData(this.surgical, '9999');
            data[this.trauma.key] = this.assemblyData(this.trauma, '9999');
            data[this.bloodTransfusion.key] = this.assemblyData(this.bloodTransfusion, '9999');
            data[this.disability.key] = this.assemblyData(this.disability, '9999');
            data[this.hereditaryHis.key] = this.assemblyData(this.hereditaryHis, '9999');
            data[this.jwHis.key] = this.assemblyData(this.jwHis, '9999', '13', '14');
            data.familyHis = [];
            let father = {};
            father.name = 'father';
            father.dieaseList = this.assemblyData(this.father, '');
            if (father.dieaseList.length !== 0) {
                data.familyHis.push(father);
            }
            let mother = {};
            mother.name = 'mother';
            mother.dieaseList = this.assemblyData(this.mother, '');
            if (mother.dieaseList.length !== 0) {
                data.familyHis.push(mother);
            }
            let son = {};
            son.name = 'son';
            son.dieaseList = this.assemblyData(this.son, '');
            if (son.dieaseList.length !== 0) {
                data.familyHis.push(son);
            }
            let brother = {};
            brother.name = 'brother';
            brother.dieaseList = this.assemblyData(this.brother, '');
            if (brother.dieaseList.length !== 0) {
                data.familyHis.push(brother);
            }
            // console.log('data', data)
            this.$store.dispatch({
                type: type.UPDATE_DISEASE,
                payload: {
                    data: data
                }
            })
        },
        assemblyData(data, otherKey, occupation, tumor) {
            let arr = [];
            let content = data.content;
            for (let i = 0; i < content.diseaseList.length; i++) {
                let itemdata = content.diseaseList[i];
                let item = {};
                if (itemdata.isCheck) {
                    if (itemdata.dataValue === otherKey) {
                        item.code = otherKey
                        item.value = content.otherDiseaseContent
                    } else if (itemdata.dataValue === occupation) {
                        item.code = occupation
                        item.value = content.occupationDisease
                    } else if (itemdata.dataValue === tumor) {
                        item.code = tumor
                        item.value = content.tumorDisease
                    } else {
                        item.code = itemdata.dataValue
                        item.value = ''
                    }
                    arr.push(item)
                }
            }
            if (content.type === 'DISEASE_TYPE.RADIO') {}
            return arr
        },
        initData() {
            // console.log('this.diseaseData', this.diseaseData)
            if (this.diseaseData.healthProblems) {
                let obj = this.healthProblems;
                let nDisease = this.diseaseData.healthProblems;
                this.setChoise(obj, nDisease, '9999')
            }
            if (this.diseaseData.drug) {
                let obj = this.drug;
                let nDisease = this.diseaseData.drug;
                this.setChoise(obj, nDisease, '9999')
            }
            if (this.diseaseData.allergen) {
                let obj = this.allergen;
                let nDisease = this.diseaseData.allergen;
                this.setChoise(obj, nDisease, '9999')
            }
            if (this.diseaseData.surgical) {
                let obj = this.surgical;
                let nDisease = this.diseaseData.surgical;
                this.setChoise(obj, nDisease, '9999')
            }
            if (this.diseaseData.trauma) {
                let obj = this.trauma;
                let nDisease = this.diseaseData.trauma;
                this.setChoise(obj, nDisease, '9999')
            }
            if (this.diseaseData.hereditaryHis) {
                let obj = this.hereditaryHis;
                let nDisease = this.diseaseData.hereditaryHis;
                this.setChoise(obj, nDisease, '9999')
            }
            if (this.diseaseData.bloodTransfusion) {
                let obj = this.bloodTransfusion;
                let nDisease = this.diseaseData.bloodTransfusion;
                this.setChoise(obj, nDisease, '9999')
            }
            if (this.diseaseData.disability) {
                let obj = this.disability;
                let nDisease = this.diseaseData.disability;
                this.setChoise(obj, nDisease, '9999')
            }
            if (this.diseaseData.jwHis) {
                let obj = this.jwHis;
                let nDisease = this.diseaseData.jwHis;
                this.setChoise(obj, nDisease, '9999', '13', '14')
            }
            if (this.diseaseData.familyHis) {
                let obj = this.diseaseData.familyHis;
                if (obj.length !== 0) {
                    for (let i = 0; i < obj.length; i++) {
                        let item = obj[i];
                        if (item.name === 'father') {
                            let nDisease = obj[i].dieaseList
                            this.setChoise(this.father, nDisease)
                        }
                        if (item.name === 'mother') {
                            let nDisease = obj[i].dieaseList;
                            this.setChoise(this.mother, nDisease)
                        }
                        if (item.name === 'son') {
                            let nDisease = obj[i].dieaseList;
                            this.setChoise(this.son, nDisease)
                        }
                        if (item.name === 'brother') {
                            let nDisease = obj[i].dieaseList;
                            this.setChoise(this.brother, nDisease)
                        }
                    }
                }
            }
        },
        setChoise(obj, serverData, dataValue, occVal, trVal) {
            if (!serverData || serverData.length === 0) {
                return
            }
            for (let i = 0; i < serverData.length; i++) {
                let content = obj.content;
                // console.log('initData', serverData);
                for (let j = 0; j < content.diseaseList.length; j++) {
                    let item = content.diseaseList;
                    let serverDisaseItemCode = serverData[i].code;
                    let serverDisaseItemValue = serverData[i].value;
                    let localItem = item[j];
                    if (serverDisaseItemCode === localItem.dataValue || serverData[i] === localItem.dataValue) {
                        // console.log(localItem.dataValue);
                        localItem.isCheck = true;
                        if (localItem.dataValue === dataValue) {
                            obj.hasOther = true;
                            content.otherDiseaseContent = serverDisaseItemValue
                        }
                        if (localItem.dataValue === occVal) {
                            obj.occupation = true;
                            content.occupationDisease = serverDisaseItemValue
                        }
                        if (localItem.dataValue === trVal) {
                            obj.tumor = true;
                            content.tumorDisease = serverDisaseItemValue
                        }
                    }
                }
            }
        },
        showLoadMsg(msg, time = 2000) {
            this.$layer.toast({
                content: msg,
                time: time
            })
        }
    },
    computed: {
        ...mapGetters(['upDateDiseaseLoading', 'diseaseLoading', 'diseaseData'])
    },
    mounted() {
        this.$store.dispatch({
            type: type.GET_DISEASE,
            payload: {}
        })
    },
    watch: {
        diseaseLoading(loading) {
            // console.log('diseaseLoading', loading);
            if (loading) {
                this.$layer.loading('加载中...')
            } else {
                this.$layer.close();
                let diseaseRequestStatus = this.$store.getters.diseaseRequestStatus;
                // console.log('diseaseRequestStatus', diseaseRequestStatus);
                if (diseaseRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(diseaseRequestStatus.msg);
                    this.loadError = true
                } else {
                    // 获取数据成功
                    this.loadError = false;
                    // let diseaseData = this.$store.getters.diseaseData;
                    // console.log('diseaseData', diseaseData);
                    this.initData()
                }
            }
        },
        upDateDiseaseLoading(loading) {
            // console.log('upDateDiseaseLoading', loading);
            if (loading) {
                this.$layer.loading('加载中...')
            } else {
                this.$layer.close();
                let diseaseRequestStatus = this.$store.getters.diseaseRequestStatus;
                if (diseaseRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(diseaseRequestStatus.msg);
                    this.loadError = true
                } else {
                    // 获取数据成功
                    this.loadError = false;
                    this.showLoadMsg('更新数据成功')
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 700)
                }
            }
        }
    },
    data() {
        return {
            headerData: {
                headerTitle: '病史状况',
                routerTitle: '',
                routerPath: ''
            },
            disability: {
                title: '残疾情况',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无残疾',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '视力残疾',
                        dataValue: '1',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '听力残疾',
                        dataValue: '2',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '语言残疾',
                        dataValue: '3',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肢体残疾',
                        dataValue: '4',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '智力残疾',
                        dataValue: '5',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '精神残疾',
                        dataValue: '6',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.OTHER,
                        text: '其他残疾',
                        dataValue: '9999',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'disability'
            },
            brother: {
                title: '',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无疾病',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '过敏症',
                        dataValue: '1',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '呼吸系统疾病',
                        dataValue: '2',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肢体残疾',
                        dataValue: '3',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '骨伤科疾病',
                        dataValue: '4',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '心脑血管疾病',
                        dataValue: '5',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '高血压或高血脂症',
                        dataValue: '6',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '糖尿病',
                        dataValue: '7',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肥胖症',
                        dataValue: '8',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '癌症',
                        dataValue: '9',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '视力问题',
                        dataValue: '10',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'brother'
            },
            son: {
                title: '',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无疾病',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '过敏症',
                        dataValue: '1',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '呼吸系统疾病',
                        dataValue: '2',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肢体残疾',
                        dataValue: '3',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '骨伤科疾病',
                        dataValue: '4',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '心脑血管疾病',
                        dataValue: '5',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '高血压或高血脂症',
                        dataValue: '6',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '糖尿病',
                        dataValue: '7',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肥胖症',
                        dataValue: '8',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '癌症',
                        dataValue: '9',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '视力问题',
                        dataValue: '10',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'son'
            },
            mother: {
                title: '',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无疾病',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '过敏症',
                        dataValue: '1',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '呼吸系统疾病',
                        dataValue: '2',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肢体残疾',
                        dataValue: '3',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '骨伤科疾病',
                        dataValue: '4',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '心脑血管疾病',
                        dataValue: '5',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '高血压或高血脂症',
                        dataValue: '6',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '糖尿病',
                        dataValue: '7',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肥胖症',
                        dataValue: '8',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '癌症',
                        dataValue: '9',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '视力问题',
                        dataValue: '10',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'mother'
            },
            father: {
                title: '家族史',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无疾病',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '过敏症',
                        dataValue: '1',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '呼吸系统疾病',
                        dataValue: '2',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肢体残疾',
                        dataValue: '3',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '骨伤科疾病',
                        dataValue: '4',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '心脑血管疾病',
                        dataValue: '5',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '高血压或高血脂症',
                        dataValue: '6',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '糖尿病',
                        dataValue: '7',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肥胖症',
                        dataValue: '8',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '癌症',
                        dataValue: '9',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '视力问题',
                        dataValue: '10',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'father'
            },
            healthProblems: {
                title: '现存健康问题',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无疾病',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '过敏症',
                        dataValue: '1',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '呼吸系统疾病',
                        dataValue: '2',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肢体残疾',
                        dataValue: '3',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '骨伤科疾病',
                        dataValue: '4',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '心脑血管疾病',
                        dataValue: '5',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '高血压或高血脂症',
                        dataValue: '6',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '糖尿病',
                        dataValue: '7',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肥胖症',
                        dataValue: '8',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '癌症',
                        dataValue: '9',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '视力问题',
                        dataValue: '10',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.OTHER,
                        text: '其他',
                        dataValue: '9999',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'healthProblems'
            },
            drug: {
                title: '禁忌药品',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '青霉素',
                        dataValue: '1',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '磺胺',
                        dataValue: '2',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '链霉素',
                        dataValue: '3',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.OTHER,
                        text: '其他',
                        dataValue: '9999',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'drug'
            },
            allergen: {
                title: '过敏原',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '药物过敏',
                        dataValue: '1',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '海鲜过敏',
                        dataValue: '2',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '花粉症',
                        dataValue: '3',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '酒精过敏',
                        dataValue: '4',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '注入性过敏原',
                        dataValue: '5',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '空气过敏原',
                        dataValue: '6',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.OTHER,
                        text: '其他过敏原',
                        dataValue: '9999',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'allergen'
            },
            jwHis: {
                title: '既往病史',
                hasOther: false,
                occupation: false,
                tumor: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '糖尿病',
                        dataValue: '1',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '脑卒中',
                        dataValue: '2',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '冠心病',
                        dataValue: '3',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '慢性阻塞性肺疾病',
                        dataValue: '4',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '严重精神障碍',
                        dataValue: '5',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '结核病',
                        dataValue: '6',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肝炎',
                        dataValue: '7',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '腰椎间盘突出',
                        dataValue: '8',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '肩周炎',
                        dataValue: '9',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '脂肪肝',
                        dataValue: '10',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '外周血管疾病',
                        dataValue: '11',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.NOMAL,
                        text: '颈椎病',
                        dataValue: '12',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.WORK,
                        text: '职业病',
                        dataValue: '13',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.TUMOR,
                        text: '恶性肿瘤',
                        dataValue: '14',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.OTHER,
                        text: '其他',
                        dataValue: '9999',
                        isCheck: false
                    }],
                    otherDiseaseContent: '',
                    occupationDisease: '',
                    tumorDisease: ''
                },
                key: 'jwHis'
            },
            surgical: {
                title: '手术史',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.OTHER,
                        text: '有',
                        dataValue: '9999',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'surgical'
            },
            trauma: {
                title: '外伤史',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.OTHER,
                        text: '有',
                        dataValue: '9999',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'trauma'
            },
            bloodTransfusion: {
                title: '输血史',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.OTHER,
                        text: '有',
                        dataValue: '9999',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'bloodTransfusion'
            },
            hereditaryHis: {
                title: '遗传病史',
                hasOther: false,
                content: {
                    diseaseList: [{
                        type: DISEASE_TYPE.NO,
                        text: '无',
                        dataValue: '0',
                        isCheck: false
                    }, {
                        type: DISEASE_TYPE.OTHER,
                        text: '有',
                        dataValue: '9999',
                        isCheck: false
                    }],
                    otherDiseaseContent: ''
                },
                key: 'hereditaryHis'
            }
        }
    }
}
</script>

<style scoped>
/*@import '../../../../style/amazeui/css/amazeui.min.css';*/
@import '../../../../style/reset.css';
</style>

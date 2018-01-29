<template>
    <div>
        <custom-header :headerData="headerData"></custom-header>
        <health-status-item :healthItemData="this.exerciseFrequency">
            <group slot='foot' style="margin-top: -20px">
                <x-input title="锻炼方式" v-model="exerciseType" placeholder="请输入锻炼方式"></x-input>
                <x-input title="每次锻炼时间" v-model="exerciseTime" placeholder="请输入锻炼时间"></x-input>
                <x-input title="坚持锻炼时间" v-model="exerciseHowLong" placeholder="请输入坚持时间"></x-input>
            </group>
        </health-status-item>
        <health-status-item :healthItemData="this.food"></health-status-item>
        <health-status-item :healthItemData="this.smoke"></health-status-item>
        <health-status-item :healthItemData="this.drunk"></health-status-item>
        <health-status-item :healthItemData="this.wineType">
        </health-status-item>
        <health-status-item :healthItemData="this.sleep"></health-status-item>
        <health-status-item :healthItemData="this.sleepQuality"></health-status-item>
        <health-status-item :healthItemData="this.eyesight"></health-status-item>
        <health-status-item :healthItemData="this.hearing"></health-status-item>
        <health-status-item :healthItemData="this.psychology"></health-status-item>
        <group gutter="0">
            <cell title="爱好及特长"></cell>
            <x-textarea placeholder="请输入爱好及特长" v-model="hobby"></x-textarea>
        </group>
        <x-button @click.native="submit()" style="margin-top: 20px;" type='primary'>提交</x-button>
    </div>
</template>

<script>
    import DISEASE_TYPE from '../../module/disease_type'
    import healthStatusItem from '../components/healthStatusItem'
    import * as type from './module/mutations_types'
    import {
        mapGetters
    } from 'vuex'
    import {
        GroupTitle,
        Group,
        Cell,
        XInput,
        XButton,
        XTextarea
    } from 'vux'

    export default {
        components: {
            GroupTitle,
            Group,
            Cell,
            XInput,
            XButton,
            healthStatusItem,
            XTextarea
        },
        data() {
            return {
                headerData: {
                    headerTitle: '生活养生',
                    routerTitle: '',
                    routerPath: ''
                },
                hobby: '',
                exerciseHowLong: '',
                exerciseType: '',
                exerciseTime: '',
                exerciseFrequency: {
                    title: '锻炼频率',
                    hasOther: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '每天',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '每周一次以上',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '偶尔',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '不锻炼',
                            dataValue: '4',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'exerciseFrequency'
                },
                food: {
                    title: '饮食习惯',
                    hasOther: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '荤素均衡',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '荤食为主',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '素食为主',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '嗜盐',
                            dataValue: '4',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '嗜油',
                            dataValue: '5',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '嗜糖',
                            dataValue: '6',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'food'
                },
                smoke: {
                    title: '吸烟情况',
                    hasOther: false,
                    noSmoke: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '从不吸烟',
                            dataValue: '0',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOSMOKE,
                            text: '已戒烟',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '吸烟',
                            dataValue: '3',
                            isCheck: false
                        }],
                        otherDiseaseContent: '',
                        noSmoke: ''
                    },
                    key: 'smoke'
                },
                drunk: {
                    title: '饮酒情况',
                    hasOther: false,
                    noSmole: false,
                    drunk: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '从不',
                            dataValue: '0',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '偶尔',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '经常',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.EVERYDAY,
                            text: '每天',
                            dataValue: '4',
                            isCheck: false
                        }],
                        otherDiseaseContent: '',
                        drunk: ''
                    },
                    key: 'drunk'
                },
                wineType: {
                    title: '饮酒种类',
                    hasOther: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.NOMAL,
                            text: '白酒',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMAL,
                            text: '啤酒',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMAL,
                            text: '红酒',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMAL,
                            text: '黄酒',
                            dataValue: '4',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.NOMALOTHER,
                            text: '其他',
                            dataValue: '9999',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'wineType'
                },
                sleep: {
                    title: '睡眠习惯',
                    hasOther: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '早睡早起',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '熬夜晚起',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '无规律',
                            dataValue: '3',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'sleep'
                },
                sleepQuality: {
                    title: '睡眠质量',
                    hasOther: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '优秀，入睡快，一觉到天亮',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '良好，入睡慢',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '糟糕，常惊醒',
                            dataValue: '3',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'sleepQuality'
                },
                eyesight: {
                    title: '视力情况',
                    hasOther: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '视力正常',
                            dataValue: '0',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '近视',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '其他视力问题',
                            dataValue: '2',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'eyesight'
                },
                hearing: {
                    title: '听力情况',
                    hasOther: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '听力正常',
                            dataValue: '0',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '有听力问题',
                            dataValue: '1',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'hearing'
                },
                psychology: {
                    title: '心理情况',
                    hasOther: false,
                    content: {
                        diseaseList: [{
                            type: DISEASE_TYPE.RADIO,
                            text: '心态平和',
                            dataValue: '0',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '焦虑',
                            dataValue: '1',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '抑郁',
                            dataValue: '2',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIO,
                            text: '紧张',
                            dataValue: '3',
                            isCheck: false
                        }, {
                            type: DISEASE_TYPE.RADIOOTHER,
                            text: '其他',
                            dataValue: '9999',
                            isCheck: false
                        }],
                        otherDiseaseContent: ''
                    },
                    key: 'psychology'
                }
            }
        },
        methods: {
            initData() {
                if (!this.lifeData) {
                    return
                }
                if (this.lifeData.exercise) {
                    let exercise = this.lifeData.exercise
                    if (exercise.exerciseType) {
                        this.exerciseType = exercise.exerciseType
                    }
                    if (exercise.exerciseTime) {
                        this.exerciseTime = exercise.exerciseTime
                    }
                    if (exercise.exercisePeriod) {
                        this.exerciseHowLong = exercise.exercisePeriod
                    }
                    if (exercise.exerciseFrequency) {
                        let obj = this.exerciseFrequency;
                        let nDisease = exercise.exerciseFrequency.split(',');
                        this.setChoise(obj, nDisease, '')
                    }
                }
                if (this.lifeData.food) {
                    let obj = this.food;
                    // console.log('obj', obj)
                    let nDisease = this.lifeData.food;
                    this.setChoise(obj, nDisease, '')
                }
                if (this.lifeData.smoke) {
                    let obj = this.smoke;
                    let nDisease = this.lifeData.smoke;
                    this.setChoise(obj, nDisease, '', '2')
                }
                if (this.lifeData.drunk) {
                    let obj = this.drunk;
                    let nDisease = this.lifeData.drunk;
                    this.setChoise(obj, nDisease, '', '', '4')
                }
                if (this.lifeData.wineType) {
                    let obj = this.wineType;
                    let nDisease = this.lifeData.wineType;
                    this.setChoise(obj, nDisease, '9999')
                }
                if (this.lifeData.sleep) {
                    // console.log('this.lifeData.sleep', this.lifeData.sleep)
                    if (this.lifeData.sleep) {
                        let obj = this.sleep;
                        let nDisease = this.lifeData.sleep.toString().split(',');
                        this.setChoise(obj, nDisease, '')
                    }
                }
                if (this.lifeData.sleepQuality) {
                    let obj = this.sleepQuality;
                    let nDisease = this.lifeData.sleepQuality.toString().split(',');
                    this.setChoise(obj, nDisease, '')
                }
                if (this.lifeData.eyesight) {
                    let obj = this.eyesight;
                    let nDisease = this.lifeData.eyesight.split(',');
                    this.setChoise(obj, nDisease, '')
                }
                if (this.lifeData.hearing) {
                    let obj = this.hearing;
                    let nDisease = this.lifeData.hearing.split(',');
                    this.setChoise(obj, nDisease, '')
                }
                if (this.lifeData.psychology) {
                    let obj = this.psychology;
                    let nDisease = this.lifeData.psychology;
                    this.setChoise(obj, nDisease, '9999')
                }
                if (this.lifeData.hobby) {
                    this.hobby = this.lifeData.hobby
                    // console.log('this.hobby', this.hobby)
                }
            },
            setChoise(obj, serverData, dataValue, noSmoke, drunk) {
                for (let i = 0; i < serverData.length; i++) {
                    let content = obj.content;
                    // console.log('initData', serverData);
                    for (let j = 0; j < content.diseaseList.length; j++) {
                        let item = content.diseaseList;
                        let serverDisaseItemCode = serverData[i].code;
                        let serverDisaseItemValue = serverData[i].value;
                        let localItem = item[j];
                        // console.log(content.diseaseList.title, 'serverDisaseItemValue')
                        if (serverDisaseItemCode === localItem.dataValue || serverData[i] === localItem.dataValue) {
                            localItem.isCheck = true;
                            if (localItem.dataValue === dataValue) {
                                obj.hasOther = true;
                                content.otherDiseaseContent = serverDisaseItemValue
                            }
                            if (localItem.dataValue === noSmoke) {
                                obj.noSmoke = true;
                                content.noSmoke = serverDisaseItemValue
                            }
                            if (localItem.dataValue === drunk) {
                                obj.drunk = true;
                                content.drunk = serverDisaseItemValue
                            }
                        }
                    }
                }
            },
            submit() {
                let data = {};
                data.exercise = {
                    exerciseType: this.exerciseType,
                    exerciseTime: this.exerciseTime,
                    exercisePeriod: this.exerciseHowLong,
                    exerciseFrequency: this.radioData(this.exerciseFrequency, '').join('')
                }
                data.hobby = this.hobby
                data[this.food.key] = this.assemblyData(this.food, '');
                data[this.smoke.key] = this.assemblyData(this.smoke, '', '2');
                data[this.drunk.key] = this.assemblyData(this.drunk, '', '', '4');
                data[this.wineType.key] = this.assemblyData(this.wineType, '9999');
                data[this.sleep.key] = this.radioData(this.sleep).join('');
                data[this.sleepQuality.key] = this.radioData(this.sleepQuality).join('');
                data[this.eyesight.key] = this.radioData(this.eyesight).join('');
                data[this.hearing.key] = this.radioData(this.hearing).join('');
                data[this.psychology.key] = this.assemblyData(this.psychology, '9999');
                // console.log('data', data)
                this.$store.dispatch({
                    type: type.UPDATE_LIFE,
                    payload: {
                        data: data
                    }
                })
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
            assemblyData(data, otherKey, smokeKey, drunk) {
                let arr = [];
                let content = data.content;
                // console.log('content', data.content)
                for (let i = 0; i < content.diseaseList.length; i++) {
                    let itemdata = content.diseaseList[i];
                    let item = {};
                    if (itemdata.isCheck) {
                        if (itemdata.dataValue === otherKey) {
                            item.code = otherKey
                            item.value = content.otherDiseaseContent
                            // console.log('其他', item)
                        } else if (itemdata.dataValue === drunk) {
                            item.code = drunk
                            item.value = content.drunk
                            // console.log('饮酒', item)
                        } else if (itemdata.dataValue === smokeKey) {
                            item.code = smokeKey
                            item.value = content.noSmoke
                            // console.log('饮酒', item)
                        } else {
                            item.code = itemdata.dataValue
                            item.value = ''
                        }
                        arr.push(item)
                    }
                }
                if (content.type === 'DISEASE_TYPE.RADIO') {
                    // console.log('item', item)
                }
                return arr
            }
        },
        computed: {
            ...mapGetters(['upDateLifeLoading', 'lifeLoading', 'lifeData'])
        },
        watch: {
            lifeLoading(loading) {
                // console.log('lifeLoading', loading);
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.$layer.close();
                    let lifeRequestStatus = this.$store.getters.lifeRequestStatus;
                    // console.log("lifeRequestStatus", lifeRequestStatus);
                    if (lifeRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(lifeRequestStatus.msg);
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false;
                        // let lifeData = this.$store.getters.lifeData;
                        // console.log('lifeData', lifeData);
                        this.initData()
                    }
                }
            },
            upDateLifeLoading(loading) {
                // console.log('upDateLifeLoading', loading);
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.$layer.close();
                    let lifeRequestStatus = this.$store.getters.lifeRequestStatus;
                    if (lifeRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(lifeRequestStatus.msg);
                    } else {
                        // 获取数据成功
                        this.showLoadMsg('更新数据成功')
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 700)
                    }
                }
            }
        },
        mounted() {
            this.$store.dispatch({
                type: type.GET_LIFE,
                payload: {}
            })
        }
    }
</script>

<style scoped>
    /*@import '../../../../style/amazeui/css/amazeui.min.css';*/
    @import '../../../../style/reset.css';
    .weui-cells:before {
        border-top: 0;
    }
    label{
        margin-bottom:0;
        color: #4a4a4a;
    }
</style>

<template>
<div class="itemHome clearfix" @click="selectedPath(indicator)">
    <div class="padding2 title">
        <div style="font-size: 14px;color: #000000">{{indicator.quotaName}}</div>
        <div style="font-size: 11px;color: #4a4a4a">{{indicator ? conversionTime(indicator.time) : ""}}</div>
    </div>
    <div class="padding2 title title2">
        <!--<img :src="indicator.quotaImageIcon ? indicator.quotaImageIcon : this.getImg()" />-->
        <span>
            <img v-if="indicator.quotaCode==='XYZBXY001006'" style="width: 26px;height: 45px;" :src="indicator.quotaImageIcon ? indicator.quotaImageIcon : this.getImg()" />
            <img v-else :src="indicator.quotaImageIcon ? indicator.quotaImageIcon : this.getImg()" />
        </span>
        <!-- 血脂 -->
        <div v-if="indicator.quotaCode === 'XYZBXY003018/XYZBXY003017' || indicator.quotaName === '血脂' ">
            <div>
                <span style="font-size: 12px;color: #4a4a4a">HDL</span>
                <span style="font-size: 18px;" :class="[indicator.quotaNormal === '1'? 'abnormal':'bloodNormal']">
                    {{this.getBloodFat(indicator.quotaValue).length >0 ? getBloodFat(indicator.quotaValue)[0]:''}}
                </span>
                <span style="font-size: 12px;color: #4a4a4a">LDL</span>
                <span style="font-size: 18px;" :class="[indicator.quotaNormal === '1'? 'abnormal':'bloodNormal']">
                    {{this.getBloodFat(indicator.quotaValue).length>0 ? getBloodFat(indicator.quotaValue)[1]:''}}
                </span>
            </div>
        </div>
        <!-- 默认 -->
        <div v-else>
            <div v-if="indicator.quotaCode==='XYZBXY001010'">
                <span style="font-size: 12px;" :class="[indicator.quotaNormal === '1'? 'abnormal':'normal']">{{indicator.quotaValue}}</span>
                <span style="font-size: 11px;color: #9B9B9B ">{{indicator.quotaValue !== '---' ? indicator.quotaUnit : ''}}</span>
            </div>
            <div v-else>
                <span style="font-size: 24px;" :class="[indicator.quotaNormal === '1'? 'abnormal':'normal']">{{indicator.quotaValue}}</span>
                <span style="font-size: 11px;color: #9B9B9B ">{{indicator.quotaValue !== '---' ? indicator.quotaUnit : ''}}</span>
            </div>
        </div>
    </div>
    <div class="padding2" style="margin: 10px 0px;width: 100%;">
        <!-- 面舌诊 -->
        <div v-if="indicator.quotaCode === 'quotaCode3' || indicator.quotaName === '面舌诊'">
            <div style="text-align: left;font-size:11px;color: red">
                {{indicator.quotaRange}}
            </div>
        </div>
        <!-- 体脂 -->
        <div v-else-if="indicator.quotaCode === 'XYZBXY0010240/XYZBXY0010241' || indicator.quotaName === '体脂'">
            <div style="text-align: left;font-size:11px;color: #72B9E1">
                参考范围：{{indicator.quotaRange}}
            </div>
        </div>
        <!-- 血脂 -->
        <div v-else-if="indicator.quotaCode === 'XYZBXY003018/XYZBXY003017' || indicator.quotaName === '血脂'">
            <div style="text-align: left;font-size:11px;color: #72B9E1">
                {{indicator.quotaRange}}
            </div>
        </div>
        <!-- 体温 -->
        <div v-else-if="indicator.quotaCode === 'XYZBXY001006'">
            <div style="text-align: left;font-size:11px;color: #9E9E9E">
                <my-dialog :itemText="indicator.quotaRange"></my-dialog>
                <!--<span>{{indicator.quotaRange}}</span>-->
            </div>
        </div>
        <!-- 睡眠 -->
        <div v-else-if="indicator.quotaCode === 'XYZBXY001027/XYZBXY001028/XYZBXY001026' ">
            <div style="text-align: left;font-size:11px;color: #9E9E9E">
                {{indicator.quotaRange}}
            </div>
        </div>
        <!-- 心电 -->
        <div v-else-if="indicator.quotaCode === 'XYZBXY001010' ">
            <div style="text-align: left;font-size:11px;color: #9E9E9E">
            </div>
        </div>
        <!-- 默认 -->
        <div v-else>
            <div style="text-align: left;font-size:11px;color: #72B9E1">
                参考范围: {{indicator.quotaRange}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'
import MyDialog from '../../../../components/MyPop'
export default {
    props: {
        indicator: {
            type: Object,
            required: true,
            default: function () {
                return {}
            }
        }
    },
    components: {
        MyDialog
    },
    data() {
        return {
            codeConfig: {
                'quotaCode1': {
                    router: '/pressure',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode2': {
                    router: '/otherIndicators',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode3': {
                    router: '',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode4': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode5': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode6': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode7': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode8': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode9': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode10': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode11': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode12': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode13': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                },
                'quotaCode14': {
                    router: '/bodyFat',
                    img: require('../../../../images/o1.png')
                }
            }
        }
    },

    mounted() {
        // console.log('indicatorItem', this.indicator)
    },

    methods: {
        conversionTime(time) {
            if (time) {
                return moment(time).format('YYYY-MM-DD')
            }
            return ''
        },
        getImg() {
            let indicatorConfig = this.codeConfig[this.indicator.quotaCode]
            if (indicatorConfig) {
                return indicatorConfig.img
            }
        },
        getBodyFat(fatData) {
            if (fatData) {
                // console.log('fatData', fatData)
                let values = fatData.split('#')
                if (values.length > 0) {
                    return values
                }
                return []
            }
            return []
        },
        getBloodFat(bloodfatData) {
            if (bloodfatData) {
                // console.log('fatData', bloodfatData)
                let values = bloodfatData.split('#')
                if (values.length > 0) {
                    return values
                }
                return []
            }
            return []
        },
        showLoadMsg(msg, time = 2000) {
            this.$layer.toast({
                content: msg,
                time: time
            })
        },
        selectedPath (item) {
            if (item.quotaCode === 'XYZBXY001001' | item.quotaName === '面舌诊' | item.quotaCode === 'XYZBXY001025') {
                return false
            } else if (item.quotaName === '血压' | item.quotaName === '血脂') {
                this.$router.push({
                    'name': 'pressure',
                    query: {
                        highCode: item.quotaCode.split('/')[0],
                        lowCode: item.quotaCode.split('/')[1]
                    }
                })
            } else if (item.quotaCode === 'XYZBXY001027/XYZBXY001028/XYZBXY001026') {
                console.log(item.quotaCode.split('/'))
                this.$router.push({
                    'name': 'pressure',
                    query: {
                        totalCode: item.quotaCode.split('/')[2],
                        lowCode: item.quotaCode.split('/')[0],
                        highCode: item.quotaCode.split('/')[1]
                    }
                })
            } else if (item.quotaCode === 'XYZBXY001010') {
                //  console.log(item.quotaCode.split('/'))
                this.$router.push({
                    'name': 'ecg',
                    query: {
                        quotaCode: item.quotaCode
                    }
                })
            } else {
                this.$router.push({
                    name: 'otherIndicatorsDetails',
                    query: {
                        'quotaCode': item.quotaCode,
                        // 'queryTime': item.time,
                        'queryFlag': '4'
                    }
                })
            }
        }
    },

    updated() {
        // console.log('updated', this.record)
    }
}
</script>

<style lang="scss" scoped>
.clearfix:after {
    content: ".";
    /*内容为“.”就是一个英文的句号而已。也可以不写。*/
    display: block;
    /*加入的这个元素转换为块级元素。*/
    clear: both;
    /*清除左右两边浮动。*/
    visibility: hidden;
    /*可见度设为隐藏。注意它和display:none;是有区别的。visibility:hidden;仍然占据空间，只是看不到而已；*/
    line-height: 0;
    /*行高为0；*/
    height: 0;
    /*高度为0；*/
    font-size: 0;
    /*字体大小为0；*/
}

.itemHome {
    background-color: #FFFFFF;
    .abnormal {
        color: red;
    }
    .normal {
        color: #4a4a4a;
    }
    .bloodNormal {
        color: #9B9B9B;
    }
    .title {
        /*margin-top: 20px;*/
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title2 {
        height: 80px;
    }
    .title2 > * {
        align-items: center;
    }
    .title2 > span > img {
        width: 48px;
        height: 48px;
    }
    .borderB {
        border-bottom: 1px solid #e8e9ec;
    }
    .borderR {
        border-right: 1px solid #e8e9ec;
    }
    .divinfo {
        /*border: 1px solid red;*/
        font-size: 20px;
        color: #000000;
        float: left;
        /*left: 1px;*/
    }
    .divinfo1 {
        /*border: 1px solid red;*/
        font-size: 17px;
        color: #000000;
        float: left;
        /*left: 1px;*/
    }
    .divtime {
        font-size: 12px;
        margin-top: 5px;
        font-weight: lighter;
        color: #666666;
        /*border: 1px solid red;*/
        float: right;
        right: 1px;
    }
    .divbot {
        font-size: 12px;
        float: left;
        /*left: 1px;*/
        font-weight: lighter;
        color: #0087f9;
        min-height: 40px;
    }
    .imgl {
        margin-left: 3px;
        float: left;
        max-width: 100%;
        width: 70px;
        height: 70px;
    }
    .img3 {
        float: right;
        max-width: 100%;
        width: 85px;
        height: 98px;
    }
    .sp {
        color: #000000;
        float: right;
        font-size: 35px;
        font-weight: bold;
    }
    .sp1 {
        color: #666666;
        float: right;
        font-size: 13px;
        margin-top: 10px;
    }
    .sp3 {

        color: #000000;
        float: right;
        font-size: 25px;
        font-weight: bold;
    }
    .sp4 {
        color: #666666;
        float: right;
        font-size: 13px;
        margin-top: 10px;
    }
    .sp5 {
        color: #666666;
        float: right;
        font-size: 13px;
        /*margin-top: 10px;*/
    }
    .padding2 {
        padding: 0 3px 0 5px;
    }
}
</style>

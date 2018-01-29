<template>
    <div style="text-align: left">
        <div class="Usertitle2" v-if="healthItemData.title">{{healthItemData.title}}</div>
        <div style="margin-top: 0px; " class="weui-cells weui-cells_form">
            <slot name='title'></slot>
            <div style="padding: 10px 15px;">
                <div class="weui-cell__bd">
                    <div class="weui-cell__bd" id="ymptom">
                        <button v-for="item in healthItemData.content.diseaseList" style="margin: 7px 2px;"
                                class="am-btn am-btn-default  radius" v-bind:class="{'am-btn-secondarys':item.isCheck}"
                                @click="toggleButton(item,healthItemData)">
                            {{item.text}}
                        </button>
                    </div>
                </div>
            </div>
            <group v-if="healthItemData.hasOther">
                <x-input title="其他" type="text" placeholder="请输入"
                         v-model='healthItemData.content.otherDiseaseContent'></x-input>
            </group>
            <group v-if="healthItemData.occupation">
                <x-input title="职业病" type="text" placeholder="请输入职业病"
                         v-model='healthItemData.content.occupationDisease'></x-input>
            </group>
            <group v-if="healthItemData.tumor">
                <x-input title="恶性肿瘤" type="text" placeholder="请输入恶性肿瘤"
                         v-model='healthItemData.content.tumorDisease'></x-input>
            </group>
            <group v-if="healthItemData.noSmoke">
                <x-input title="戒烟年龄" type="text" placeholder="请输入戒烟年龄"
                         v-model='healthItemData.content.noSmoke'></x-input>
            </group>
            <group v-if="healthItemData.drunk">
                <x-input title="日饮酒量" type="text" placeholder="请输入日饮酒量"
                         v-model='healthItemData.content.drunk'></x-input>
            </group>
            <slot name='content'></slot>
            <slot name='foot'></slot>
        </div>
    </div>
</template>

<script>
    import DISEASE_TYPE from '../../module/disease_type'
    import {XInput, Group} from 'vux'

    export default {
        components: {
            XInput,
            Group
        },
        props: {
            healthItemData: {
                type: Object,
                required: true,
                default: function () {
                    return {}
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            toggleButton(buttonObj, healthItemData) {
                if (healthItemData.click) {
                    return
                }
                // buttonObj.isCheck = !buttonObj.isCheck
                if (buttonObj.type === DISEASE_TYPE.OTHER) {
                    for (let i = 0; i < healthItemData.content.diseaseList.length; i++) {
                        let item = healthItemData.content.diseaseList[i]
                        if (item.type === DISEASE_TYPE.NO) {
                            item.isCheck = false;
                        }
                    }
                    // healthItemData.content.diseaseList[0].isCheck = false;
                    buttonObj.isCheck = !buttonObj.isCheck
                    healthItemData.hasOther = !healthItemData.hasOther
                }
                if (buttonObj.type === DISEASE_TYPE.NOMALOTHER) {
                    buttonObj.isCheck = !buttonObj.isCheck
                    healthItemData.hasOther = !healthItemData.hasOther
                }
                if (buttonObj.type === DISEASE_TYPE.NOSMOKE) {
                    for (let i = 0; i < healthItemData.content.diseaseList.length; i++) {
                        let item = healthItemData.content.diseaseList[i]
                        // console.log('code', buttonObj.dataValue, item.dataValue)
                        if (buttonObj.dataValue !== item.dataValue) {
                            item.isCheck = false;
                        }
                    }
                    buttonObj.isCheck = !buttonObj.isCheck
                    healthItemData.noSmoke = !healthItemData.noSmoke
                }
                if (buttonObj.type === DISEASE_TYPE.EVERYDAY) {
                    for (let i = 0; i < healthItemData.content.diseaseList.length; i++) {
                        let item = healthItemData.content.diseaseList[i]
                        // console.log('code', buttonObj.dataValue, item.dataValue)
                        if (buttonObj.dataValue !== item.dataValue) {
                            item.isCheck = false;
                        }
                    }
                    buttonObj.isCheck = !buttonObj.isCheck
                    healthItemData.drunk = !healthItemData.drunk
                }
                if (buttonObj.type === DISEASE_TYPE.NO) {
                    healthItemData.hasOther = false
                    for (let i = 0; i < healthItemData.content.diseaseList.length; i++) {
                        healthItemData.content.diseaseList[i].isCheck = false;
                        buttonObj.isCheck = true;
                    }
                }
                if (buttonObj.type === DISEASE_TYPE.NOMAL) {
                    // healthItemData.content.diseaseList[0].isCheck = false;
                    buttonObj.isCheck = !buttonObj.isCheck
                    for (let i = 0; i < healthItemData.content.diseaseList.length; i++) {
                        let item = healthItemData.content.diseaseList[i]
                        if (item.type === DISEASE_TYPE.NO) {
                            item.isCheck = false;
                        }
                    }
                }
                if (buttonObj.type === DISEASE_TYPE.WORK) {
                    healthItemData.occupation = !healthItemData.occupation
                    healthItemData.content.diseaseList[0].isCheck = false;
                    buttonObj.isCheck = !buttonObj.isCheck
                    for (let i = 0; i < healthItemData.content.diseaseList.length; i++) {
                        let item = healthItemData.content.diseaseList[i]
                        if (item.type === DISEASE_TYPE.NO) {
                            item.isCheck = false;
                        }
                    }
                }
                if (buttonObj.type === DISEASE_TYPE.TUMOR) {
                    healthItemData.tumor = !healthItemData.tumor
                    healthItemData.content.diseaseList[0].isCheck = false;
                    buttonObj.isCheck = !buttonObj.isCheck
                    for (let i = 0; i < healthItemData.content.diseaseList.length; i++) {
                        let item = healthItemData.content.diseaseList[i]
                        if (item.type === DISEASE_TYPE.NO) {
                            item.isCheck = false;
                        }
                    }
                }
                if (buttonObj.type === DISEASE_TYPE.RADIO) {
                    // healthItemData.content.diseaseList[0].isCheck = false;
                    healthItemData.noSmoke = false
                    for (let i = 0; i < healthItemData.content.diseaseList.length; i++) {
                        let item = healthItemData.content.diseaseList[i]
                        // console.log('code', buttonObj.dataValue, item.dataValue)
                        if (buttonObj.dataValue !== item.dataValue) {
                            item.isCheck = false;
                        }
                    }
                    healthItemData.hasOther = false
                    healthItemData.drunk = false
                    buttonObj.isCheck = !buttonObj.isCheck
                }
                if (buttonObj.type === DISEASE_TYPE.RADIOOTHER) {
                    // healthItemData.content.diseaseList[0].isCheck = false;
                    for (let i = 0; i < healthItemData.content.diseaseList.length; i++) {
                        let item = healthItemData.content.diseaseList[i]
                        if (buttonObj.dataValue !== item.dataValue) {
                            item.isCheck = false;
                            // console.log('item', item.dataValue)
                        }
                    }
                    buttonObj.isCheck = !buttonObj.isCheck;
                    healthItemData.hasOther = !healthItemData.hasOther
                }
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .Usertitle2 {
        color: #666666;
        background: #efeff4;
        padding-left: 18px;
        height: 40px;
        line-height: 40px;
    }

    .am-btn-secondarys {
        color: #F2FCF6;
        background-color: #33CC66;
        border-color: #33CC66;
    }
    .am-btn {
        display: inline-block;
        margin-bottom: 0;
        padding: .5em 1em;
        vertical-align: middle;
        font-size: 14px;
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
    .weui-cells:before {
        border-top: 0;
    }
    /*.am-btn-default {*/
        /*color: #444;*/
        /*background-color: #e6e6e6;*/
        /*border-color: #e6e6e6*/
    /*}*/
</style>

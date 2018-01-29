<template>
    <div>
        <custom-header :headerData="this.headerData"></custom-header>
        <div v-if="this.firstLoad" style="width: 100%;height: 500px">
            <div style="margin-top: 50%;text-align: center">正在加载中</div>
        </div>
        <div v-else>
            <div v-if="this.loadError" style="width: 100%;height: 500px">
                <keep-alive>
                    <reload-page :reload="this.againLoad"></reload-page>
                </keep-alive>
            </div>
            <div v-else>
                <div id="wrapper">
                    <div id="principle">
                        <p class="principle_title">{{this.renderData.states.title}}</p>
                        <ul class="principle_list">
                            <li v-for="(item,index) in this.renderData.states.list" :key="index">{{item.value}}</li>
                        </ul>
                    </div>
                    <hr/>
                    <div id="recommend">
                        <p class="recommend_title">{{this.renderData.recommendAction.title.value}}</p>
                        <hr/>
                        <div class="recommend_list">
                            <div class="recommend_item" v-for="(item,index) in this.renderData.recommendAction.list"
                                 :key="index">
                                <div class="recommend_item_title">
                                    <p>{{item.itemTitle}}</p>
                                    <img :src="item.itemImg"/>
                                </div>
                                <div class="sports_plan">
                                    <div>运动方案</div>
                                    <p v-html="item.itemPlan"></p>
                                </div>
                                <div class="be_careful">
                                    <div>注意事项</div>
                                    <p v-html="item.itemCare"></p>
                                </div>
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
    import * as type from './module/mutations_types'
    import {
        mapGetters
    } from 'vuex'
    import HeaderTitle from '../../../../components/HeaderTitle'

    export default {
        mounted() {
            this.sendData.diseaseCode = this.$route.query.diseaseCode
            this.sendData.pageId = this.$route.query.pageId
            this.$store.dispatch({
                type: type.GET_SPORTSHEALTH_DATA,
                payload: this.sendData
            });
        },
        computed: {
            ...mapGetters(['sportsHealthLoading', 'sportsHealthData', 'sportsHealthRequestStatus'])
        },
        watch: {
            sportsHealthLoading(loading) {
                // console.log('sportsHealthLoading', loading)
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.firstLoad = false
                    // console.log(this.firstLoad)
                    this.$layer.close()
                    let sportsHealthRequestStatus = this.$store.getters.sportsHealthRequestStatus
                    if (sportsHealthRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(sportsHealthRequestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        let sportsHealthData = this.$store.getters.sportsHealthData
                        // console.log('aftercareData', this.sportsHealthData)
                        this.testData = sportsHealthData
                        this.assemblyData(this.testData)
                    }
                }
            }
        },
        components: {
            XHeader,
            HeaderTitle
        },
        data() {
            return {
                sendData: {
                    temCode: 'WUYANG_LKJ',
                    deType: '0',
                    pageId: '',
                    diseaseCode: ''
                },
                loadError: false,
                firstLoad: true,
                headerData: {
                    headerTitle: '动养'
                },
                renderData: {
                    title: '',
                    states: {
                        title: '',
                        list: []
                    },
                    recommendAction: {
                        title: '',
                        list: []
                    }
                },
                testData: {
                }
            }
        },
        methods: {
            againLoad() {
                this.$store.dispatch({
                    type: type.GET_SPORTSHEALTH_DATA,
                    payload: this.sendData
                });
            },
            showLoadMsg(msg, time = 2000) {
                this.$layer.toast({
                    content: msg,
                    time: time
                })
            },
            assemblyData(data) {
                if (data.action_title) {
                    var actionTitle = data.action_title
                    if (actionTitle.value) {
                        this.headerData.headerTitle = actionTitle.value
                    }
                }
                if (data.action_states) {
                    var actionStates = data.action_states;
                    if (actionStates.action_states_title) {
                        var actionStatesTitle = actionStates.action_states_title;
                        if (actionStatesTitle.value) {
                            var principleTitle = actionStatesTitle.value;
                            this.renderData.states.title = principleTitle
                        }
                    }
                    if (actionStates.action_states_content) {
                        var actionStatesContent = actionStates.action_states_content;
                        for (var i = 0; i < actionStatesContent.length; i++) {
                            var item = actionStatesContent[i].action_states_content;
                            this.renderData.states.list.push(item)
                        }
                    }
                }
                if (data.recommend_action) {
                    var recommendAction = data.recommend_action
                    if (recommendAction.recommend_action_title) {
                        var recommendActionTitle = recommendAction.recommend_action_title
                        if (recommendActionTitle.value) {
                            this.renderData.recommendAction.title = recommendActionTitle
                        }
                    }

                    if (recommendAction.recommend_action_list) {
                        var recommendActionList = recommendAction.recommend_action_list

                        for (var j = 0; j < recommendActionList.length; j++) {
                            let recommendObj = {
                                itemTitle: '',
                                itemImg: '',
                                itemPlan: '',
                                itemCare: ''
                            }
                            var recommendActionItem = recommendActionList[j]
                            if (recommendActionItem.recommend_action_func) {
                                var recommendActionFunc = recommendActionItem.recommend_action_func
                                if (recommendActionFunc.value) {
                                    var itemTitle = recommendActionFunc.value
                                    recommendObj.itemTitle = itemTitle
                                }
                            }
                            if (recommendActionItem.recommend_action_img) {
                                var recommendActionImg = recommendActionItem.recommend_action_img
                                if (recommendActionImg.value) {
                                    var itemImg = recommendActionImg.value
                                    recommendObj.itemImg = itemImg
                                }
                            }
                            if (recommendActionItem.recommend_action_plan) {
                                var recommendActionPlan = recommendActionItem.recommend_action_plan
                                if (recommendActionPlan.value) {
                                    let reg = /#/g
                                    var itemPlan = recommendActionPlan.value.replace(reg, '<br>')
                                    recommendObj.itemPlan = itemPlan
                                }
                            }
                            if (recommendActionItem.recommend_action_care) {
                                var recommendActionCare = recommendActionItem.recommend_action_care
                                if (recommendActionCare.value) {
                                    let reg = /#/g
                                    var itemCare = recommendActionCare.value.replace(reg, '<br>')
                                    recommendObj.itemCare = itemCare
                                }
                            }
                            this.renderData.recommendAction.list.push(recommendObj)
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="css" scoped>
    /*@import "../../../../style/amazeui/css/amazeui.min.css";*/
    /**{*/
        /*margin: 0;*/
        /*padding: 0;*/
    /*}*/
    body{
        width: 100%;
        height: 100%;
        background: #FFFFFF;
    }

    #principle,#recommend{
        background: #fff;
        width: 90%;
        margin: 0 auto;
        /*margin: 5px;*/
        padding: 10px;
        text-align: left;
    }
    .recommend_item{
        /*border: 1px solid black;*/
        box-shadow: 0px 1px 3px gainsboro;
        padding: 15px 0 25px 0;
    }
    .title{
        margin: 0;
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
    }
    .principle_list{
        margin-left: 0 !important;
        list-style: none;
        margin: 0;
        font-size: 12px;
    }
    .principle_list li{
        letter-spacing: 1px;
    }

    .recommend_item{
        margin:16px 0 ;
    }
    .recommend_item_title p{
        text-align: center;
        color: #006600;
    }
    .recommend_item_title img{
        width: 100%;
        height: 120px;
    }

    .sports_plan{
        padding:0 15px;
    }
    .be_careful{
        padding:0 15px;
    }
    .sports_plan p,.be_careful p{
        margin: 0;
        font-size: 12px;
    }
    .sports_plan div,.be_careful div{
        font-size: 14px;
        font-weight: 600;
    }
    .sports_plan,.be_careful{
        margin-top: 16px;
    }
    ol, ul {
        padding-left: 0em;
    }

</style>

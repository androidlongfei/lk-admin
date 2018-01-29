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
                        <p class="recommend_title">{{this.renderData.recommendKungfu.title.value}}</p>
                        <div class="recommend_list">
                            <div class="recommend_item" v-for="(item,index) in this.renderData.recommendKungfu.list"
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

    export default {
        mounted() {
            this.sendData.diseaseCode = this.$route.query.diseaseCode
            this.sendData.pageId = this.$route.query.pageId
            this.$store.dispatch({
                type: type.GET_KUNGFU_DATA,
                payload: this.sendData
            });
        },
        computed: {
            ...mapGetters(['kungfuLoading', 'kungfuData', 'kungfuRequestStatus'])
        },
        watch: {
            kungfuLoading(loading) {
                // console.log('kungfuLoading', loading)
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.firstLoad = false
                    // console.log(this.firstLoad)
                    this.$layer.close()
                    let kungfuRequestStatus = this.$store.getters.kungfuRequestStatus
                    if (kungfuRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(kungfuRequestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        let kungfuData = this.$store.getters.kungfuData
                        // console.log('kungfuData', this.kungfuData)
                        this.testData = kungfuData
                        this.assemblyData(this.testData)
                    }
                }
            }
        },
        components: {
            XHeader
        },
        data() {
            return {
                sendData: {
                    temCode: 'WUYANG_LKJ',
                    deType: '0',
                    pageId: '',
                    diseaseCode: ''
                },
                headerData: {
                    headerTitle: '术养'
                },
                loadError: false,
                firstLoad: true,
                renderData: {
                    title: '',
                    states: {
                        title: '',
                        list: []
                    },
                    recommendKungfu: {
                        title: '',
                        list: []
                    }
                },
                testData: {}
            }
        },
        methods: {
            againLoad() {
                this.$store.dispatch({
                    type: type.GET_KUNGFU_DATA,
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
                if (data.kungfu_title) {
                    var kungfuTitle = data.kungfu_title;
                    if (kungfuTitle.value) {
                        this.headerData.headerTitle = kungfuTitle.value
                    }
                }
                if (data.kungfu_states) {
                    var kungfuStates = data.kungfu_states;
                    if (kungfuStates.kungfu_states_title) {
                        var kungfuStatesTitle = kungfuStates.kungfu_states_title;
                        if (kungfuStatesTitle.value) {
                            var principleTitle = kungfuStatesTitle.value;
                            this.renderData.states.title = principleTitle
                        }
                    }
                    if (kungfuStates.kungfu_states_content) {
                        var kungfuStatesContent = kungfuStates.kungfu_states_content;
                        for (var i = 0; i < kungfuStatesContent.length; i++) {
                            var item = kungfuStatesContent[i].kungfu_states_content;
                            this.renderData.states.list.push(item)
                        }
                    }
                }
                if (data.recommend_kungfu) {
                    var recommendKungfu = data.recommend_kungfu;
                    if (recommendKungfu.recommend_kungfu_title) {
                        var recommendKungfuTitle = recommendKungfu.recommend_kungfu_title;
                        if (recommendKungfuTitle.value) {
                            this.renderData.recommendKungfu.title = recommendKungfuTitle
                        }
                    }

                    if (recommendKungfu.recommend_kungfu_list) {
                        var recommendKungfuList = recommendKungfu.recommend_kungfu_list;

                        for (var j = 0; j < recommendKungfuList.length; j++) {
                            let recommendObj = {
                                itemTitle: '',
                                itemImg: '',
                                itemPlan: '',
                                itemCare: ''
                            };
                            var recommendKungfuItem = recommendKungfuList[j];
                            if (recommendKungfuItem.recommend_kungfu_func) {
                                var recommendKungfuFunc = recommendKungfuItem.recommend_kungfu_func;
                                if (recommendKungfuFunc.value) {
                                    var itemTitle = recommendKungfuFunc.value;
                                    recommendObj.itemTitle = itemTitle
                                }
                            }
                            if (recommendKungfuItem.recommend_kungfu_img) {
                                var recommendKungfuImg = recommendKungfuItem.recommend_kungfu_img;
                                if (recommendKungfuImg.value) {
                                    var itemImg = recommendKungfuImg.value;
                                    recommendObj.itemImg = itemImg
                                }
                            }
                            if (recommendKungfuItem.recommend_kungfu_plan) {
                                var recommendKungfuPlan = recommendKungfuItem.recommend_kungfu_plan;
                                if (recommendKungfuPlan.value) {
                                    let reg = /#/g;
                                    var itemPlan = recommendKungfuPlan.value.replace(reg, '<br>');
                                    recommendObj.itemPlan = itemPlan
                                }
                            }
                            if (recommendKungfuItem.recommend_kungfu_care) {
                                var recommendKungfuCare = recommendKungfuItem.recommend_kungfu_care;
                                if (recommendKungfuCare.value) {
                                    let reg = /#/g;
                                    var itemCare = recommendKungfuCare.value.replace(reg, '<br>');
                                    recommendObj.itemCare = itemCare
                                }
                            }
                            this.renderData.recommendKungfu.list.push(recommendObj)
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="css" scoped>
    /*@import "../../../../style/amazeui/css/amazeui.min.css";*/
    * {
        margin: 0;
        padding: 0;
    }

    body {
        width: 100%;
        height: 100%;
        background: #FFFFFF;
    }

    #principle, #recommend {
        background: #fff;
        width: 90%;
        margin: 0 auto;
        /*margin: 5px;*/
        padding: 10px;
        text-align: left;
    }

    .recommend_item {
        /*border: 1px solid black;*/
        box-shadow: 0px 1px 3px gainsboro;
        padding: 15px 0 25px 0;
    }

    .title {
        margin: 0;
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
    }

    .principle_list {
        margin-left: 0 !important;
        list-style: none;
        margin: 0;
        font-size: 12px;
    }

    .principle_list li {
        letter-spacing: 1px;
    }

    .recommend_item {
        margin: 16px 0;
    }

    .recommend_item_title p {
        text-align: center;
        color: #006600;
    }

    .recommend_item_title img {
        width: 100%;
        height: 120px;
    }

    .sports_plan {
        padding: 0 15px;
    }

    .be_careful {
        padding: 0 15px;
    }

    .sports_plan p, .be_careful p {
        margin: 0;
        font-size: 12px;
    }

    .sports_plan div, .be_careful div {
        font-size: 14px;
        font-weight: 600;
    }

    .sports_plan, .be_careful {
        margin-top: 16px;
    }

    ol, ul {
        padding-left: 0em;
    }

</style>

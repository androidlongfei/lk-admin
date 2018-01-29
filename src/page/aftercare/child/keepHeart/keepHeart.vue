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
                    <dl>
                        <dt>自我调节</dt>
                        <dd style="font-size: 16px;" id="heart_self" v-html="this.renderData.states.content"></dd>
                    </dl>
                    <hr/>
                    <div class="list">
                        <div class="list_item" v-for="(item, index) in this.renderData.recommendKeepHeart.list"
                             :key="index">
                            <p class="center" style="margin: 20px 0">{{item.itemTitle}}</p>
                            <div class="gray_bg">
                                <img :src="item.itemImg"/>
                                <p class="p15" v-html="item.itemValue"></p>
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
                type: type.GET_KEEPHEART_DATA,
                payload: this.sendData
            });
        },
        computed: {
            ...mapGetters(['keepHeartLoading', 'keepHeartData', 'keepHeartRequestStatus'])
        },
        watch: {
            keepHeartLoading(loading) {
                // console.log('keepHeartLoading', loading)
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.firstLoad = false
                    // console.log(this.firstLoad)
                    this.$layer.close()
                    let keepHeartRequestStatus = this.$store.getters.keepHeartRequestStatus
                    if (keepHeartRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(keepHeartRequestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        let keepHeartData = this.$store.getters.keepHeartData
                        // console.log('keepHeartData', this.keepHeartData)
                        this.testData = keepHeartData
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
                    headerTitle: '心养'
                },
                renderData: {
                    title: '',
                    states: {
                        title: '',
                        list: [],
                        content: ''
                    },
                    recommendKeepHeart: {
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
                    type: type.GET_KEEPHEART_DATA,
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
                if (data.heart_title) {
                    var heartTitle = data.heart_title;
                    if (heartTitle.value) {
                        this.headerData.headerTitle = heartTitle.value
                    }
                }
                if (data.heart_self) {
                    var heartSelf = data.heart_self;
                    if (heartSelf.value) {
                        var reg = /#/g;
                        var heartSelfValue = heartSelf.value.replace(reg, '<br>');
                        this.renderData.states.content = heartSelfValue
                    }
                }
                if (data.heart_func) {
                    var heartFuncArr = data.heart_func;
                    for (var i = 0; i < heartFuncArr.length; i++) {
                        let heartItem = {};
                        var item = heartFuncArr[i];
                        // console.log('item', item, i)
                        if (item.heart_func_content) {
                            var heartFuncContent = item.heart_func_content;
                            if (heartFuncContent.value) {
                                let reg = /#/g;
                                let itemValue = heartFuncContent.value.replace(reg, '<br>');
                                heartItem.itemValue = itemValue
                            }
                        }
                        if (item.heart_func_img) {
                            var heartFuncImg = item.heart_func_img;
                            if (heartFuncImg.value) {
                                let itemImg = heartFuncImg.value;
                                heartItem.itemImg = itemImg
                            }
                        }
                        if (item.heart_func_title) {
                            var heartFuncTitle = item.heart_func_title;
                            if (heartFuncTitle.value) {
                                let itemTitle = heartFuncTitle.value;
                                heartItem.itemTitle = itemTitle
                            }
                        }
                        this.renderData.recommendKeepHeart.list.push(heartItem)
                    }
                    // console.log('this.renderData.recommendKeepHeart.list', this.renderData.recommendKeepHeart.list)
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
    hr {
        display: block;
        padding: 0;
        border: 0;
        height: 0;
        border-top: 1px solid #eee;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
    }
    body {
        width: 100%;
        height: 100%;
        background: #E4E4E4;
    }

    #wrapper {
        background: #fff;
        /*margin: 5px;*/
        padding: 10px;
        text-align: left;
    }

    .center {
        text-align: center;
    }

    img {
        width: 100%;
        height: 120px;
    }

    .p15 {
        padding: 15px;
    }

    .gray_bg {
        /*background: #E4E4E4;*/
        box-shadow: 0px 1px 3px gainsboro;
        text-align: left;
    }

</style>

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
                <div id="list_wapper">
                    <div class="list">
                        <div class="list_item" v-for="(item,index) in this.renderData.list" :key="index"
                             @click="hopRouting(item)">
                            <div class="img">
                                <img :src="item.img" alt="" class="lazyload"/>
                            </div>
                            <div class="content">
                                <p class="title">{{item.title}}</p>
                                <p class="word">{{item.desc}}</p>
                            </div>
                        </div>
                    </div>
                    <x-button text="预定餐食" type="warn" @click.native="toUrl()" v-if="this.tenantId==='900001'"></x-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        XHeader,
        XButton
    } from 'vux'
    import * as type from './module/mutations_types'
    import {
        mapGetters
    } from 'vuex'

    export default {
        watch: {
            aftercareLoading(loading) {
                // console.log('aftercareLoading', loading)
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.firstLoad = false
                    // console.log(this.firstLoad)
                    this.$layer.close()
                    let aftercareRequestStatus = this.$store.getters.aftercareRequestStatus
                    if (aftercareRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(aftercareRequestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        this.tenantId = this.$store.getters.aftercareData.tenantId
                        this.tenantId = '测试'
                        console.log('tenantId', this.tenantId)
                        this.testData = this.$store.getters.aftercareData.data
                        this.assemblyData(this.testData)
                    }
                }
            }
        },
        mounted() {
            this.sendData.diseaseCode = this.$route.query.diseaseCode
            this.$store.dispatch({
                type: type.GET_AFTERCARE_DATA,
                payload: this.sendData
            });
        },
        computed: {
            ...mapGetters(['aftercareLoading', 'aftercareData', 'aftercareRequestStatus'])
        },
        components: {
            XHeader,
            XButton
        },
        data() {
            return {
                tenantId: '',
                sendData: {
                    temCode: 'WUYANG_LKJ',
                    deType: '0',
                    pageId: '0',
                    diseaseCode: ''
                },
                loadError: false,
                firstLoad: true,
                testData: {},
                headerData: {
                    headerTitle: '调养建议'
                },
                renderData: {
                    title: '',
                    list: []
                }
            }
        },
        methods: {
            toUrl() {
                window.location.href = 'https://www.ele.me/home/'
            },
            againLoad() {
                this.$store.dispatch({
                    type: type.GET_AFTERCARE_DATA,
                    payload: this.sendData
                });
            },
            hopRouting(item) {
                if (item.title === '食养') {
                    this.$router.push({
                        path: '/aftercare/foodHealth',
                        query: {
                            pageId: item.pageId,
                            diseaseCode: this.sendData.diseaseCode
                        }
                    })
                }
                if (item.title === '动养') {
                    this.$router.push({
                        path: '/aftercare/sportsHealth',
                        query: {
                            pageId: item.pageId,
                            diseaseCode: this.sendData.diseaseCode
                        }
                    })
                }
                if (item.title === '术养') {
                    this.$router.push({
                        path: '/aftercare/kungfu',
                        query: {
                            pageId: item.pageId,
                            diseaseCode: this.sendData.diseaseCode
                        }
                    })
                }
                if (item.title === '居养') {
                    this.$router.push({
                        path: '/aftercare/liveHealth',
                        query: {
                            pageId: item.pageId,
                            diseaseCode: this.sendData.diseaseCode
                        }
                    })
                }
                if (item.title === '心养') {
                    this.$router.push({
                        path: '/aftercare/keepHeart',
                        query: {
                            pageId: item.pageId,
                            diseaseCode: this.sendData.diseaseCode
                        }
                    })
                }
            },
            showLoadMsg(msg, time = 2000) {
                this.$layer.toast({
                    content: msg,
                    time: time
                })
            },
            assemblyData(data) {
                if (data.index_title) {
                    let indexTitle = data.index_title;
                    this.headerData.headerTitle = indexTitle.value;
                }
                if (data.index_dietary) {
                    let item = {
                        title: '',
                        img: '',
                        desc: ''
                    };
                    let indexDietary = data.index_dietary;
                    if (indexDietary.index_dietary_title) {
                        let indexDietaryTitle = indexDietary.index_dietary_title;
                        if (indexDietaryTitle.value) {
                            item.pageId = indexDietaryTitle.nextPageId;
                            item.title = indexDietaryTitle.value;
                        }
                    }
                    if (indexDietary.index_dietary_img) {
                        let indexDietaryImg = indexDietary.index_dietary_img;
                        if (indexDietaryImg.value) {
                            item.img = indexDietaryImg.value;
                        }
                    }
                    if (indexDietary.index_dietary_desc) {
                        let indexDietaryDesc = indexDietary.index_dietary_desc;
                        if (indexDietaryDesc.value) {
                            item.desc = indexDietaryDesc.value;
                        }
                    }
                    this.renderData.list.push(item)
                }

                if (data.index_action) {
                    let item = {
                        title: '',
                        img: '',
                        desc: ''
                    };
                    let indexAction = data.index_action
                    if (indexAction.index_action_title) {
                        let indexActionTitle = indexAction.index_action_title
                        if (indexActionTitle.value) {
                            item.pageId = indexActionTitle.nextPageId
                            item.title = indexActionTitle.value
                        }
                    }
                    if (indexAction.index_action_img) {
                        let indexActionImg = indexAction.index_action_img
                        if (indexActionImg.value) {
                            item.img = indexActionImg.value
                        }
                    }
                    if (indexAction.index_action_desc) {
                        let indexActionDesc = indexAction.index_action_desc
                        if (indexActionDesc.value) {
                            item.desc = indexActionDesc.value
                        }
                    }
                    this.renderData.list.push(item)
                }

                if (data.index_kungfu) {
                    let item = {
                        title: '',
                        img: '',
                        desc: ''
                    };
                    let indexKungfu = data.index_kungfu
                    if (indexKungfu.index_kungfu_title) {
                        let indexKungfuTitle = indexKungfu.index_kungfu_title
                        if (indexKungfuTitle.value) {
                            item.pageId = indexKungfuTitle.nextPageId
                            item.title = indexKungfuTitle.value
                        }
                    }
                    if (indexKungfu.index_kungfu_img) {
                        let indexKungfuImg = indexKungfu.index_kungfu_img
                        if (indexKungfuImg.value) {
                            item.img = indexKungfuImg.value
                        }
                    }
                    if (indexKungfu.index_kungfu_desc) {
                        let indexKungfuDesc = indexKungfu.index_kungfu_desc
                        if (indexKungfuDesc.value) {
                            item.desc = indexKungfuDesc.value
                        }
                    }
                    this.renderData.list.push(item)
                }
                if (data.index_heart) {
                    let item = {
                        title: '',
                        img: '',
                        desc: ''
                    };
                    let indexHeart = data.index_heart
                    if (indexHeart.index_heart_title) {
                        let indexHeartTitle = indexHeart.index_heart_title
                        if (indexHeartTitle.value) {
                            item.pageId = indexHeartTitle.nextPageId
                            item.title = indexHeartTitle.value
                        }
                    }
                    if (indexHeart.index_heart_img) {
                        let indexHeartImg = indexHeart.index_heart_img
                        if (indexHeartImg.value) {
                            item.img = indexHeartImg.value
                        }
                    }
                    if (indexHeart.index_heart_desc) {
                        let indexHeartDesc = indexHeart.index_heart_desc
                        if (indexHeartDesc.value) {
                            item.desc = indexHeartDesc.value
                        }
                    }
                    this.renderData.list.push(item)
                }
                if (data.index_house) {
                    let item = {
                        title: '',
                        img: '',
                        desc: ''
                    };
                    let indexHouse = data.index_house
                    if (indexHouse.index_house_title) {
                        let indexHouseTitle = indexHouse.index_house_title
                        if (indexHouseTitle.value) {
                            item.pageId = indexHouseTitle.nextPageId
                            item.title = indexHouseTitle.value
                        }
                    }
                    if (indexHouse.index_house_img) {
                        let indexHouseImg = indexHouse.index_house_img
                        if (indexHouseImg.value) {
                            item.img = indexHouseImg.value
                        }
                    }
                    if (indexHouse.index_house_desc) {
                        let indexHouseDesc = indexHouse.index_house_desc
                        if (indexHouseDesc.value) {
                            item.desc = indexHouseDesc.value
                        }
                    }
                    this.renderData.list.push(item)
                }
            }
        }
    }
</script>

<style lang="css" scoped>
    /*@import "../../style/amazeui/css/amazeui.min.css";*/

    body {
        width: 100%;
        height: 100%;
        background: #E4E4E4;
    }

    #list_wapper {
        margin: 5px;
        text-align: left;
    }

    p {
        margin: 0;
    }

    .list .list_item {
        display: flex;
        padding: 10px 0 10px 10px;
        background: #fff;
        margin-bottom: 5px;
        border-bottom: 1px solid silver;
    }

    .list .list_item .img {
        width: 146px;
        height: 130px;
    }

    .list .list_item .content {
        width: 60%;
    }

    .list .list_item .content .title {
        font-weight: 700;
        font-size: 16px;
    }

    .list .list_item .content p {
        margin-left: 10px;

    }

    .list .list_item .img img {
        width: 100%;
        height: 100%;
    }

    .list .list_item .content .word {
        font-size: 16px;
        padding: 5px 0;
        word-break: break-word;
        line-height: 18px;
        text-align: left;
    }

    .title {
        padding-bottom: 5px;
        border-bottom: 1px solid #D4D4D4;
    }

</style>

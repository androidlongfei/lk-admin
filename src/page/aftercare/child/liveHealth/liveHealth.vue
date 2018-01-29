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
                    <div class="wrapper_item" v-for="(items, index) in this.renderData.recommend.list" :key="index">
                        <div style="text-align: center;font-weight: 700;margin: 10px;">{{items.title}}</div>
                        <div class="list">
                            <dl class="list_item">
                                <div class="imgBox">
                                    <img :src="items.envBogeyImg" style="height: 120px;width: 100%;"/>
                                </div>
                                <dt style="letter-spacing: 5px;color: #006600;margin: 15px 0;"><span>{{items.shoudTitle}}</span>
                                    <star :score="items.shoudStar"></star>
                                </dt>
                                <dd>
                                    <ol>
                                        <li v-for="(item, index) in items.shoudContent" :key="index" v-html="item"></li>
                                    </ol>
                                </dd>
                            </dl>
                            <dl class="list_item">
                                <dt style="letter-spacing: 5px;color: red;margin: 15px 0;">
                                    <span>{{items.bogeyTitle}}</span>
                                    <star :score="items.bogeyStar"></star>
                                </dt>
                                <dd>
                                    <ol>
                                        <li v-for="(item, index) in items.bogeyContent" :key="index" v-html="item"></li>
                                    </ol>
                                </dd>
                            </dl>
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
    import Star from '../../../../components/star'

    export default {
        mounted() {
            this.sendData.diseaseCode = this.$route.query.diseaseCode
            this.sendData.pageId = this.$route.query.pageId
            this.$store.dispatch({
                type: type.GET_LIVEHEALTH_DATA,
                payload: this.sendData
            });
        },
        computed: {
            ...mapGetters(['liveHealthLoading', 'liveHealthData', 'liveHealthRequestStatus'])
        },
        watch: {
            liveHealthLoading(loading) {
                // console.log('liveHealthLoading', loading)
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.firstLoad = false
                    // console.log(this.firstLoad)
                    this.$layer.close()
                    let liveHealthRequestStatus = this.$store.getters.liveHealthRequestStatus
                    if (liveHealthRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(liveHealthRequestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        let liveHealthData = this.$store.getters.liveHealthData
                        // console.log('liveHealthData', this.liveHealthData)
                        this.testData = liveHealthData
                        this.assemblyData(this.testData)
                    }
                }
            }
        },
        components: {
            XHeader,
            HeaderTitle,
            Star
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
                    headerTitle: '居养'
                },
                renderData: {
                    title: '',
                    states: {
                        title: '',
                        list: [],
                        content: ''
                    },
                    recommend: {
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
                    type: type.GET_LIVEHEALTH_DATA,
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
                if (data.house_title) {
                    let houseTitle = data.house_title;
                    if (houseTitle.value) {
                        this.headerData.headerTitle = houseTitle.value
                    }
                }
                if (data.house_env) {
                    let houseEnv = data.house_env
                    let houseBogeyContentArr = []
                    let houseBogeyStar = ''
                    let houseBogeyTitle = ''
                    let houseEnvBogeyImg = ''
                    let houseShoudContentArr = []
                    let houseShoudStar = ''
                    let houseShoudTitle = ''
                    let houseEnvShoudImg = ''
                    if (houseEnv.house_env_bogey) {
                        let houseEnvBogey = houseEnv.house_env_bogey
                        if (houseEnvBogey.house_bogey_content) {
                            let houseBogeyContent = houseEnvBogey.house_bogey_content
                            for (let i = 0; i < houseBogeyContent.length; i++) {
                                houseBogeyContentArr.push(houseBogeyContent[i].house_bogey_content.value)
                            }
                        }
                        if (houseEnvBogey.house_bogey_star) {
                            houseBogeyStar = houseEnvBogey.house_bogey_star
                        }
                        if (houseEnvBogey.house_bogey_title) {
                            houseBogeyTitle = houseEnvBogey.house_bogey_title
                        }
                        if (houseEnvBogey.house_env_bogey_img) {
                            houseEnvBogeyImg = houseEnvBogey.house_env_bogey_img.value
                            if (houseEnvBogeyImg === 'No File ...') {
                                houseEnvBogeyImg = ''
                            }
                        }
                        if (houseEnv.house_env_shoud) {
                            let houseEnvShoud = houseEnv.house_env_shoud
                            if (houseEnvShoud.house_env_shoud_content) {
                                let houseShoudContent = houseEnvShoud.house_env_shoud_content
                                houseShoudContentArr = []
                                for (let i = 0; i < houseShoudContent.length; i++) {
                                    houseShoudContentArr.push(houseShoudContent[i].house_env_shoud_content.value)
                                }
                            }
                            if (houseEnvShoud.house_env_shoud_star) {
                                houseShoudStar = houseEnvShoud.house_env_shoud_star
                            }
                            if (houseEnvShoud.house_env_shoud_title) {
                                houseShoudTitle = houseEnvShoud.house_env_shoud_title
                            }
                            if (houseEnvShoud.house_env_shoud_img) {
                                houseEnvShoudImg = houseEnvShoud.house_env_shoud_img.value;
                                if (houseEnvShoudImg === 'No File ...') {
                                    houseEnvShoudImg = ''
                                }
                            }
                        }
                        var houseEnvObj = {
                            bogeyContent: houseBogeyContentArr,
                            bogeyStar: houseBogeyStar.value,
                            bogeyTitle: houseBogeyTitle.value,
                            envBogeyImg: houseEnvBogeyImg,
                            shoudContent: houseShoudContentArr,
                            shoudStar: houseShoudStar.value,
                            shoudTitle: houseShoudTitle.value,
                            title: '环境'
                        };
                        this.renderData.recommend.list.push(houseEnvObj);
                    }
                }
                // 衣着
                if (data.house_clothing) {
                    let houseClothing = data.house_clothing
                    let houseClothingBogeyContentArr = []
                    let houseClothingBogeyStar = ''
                    let houseClothingBogeyTitle = ''
                    let houseClothingBogeyImg = ''
                    let houseClothingShoudContentArr = []
                    let houseClothingShoudStar = ''
                    let houseClothingShoudTitle = ''
                    let houseClothingShoudImg = ''
                    if (houseClothing.house_clothing_bogey) {
                        let houseClothingBogey = houseClothing.house_clothing_bogey
                        if (houseClothingBogey.house_clothing_bogey_content) {
                            let houseClothingBogeyContent = houseClothingBogey.house_clothing_bogey_content
                            houseClothingBogeyContentArr = []
                            for (let i = 0; i < houseClothingBogeyContent.length; i++) {
                                houseClothingBogeyContentArr.push(houseClothingBogeyContent[i].house_clothing_bogey_content.value)
                            }
                        }
                        if (houseClothingBogey.house_clothing_bogey_star) {
                            houseClothingBogeyStar = houseClothingBogey.house_clothing_bogey_star
                        }
                        if (houseClothingBogey.house_clothing_bogey_title) {
                            houseClothingBogeyTitle = houseClothingBogey.house_clothing_bogey_title
                        }
                        if (houseClothingBogey.house_clothing_bogey_img) {
                            houseClothingBogeyImg = houseClothingBogey.house_clothing_bogey_img.value
                            if (houseClothingBogeyImg === 'No File ...') {
                                houseClothingBogeyImg = ''
                            }
                        }
                    }
                    if (houseClothing.house_clothing_shoud) {
                        let houseClothingShoud = houseClothing.house_clothing_shoud
                        if (houseClothingShoud.house_clothing_shoud_content) {
                            let houseClothingShoudContent = houseClothingShoud.house_clothing_shoud_content
                            houseClothingShoudContentArr = []
                            for (let i = 0; i < houseClothingShoudContent.length; i++) {
                                houseClothingShoudContentArr.push(houseClothingShoudContent[i].house_clothing_shoud_content.value)
                            }
                        }
                        if (houseClothingShoud.house_clothing_shoud_star) {
                            houseClothingShoudStar = houseClothingShoud.house_clothing_shoud_star
                        }
                        if (houseClothingShoud.house_clothing_shoud_title) {
                            houseClothingShoudTitle = houseClothingShoud.house_clothing_shoud_title
                        }
                        if (houseClothingShoud.house_clothing_shoud_img) {
                            houseClothingShoudImg = houseClothingShoud.house_clothing_shoud_img.value
                            if (houseClothingShoudImg === 'No File ...') {
                                houseClothingShoudImg = ''
                            }
                        }
                    }
                    let houseEenvObj = {
                        bogeyContent: houseClothingBogeyContentArr,
                        bogeyStar: houseClothingBogeyStar.value,
                        bogeyTitle: houseClothingBogeyTitle.value,
                        envBogeyImg: houseClothingBogeyImg,
                        shoudContent: houseClothingShoudContentArr,
                        shoudStar: houseClothingShoudStar.value,
                        shoudTitle: houseClothingShoudTitle.value,
                        title: '衣着'
                    }
                    this.renderData.recommend.list.push(houseEenvObj);
                }
                if (data.house_living) {
                    let houseLivingBogeyContentArr = []
                    let houseLivingBogeyStar = ''
                    let houseLivingBogeyTitle = ''
                    let houseLivingBogeyImg = ''
                    let houseLivingShoudContentArr = []
                    let houseLivingShoudStar = ''
                    let houseLivingShoudTitle = ''
                    let houseLivingShoudImg = ''
                    let houseLiving = data.house_living
                    if (houseLiving.house_living_bogey) {
                        let houseLivingBogey = houseLiving.house_living_bogey
                        if (houseLivingBogey.house_living_bogey_content) {
                            let houseLivingBogeyContent = houseLivingBogey.house_living_bogey_content
                            houseLivingBogeyContentArr = []
                            for (let i = 0; i < houseLivingBogeyContent.length; i++) {
                                houseLivingBogeyContentArr.push(houseLivingBogeyContent[i].house_living_bogey_content.value)
                            }
                        }
                        if (houseLivingBogey.house_living_bogey_star) {
                            houseLivingBogeyStar = houseLivingBogey.house_living_bogey_star
                        }
                        if (houseLivingBogey.house_living_bogey_title) {
                            houseLivingBogeyTitle = houseLivingBogey.house_living_bogey_title
                        }
                        if (houseLivingBogey.house_living_bogey_img) {
                            houseLivingBogeyImg = houseLivingBogey.house_living_bogey_img.value
                            if (houseLivingBogeyImg === 'No File ...') {
                                houseLivingBogeyImg = ''
                            }
                        }
                    }
                    if (houseLiving.house_living_shoud) {
                        let houseLivingShoud = houseLiving.house_living_shoud
                        if (houseLivingShoud.house_living_shoud_content) {
                            let houseLivingShoudContent = houseLivingShoud.house_living_shoud_content
                            for (let i = 0; i < houseLivingShoudContent.length; i++) {
                                houseLivingShoudContentArr.push(houseLivingShoudContent[i].house_living_shoud_content.value)
                            }
                        }
                        if (houseLivingShoud.house_living_shoud_star) {
                            houseLivingShoudStar = houseLivingShoud.house_living_shoud_star
                        }
                        if (houseLivingShoud.house_living_shoud_title) {
                            houseLivingShoudTitle = houseLivingShoud.house_living_shoud_title
                        }
                        if (houseLivingShoud.house_living_shoud_img) {
                            houseLivingShoudImg = houseLivingShoud.house_living_shoud_img.value
                            if (houseLivingShoudImg === 'No File ...') {
                                houseLivingShoudImg = ''
                            }
                        }
                    }
                    let houseEenvObj = {
                        bogeyContent: houseLivingBogeyContentArr,
                        bogeyStar: houseLivingBogeyStar.value,
                        bogeyTitle: houseLivingBogeyTitle.value,
                        envBogeyImg: houseLivingBogeyImg,
                        shoudContent: houseLivingShoudContentArr,
                        shoudStar: houseLivingShoudStar.value,
                        shoudTitle: houseLivingShoudTitle.value,
                        title: '起居'
                    }
                    this.renderData.recommend.list.push(houseEenvObj);
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

    ol {
        padding-left: 1em;
        font-size: 12px;
    }

    #wrapper {
        background: #fff;
        margin: 5px;
        padding: 10px;
        text-align: left;
    }

    .list_item dt {

    }

    .list_item dd li {
        margin: 10px 0;
    }

    .list_item dd img {
        width: 100%;
        text-align: center;
    }

    .imgBox {
        text-align: center;
        width: 100%;
    }

    .list_item dd p {
        font-size: 12px;
    }

    .list {
        width: 90%;
        margin: 0 auto;
        box-shadow: 0 1px 3px gainsboro;
        padding: 5px;
        text-align: left;
        /*border: 1px solid black;*/
    }

    li {
        list-style: none;
    }

</style>

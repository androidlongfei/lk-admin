<template>
    <div class="medicalRecord">
        <custom-header :headerData="headerData" style="position: fixed;z-index: 1000;top: 0px;left: 0;right: 0;"></custom-header>
        <div v-if="this.loadError">
            <keep-alive>
                <reload-page :reload="this.againLoad"></reload-page>
            </keep-alive>
        </div>
        <div v-else>
            <scroller class="my-scroller" ref="myScroller"
                      :on-infinite="infinite"
                      :on-refresh="refresh"
            >
                <group title="体检报告所属人" label-width="5.5em" label-margin-right="1em" label-align="left">
                    <x-input readonly="readonly" title="姓名" name="username" placeholder=""
                             :value="this.user.userName"></x-input>
                    <x-input readonly="readonly" title="性别" name="sex" placeholder="" :value="this.user.gender"></x-input>
                </group>
                <div style="padding:0 15px;font-size: 14px;line-height: 40px;text-align: center;color: #999999;">
                    体检记录列表
                </div>
                <div style="background-color: #FFFFFF;text-align: left;padding: 0 15px;">
                    <div style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;">
                        <div style="width:30%;font-size: 16px;color: #000000;text-align: center;">时间</div>
                        <div style="width:35%;font-size: 16px;color: #000000;text-align: center;">地点</div>
                        <div style="width:35%;font-size: 16px;color: #4a4a4a;text-align: center;">名称</div>
                    </div>
                </div>
                <div v-if="list.length">
                    <ul>
                        <li style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;padding:0px 15px;"
                             v-for="(item, index) in list"
                             @click="medicalRecordItemClick(item)"
                        >
                            <p style="width:30%;font-size: 13px;color: #000000;text-align: center;">
                                {{conversionTime(item.reportDate)}}
                            </p>
                            <p style="width:35%;font-size: 14px;color: #9b9b9b;text-align: center;word-wrap:break-word;">{{item.reportAdress}}</p>
                            <p style="width:35%;font-size: 14px;color: #4a4a4a;text-align: center;word-wrap:break-word;">
                                {{item.reportName}}
                            </p>
                        </li>
                    </ul>
                    <ul>
                        <li style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;padding:0px 15px;"
                            v-show="moreList.length"
                            v-for="(item, index) in moreList"
                            @click="medicalRecordItemClick(item)"
                        >
                            <p style="width:30%;font-size: 16px;color: #000000;text-align: center;">
                                {{conversionTime(item.reportDate)}}
                            </p>
                            <p style="width:35%;font-size: 16px;color: #9b9b9b;text-align: center;word-wrap:break-word; ">{{item.reportAdress}}</p>
                            <p style="width:35%;font-size: 16px;color: #4a4a4a;text-align: center;word-wrap:break-word; ">{{item.reportName}}</p>
                        </li>

                    </ul>
                </div>
                <div v-else style="margin-top: 20px;">暂时没有数据，请添加数据!!</div>
            </scroller>
        </div>
    </div>
</template>
<script>
    import storage from '../../config/storageHelp'
    //  import * as type from './module/mutations_types'
    import moment from 'moment'
    import { XHeader, Group, XInput } from 'vux'
    import { getMedicalRecord } from '../../service/medicalRecord'
    // let firstLoaded = false
    // let moreLoaded = true
    export default {
        data () {
            return {
                list: [],
                moreList: [],
                totalPage: 1,
                page: 1,
                mescroll: null,
                firstLoaded: false,
                moreLoaded: true,
                noData: false,
                headerData: {
                    headerTitle: '体检记录列表',
                    routerTitle: '添加体检记录',
                    routerPath: '/addMedicalRecord'
                },
                loadError: false,
                firstLoadStatus: true,
                user: {
                    userName: '',
                    gender: ''
                }
            }
        },
        components: {
            XHeader, Group, XInput
        },
        methods: {
            conversionTime (time) {
                return moment(time).format('YYYY/MM/DD')
            },
            showLoadMsg(msg, time = 2000) {
                this.$layer.toast({
                    content: msg,
                    time: time
                })
            },
            medicalRecordItemClick (item) {
                this.$router.push({
                    path: '/medicalRecordDetail',
                    query: {
                        checkType: item.checkType,
                        seqNo: item.seqNo,
                        reportName: item.reportName
                    }
                })
            },
            refresh (done) {
                console.log('刷新了')
                setTimeout(() => {
                    this.$refs.myScroller.finishPullToRefresh()
                }, 50)
            },
            infinite (done) {
                //  let self = this
                console.log('上滑加载更多')
                console.log('page的值', this.page)
                console.log('totalPage的值', this.totalPage)
                if (!this.firstLoaded) {
                    this.$refs.myScroller.finishInfinite();
                    return false
                }
                if (!this.moreLoaded) {
                    return false
                }
                if (this.totalPage <= this.page) {
                    setTimeout(() => {
                        done(true)
                    }, 50)
                } else {
                    this.page++
                    getMedicalRecord({currentPage: this.page, pageSize: 10}).then(res => {
                        console.log('page的值是', this.page)
                        if (res.status === '1') {
                            let dataList = res.data.dataList
                            this.moreList = this.moreList.concat(dataList)
                            this.moreLoaded = true
                            this.$refs.myScroller.finishInfinite(true)
                        } else {
                            this.page--
                        }
                    }).catch((ex) => {
                        console.log(ex, 'ex是什么啊')
                    })
                }
            }
        },
        watch: {
            loadingMedicalRecordList (loading) {
                if (loading) {
                    this.$layer.loading('加载中...')
                    this.firstLoadStatus = true
                } else {
                    this.$layer.close()
                    this.firstLoadStatus = false
                    let requestStatus = this.$store.getters.medicalRecordLisRequestStatus
                    if (requestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(requestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        // console.log('allIndicatorsData', JSON.stringify(allIndicatorsData))
                    }
                }
            }
        },
        mounted () {
            this.user.userName = storage.userName
            this.user.gender = storage.gender
            getMedicalRecord({currentPage: this.page, pageSize: 10}).then(res => {
                if (res.status === '1') {
                    console.log(res, 'GET_MEDICALRECORD_DATA获取成功')
                    this.list = res.data.dataList
                    this.totalPage = parseInt(res.data.totalPages)
                    this.firstLoaded = true
                } else {
                }
            }).catch((ex) => {
                console.log('错误信息', ex)
            })
        }
    }
</script>
<style lang="scss" scoped>@import "./reset.css";
    .medicalRecord {
        background-color: #EFEFF4;
        .loading-layer {
            padding-bottom: 40px;
        }
    }

    .health_title {
        padding: 0px 15px;
        text-align: left;
        background-color: #FFFFFF;
        display: flex;
        line-height: 60px;
        justify-content: space-between;

        p {
            font-size: 22px;
            color: #4a4a4a;
        }
    }


    body,
    html {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    #app {
        height: 100%;
        .my-scroller {
            top: 46px;
        }
    }
    .no-data-text {
        height: 40px;
    }
    /*#app .loading-layer {
        padding-bottom: 80px;
    }*/
    ._v-container > ._v-content > .loading-layer[data-v-ecaca2b0] {
        position: absolute;
    }
</style>
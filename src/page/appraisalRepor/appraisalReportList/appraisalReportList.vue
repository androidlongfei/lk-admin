<template>
<div class="appraisalReportList">
    <custom-header :headerData="this.headerData"></custom-header>
    <group title="评估报告所属人" label-width="5.5em" label-margin-right="1em" label-align="left">
        <x-input readonly="readonly" title="姓名" name="username" placeholder="" :value="this.user.userName"></x-input>
        <x-input readonly="readonly" title="性别" name="sex" placeholder="" :value="this.user.gender"></x-input>
    </group>

    <group title="评估报告列表">
        <tab>
            <tab-item selected @on-item-click="onItemClick">内部列表</tab-item>
            <tab-item @on-item-click="onItemClick">外部列表</tab-item>
        </tab>
        <!-- 外部报告列表 -->
        <div v-if="this.reportIndex === 1">
            <div style="background-color: #FFFFFF;text-align: left;padding: 0 15px;height:300px;">
                <div style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;">
                    <div style="width: 30%;font-size: 16px;color: #000000;text-align: center;">时间</div>
                    <div style="width:35%;font-size: 16px;color: #000000;text-align: center;">地点</div>
                    <div style="width:35%;font-size: 16px;color: #4a4a4a;text-align: center;">名称</div>
                </div>
                <scroller style="margin-top:80px;" :on-refresh="refresh" :on-infinite="infinite" ref="scrollerExternal">
                    <div style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;padding: 0 15px" v-for="(reportItem,index) in this.externalReportList" @click="reportItemClick(reportItem)">
                        <div style="width:30%;font-size: 16px;color: #000000;text-align: center;">
                            {{conversionReportTime(reportItem.reportDate)}}
                        </div>
                        <div style="width:35%;word-wrap:break-word;font-size: 16px;color: #9b9b9b;text-align: center;">{{reportItem.reportAdress}}</div>
                        <div style="width:35%;word-wrap:break-word;font-size: 16px;color: #4a4a4a;text-align: center;">
                            {{reportItem.reportName}}
                        </div>
                    </div>
                </scroller>
            </div>
        </div>
        <!-- 内部报告列表 -->
        <div v-else-if="this.reportIndex === 0">

            <div style="background-color: #FFFFFF;text-align: left;padding: 0 15px;height:300px;">
                <div style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;">
                    <div style="width: 30%;font-size: 16px;color: #000000;text-align: center;">时间</div>
                    <div style="width:35%;font-size: 16px;color: #000000;text-align: center;">地点</div>
                    <div style="width:35%;font-size: 16px;color: #4a4a4a;text-align: center;">名称</div>
                </div>
                <scroller style="margin-top:80px;" :on-refresh="refresh" :on-infinite="infinite" ref="scrollerInternal">
                    <div style="display: flex;line-height: 30px;border-bottom: 1px solid #EFEFF4;padding: 0 15px" v-for="(reportItem,index) in this.internalReportList" @click="reportItemClick(reportItem)">
                        <div style="width: 30%;font-size: 16px;color: #000000;text-align: center;">
                            {{conversionReportTime(reportItem.reportDate)}}
                        </div>
                        <div style="width:35%;word-wrap:break-word;font-size: 16px;color: #9b9b9b;text-align: center;">{{reportItem.reportAdress}}</div>
                        <div style="width:35%;word-wrap:break-word;font-size: 16px;color: #4a4a4a;text-align: center;">
                            {{reportItem.reportName}}
                        </div>
                    </div>
                </scroller>
            </div>

        </div>

    </group>
</div>
</template>
<script>
import {
    XHeader,
    XInput,
    Group,
    Tab,
    TabItem
} from 'vux'
import {
    mapGetters
} from 'vuex'
import * as type from './module/mutations_types'
import moment from 'moment'
import storage from '../../../config/storageHelp'
import CustomHeader from '../../../components/CustomHeader'
// import _ from 'lodash'
import concat from 'lodash/concat'

export default {
    data() {
        return {
            user: {
                userName: '',
                gender: ''
            },
            externalReportList: [], // 外部
            internalReportList: [], // 内部
            reportIndex: 0,
            currentReportIndex: 0,
            externalReportTotalPage: 0,
            internalReportTotalPage: 0,
            internalReportListCurrentPage: 1,
            externalReportListCurrentPage: 1,
            internalHasNext: true,
            externalHasNext: true,
            pageSize: 20,
            firstLoadStatus: false,
            loadError: false,
            headerData: {
                headerTitle: '评估报告',
                routerTitle: '添加外部评估报告',
                routerPath: '/appraisalRepor/addExternalappraisalReport'
            }
        }
    },
    computed: {
        ...mapGetters(['getExternalReportListLoading', 'getInternalReportListLoading', 'getMoreExternalReportListLoading', 'getMoreInternalReportListLoading'])
    },
    methods: {
        refresh(done) {
            // done()
            if (this.reportIndex === 0) {
                // 内部列表
                // console.log('下拉刷新--内部列表')
                this.internalReportTotalPage = 0
                this.internalReportListCurrentPage = 1
                this.pagingLoadInternalReportList(this.internalReportListCurrentPage, type.GET_INTERNAL_REPORT_LIST)
                // done()
            } else if (this.reportIndex === 1) {
                // 外部列表
                // console.log('下拉刷新--外部列表')
                this.externalReportTotalPage = 0
                this.externalReportListCurrentPage = 1
                this.pagingLoadExternalReportList(this.externalReportListCurrentPage, type.GET_EXTERNAL_REPORT_LIST)
                // done()
            }
        },
        infinite(done) {
            if (this.reportIndex === 0) {
                // 内部列表
                console.log('上拉加载--内部列表', this.internalReportListCurrentPage)
                if (this.internalHasNext) {
                    this.pagingLoadInternalReportList(this.internalReportListCurrentPage, type.GET_MORE_INTERNAL_REPORT_LIST)
                } else {
                    done(true)
                }
            } else if (this.reportIndex === 1) {
                // 外部列表
                console.log('上拉加载--外部列表', this.externalReportListCurrentPage)
                if (this.externalHasNext) {
                    this.pagingLoadExternalReportList(this.externalReportListCurrentPage, type.GET_MORE_EXTERNAL_REPORT_LIST)
                } else {
                    done(true)
                }
            }
        },
        setExternalStatus(status) {
            // 外部列表是否有下一页
            if (this.$refs.scrollerExternal) {
                // status=false 表示有下一页
                // status=true 表示没有下一页
                this.$refs.scrollerExternal.finishInfinite(status)
            }
        },
        setInternalStatus(status) {
            // 内部列表是否有下一页
            if (this.$refs.scrollerInternal) {
                // status=false 表示有下一页
                // status=true 表示没有下一页
                this.$refs.scrollerInternal.finishInfinite(status)
            }
        },
        onItemClick(index) {
            // console.log('on item click:', index)
            this.currentReportIndex = index
            if (index === 1) {
                // 外部列表
                if (this.externalReportList.length > 0) {
                    this.reportIndex = this.currentReportIndex
                } else {
                    this.pagingLoadExternalReportList(1, type.GET_EXTERNAL_REPORT_LIST)
                }
            } else {
                // 内部列表
                if (this.internalReportList.length > 0) {
                    this.reportIndex = this.currentReportIndex
                } else {
                    this.pagingLoadInternalReportList(1, type.GET_INTERNAL_REPORT_LIST)
                }
            }
        },
        againLoad() {
            // 重新加载
        },
        pagingLoadExternalReportList(currentPage, actionType) {
            this.$store.dispatch({
                type: actionType,
                payload: {
                    currentPage: currentPage,
                    pageSize: this.pageSize
                }
            })
        },
        pagingLoadInternalReportList(currentPage, actionType) {
            this.$store.dispatch({
                type: actionType,
                payload: {
                    currentPage: currentPage,
                    pageSize: this.pageSize
                }
            })
        },
        conversionReportTime(time) {
            if (time) {
                return moment(time).format('YYYY/MM/DD')
            }
            return ''
        },
        reportItemClick(reportItem) {
            console.log('reportItem click', reportItem)
            if (reportItem.reportType === '1') {
                // 内部评估报告
                // console.log('checkType', reportItem)
                if (reportItem.checkType === 'WESTERN') {
                    this.$router.push({
                        path: '/westernMedicine',
                        query: {
                            checkType: reportItem.checkType,
                            seqNo: reportItem.seqNo,
                            reportName: reportItem.reportName
                        }
                    })
                } else if (reportItem.checkType === 'FACE_TONGUE') {
                    this.$router.push({
                        path: '/chineseMedicine',
                        query: {
                            checkType: reportItem.checkType,
                            seqNo: reportItem.seqNo,
                            reportName: reportItem.reportName
                        }
                    })
                }
            } else if (reportItem.reportType === '2') {
                // 外部评估报告
                // console.log('checkType', reportItem)
                this.$router.push({
                    path: '/appraisalRepor/appraisalReportList/externalDetails',
                    query: {
                        seqNo: reportItem.seqNo,
                        reportName: reportItem.reportName
                    }
                })
            } else {
                console.log('reportType 不存在', reportItem.reportType)
            }
        }
    },
    mounted() {
        this.user.userName = storage.userName
        this.user.gender = storage.gender
        // console.log('storage.userName', storage.userName)
        // console.log('storage.gender', storage.gender)
        let routerParams = this.$route.query
        console.log('routerParams', routerParams);
        if (routerParams && routerParams.reportIndex) {
            // this.reportIndex = routerParams.reportIndex
            // this.currentReportIndex = routerParams.reportIndex
        }
        // this.againLoad()
    },
    watch: {
        // 外部列表首次加载
        getExternalReportListLoading(loading) {
            // console.log('getExternalReportListLoading', loading)
            if (loading) {
                // this.$layer.loading('加载中...')
                // this.firstLoadStatus = true
            } else {
                this.$layer.close()
                this.reportIndex = this.currentReportIndex
                let reportListRequestStatus = this.$store.getters.reportListRequestStatus
                if (reportListRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(reportListRequestStatus.msg)
                    this.externalHasNext = true
                } else {
                    // 获取数据成功
                    this.externalReportTotalPage = this.$store.getters.externalReportListTotalPage
                    if (this.externalReportListCurrentPage < this.externalReportTotalPage) {
                        this.externalHasNext = true
                        console.log('有下一页', this.externalReportListCurrentPage, this.externalReportTotalPage)
                        this.externalReportListCurrentPage = this.externalReportListCurrentPage + 1
                        this.setExternalStatus(false)
                    } else {
                        this.externalHasNext = false
                        console.log('没有下一页', this.externalReportListCurrentPage, this.externalReportTotalPage)
                        this.setExternalStatus(true)
                    }
                    let externalReportListData = this.$store.getters.externalReportListData
                    if (externalReportListData && externalReportListData.length > 0) {
                        this.externalReportList = externalReportListData
                    }
                }
                if (this.$refs.scrollerExternal) {
                    this.$refs.scrollerExternal.finishPullToRefresh()
                }
            }
        },
        // 外部列表加载更多
        getMoreExternalReportListLoading(loading) {
            // console.log('getExternalReportListLoading', loading)
            if (loading) {
                // this.$layer.loading('加载中...')
            } else {
                // this.$layer.close()
                let reportListRequestStatus = this.$store.getters.reportListRequestStatus
                if (reportListRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(reportListRequestStatus.msg)
                    this.externalHasNext = true
                    this.setExternalStatus(false)
                } else {
                    // 获取数据成功
                    if (this.externalReportListCurrentPage < this.externalReportTotalPage) {
                        this.externalHasNext = true
                        console.log('有下一页', this.externalReportListCurrentPage, this.externalReportTotalPage)
                        this.externalReportListCurrentPage = this.externalReportListCurrentPage + 1
                        this.setExternalStatus(false)
                    } else {
                        this.externalHasNext = false
                        console.log('没有下一页', this.externalReportListCurrentPage, this.externalReportTotalPage)
                        this.setExternalStatus(true)
                    }
                    let externalReportListData = this.$store.getters.externalReportListData
                    if (externalReportListData && externalReportListData.length > 0) {
                        this.externalReportList = concat(this.externalReportList, externalReportListData)
                    }
                }
            }
        },
        // 内部列表首次加载
        getInternalReportListLoading(loading) {
            // console.log('getInternalReportListLoading', loading)
            if (loading) {
                // this.$layer.loading('加载中...')
            } else {
                // this.$layer.close()
                this.reportIndex = this.currentReportIndex
                let reportListRequestStatus = this.$store.getters.reportListRequestStatus
                if (reportListRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(reportListRequestStatus.msg)
                    this.internalHasNext = true
                } else {
                    // 获取数据成功
                    this.internalReportTotalPage = this.$store.getters.internalReportListTotalPage
                    if (this.internalReportListCurrentPage < this.internalReportTotalPage) {
                        this.internalHasNext = true
                        console.log('有下一页', this.internalReportListCurrentPage, this.internalReportTotalPage)
                        this.internalReportListCurrentPage = this.internalReportListCurrentPage + 1
                        this.setInternalStatus(false)
                    } else {
                        this.internalHasNext = false
                        console.log('没有下一页', this.internalReportListCurrentPage, this.internalReportTotalPage)
                        this.setInternalStatus(true)
                    }
                    let internalReportListData = this.$store.getters.internalReportListData
                    if (internalReportListData.length > 0) {
                        this.internalReportList = internalReportListData
                    }
                }
                if (this.$refs.scrollerInternal) {
                    this.$refs.scrollerInternal.finishPullToRefresh()
                }
            }
        },
        // 内部列表加载更多
        getMoreInternalReportListLoading(loading) {
            // console.log('getMoreInternalReportListLoading', loading)
            if (loading) {
                // this.$layer.loading('加载中...')
            } else {
                // this.$layer.close()
                let reportListRequestStatus = this.$store.getters.reportListRequestStatus
                if (reportListRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(reportListRequestStatus.msg)
                    this.internalHasNext = true
                    this.setInternalStatus(false)
                } else {
                    // 获取数据成功
                    this.internalReportTotalPage = this.$store.getters.internalReportListTotalPage
                    if (this.internalReportListCurrentPage < this.internalReportTotalPage) {
                        this.internalHasNext = true
                        console.log('有下一页', this.internalReportListCurrentPage, this.internalReportTotalPage)
                        this.internalReportListCurrentPage = this.internalReportListCurrentPage + 1
                        this.setInternalStatus(false)
                    } else {
                        this.internalHasNext = false
                        console.log('没有下一页', this.internalReportListCurrentPage, this.internalReportTotalPage)
                        this.setInternalStatus(true)
                    }
                    let internalReportListData = this.$store.getters.internalReportListData
                    if (internalReportListData && internalReportListData.length > 0) {
                        this.internalReportList = concat(this.internalReportList, internalReportListData)
                    }
                }
            }
        }
    },
    components: {
        XHeader,
        XInput,
        Group,
        Tab,
        TabItem,
        CustomHeader
    }
}
</script>
<style lang="scss" scoped>
body {
    // overflow-y: hidden !important;
    // overflow-y: scroll;
}

.appraisalReportList {
    background-color: #EFEFF4;
    .scroller {
        margin-top: 80px;
    }
}
</style>

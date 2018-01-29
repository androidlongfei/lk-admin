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
            <div style="background-color: #FFFFFF;text-align: left;padding: 0 15px;height:350px;overflow-y: scroll;">
                <div style="display: flex;line-height: 40px;border-bottom: 1px solid #EFEFF4;">
                    <div style="flex-grow: 8;font-size: 16px;color: #000000;">时间</div>
                    <div style="flex-grow: 5;font-size: 16px;color: #9b9b9b;">地点</div>
                    <div style="flex-grow: 7;font-size: 16px;color: #4a4a4a;text-align: right;">名称</div>
                </div>
                <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="checkMore()" :auto-fill="false" ref="loadmoreExternal">
                    <div style="display: flex;line-height: 40px;border-bottom: 1px solid #EFEFF4;" v-for="(reportItem,index) in this.externalReportList" @click="reportItemClick(reportItem)">
                        <div style="flex-grow: 8;font-size: 16px;color: #000000;">
                            {{conversionReportTime(reportItem.reportDate)}}
                        </div>
                        <div style="flex-grow: 5;font-size: 16px;color: #9b9b9b;">{{reportItem.reportAdress}}</div>
                        <div style="flex-grow: 7;font-size: 16px;color: #4a4a4a;text-align: right;">
                            {{reportItem.reportName}}
                        </div>
                    </div>
                </v-loadmore>
            </div>
        </div>
        <!-- 内部报告列表 -->
        <div v-else-if="this.reportIndex === 0">

            <div style="background-color: #FFFFFF;text-align: left;padding: 0 15px;height:350px;overflow-y: scroll;">
                <div style="display: flex;line-height: 40px;border-bottom: 1px solid #EFEFF4;">
                    <div style="flex-grow: 8;font-size: 16px;color: #000000;">时间</div>
                    <div style="flex-grow: 5;font-size: 16px;color: #9b9b9b;">地点</div>
                    <div style="flex-grow: 7;font-size: 16px;color: #4a4a4a;text-align: right;">名称</div>
                </div>
                <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="checkMore()" :auto-fill="false" ref="loadmoreInternal">
                    <div style="display: flex;line-height: 40px;border-bottom: 1px solid #EFEFF4;" v-for="(reportItem,index) in this.internalReportList" @click="reportItemClick(reportItem)">
                        <div style="flex-grow: 8;font-size: 16px;color: #000000;">
                            {{conversionReportTime(reportItem.reportDate)}}
                        </div>
                        <div style="flex-grow: 5;font-size: 16px;color: #9b9b9b;">{{reportItem.reportAdress}}</div>
                        <div style="flex-grow: 7;font-size: 16px;color: #4a4a4a;text-align: right;">
                            {{reportItem.reportName}}
                        </div>
                    </div>
                </v-loadmore>
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
    TabItem,
    ViewBox
} from 'vux'
import {
    mapGetters
} from 'vuex'
import * as type from './module/mutations_types'
import moment from 'moment'
import storage from '../../../config/storageHelp'
import CustomHeader from '../../../components/CustomHeader'
import _ from 'lodash'
import {
    Loadmore
} from 'mint-ui'

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
            pageSize: 10,
            firstLoadStatus: true,
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
        closeTop() {
            // console.log('this.$refs.loadmore', this.$refs.loadmore);
            if (this.reportIndex === 0) {
                if (this.$refs.loadmoreInternal) {
                    this.$refs.loadmoreInternal.onTopLoaded()
                }
            } else if (this.reportIndex === 1) {
                if (this.$refs.loadmoreExternal) {
                    this.$refs.loadmoreExternal.onTopLoaded()
                }
            }
        },
        closeBottom() {
            if (this.reportIndex === 0) {
                if (this.$refs.loadmoreInternal) {
                    this.$refs.loadmoreInternal.onBottomLoaded()
                }
            } else if (this.reportIndex === 1) {
                if (this.$refs.loadmoreExternal) {
                    this.$refs.loadmoreExternal.onBottomLoaded()
                }
            }
        },
        checkMore() {
            // 是否可以上拉，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            if (this.reportIndex === 0) {
                // 内部
                return this.internalReportListCurrentPage >= this.internalReportTotalPage
            } else if (this.reportIndex === 1) {
                // 外部
                return this.externalReportListCurrentPage >= this.externalReportTotalPage
            }
        },
        loadBottom: function () {
            // 上拉加载
            if (this.reportIndex === 0) {
                // 内部列表
                let currentPage = this.internalReportListCurrentPage + 1
                if (currentPage <= this.internalReportTotalPage) {
                    this.pagingLoadInternalReportList(currentPage, type.GET_MORE_INTERNAL_REPORT_LIST)
                }
            } else if (this.reportIndex === 1) {
                // 外部列表
                let currentPage = this.externalReportListCurrentPage + 1
                // this.pagingLoadExternalReportList(currentPage, type.GET_MORE_EXTERNAL_REPORT_LIST)
                if (currentPage <= this.externalReportTotalPage) {
                    this.pagingLoadExternalReportList(currentPage, type.GET_MORE_EXTERNAL_REPORT_LIST)
                }
            }
        },
        loadTop: function () {
            // 组件提供的下拉触发方法
            // 下拉加载
            if (this.reportIndex === 0) {
                // 内部列表
                // console.log('refresh---内部列表')
                this.internalReportTotalPage = 0
                this.internalReportListCurrentPage = 1
                this.pagingLoadInternalReportList(this.internalReportListCurrentPage, type.GET_INTERNAL_REPORT_LIST)
            } else if (this.reportIndex === 1) {
                // 外部列表
                // console.log('refresh---外部列表')
                this.externalReportTotalPage = 0
                this.externalReportListCurrentPage = 1
                this.pagingLoadExternalReportList(this.externalReportListCurrentPage, type.GET_EXTERNAL_REPORT_LIST)
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
                // this.showLoadMsg('外部列表')
            } else {
                // 内部列表
                if (this.internalReportList.length > 0) {
                    this.reportIndex = this.currentReportIndex
                } else {
                    this.pagingLoadInternalReportList(1, type.GET_INTERNAL_REPORT_LIST)
                }
                // this.showLoadMsg('内部列表')
            }
        },
        againLoad() {
            this.loadTop()
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
        this.againLoad()
    },
    watch: {
        // 外部列表首次加载
        getExternalReportListLoading(loading) {
            // console.log('getExternalReportListLoading', loading)
            if (loading) {
                this.$layer.loading('加载中...')
                this.firstLoadStatus = true
            } else {
                this.$layer.close()
                this.reportIndex = this.currentReportIndex
                this.closeTop()
                this.firstLoadStatus = false
                let reportListRequestStatus = this.$store.getters.reportListRequestStatus
                if (reportListRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(reportListRequestStatus.msg)
                    this.loadError = true
                } else {
                    // 获取数据成功
                    this.loadError = false
                    this.externalReportTotalPage = this.$store.getters.externalReportListTotalPage
                    let externalReportListData = this.$store.getters.externalReportListData
                    if (externalReportListData.length > 0) {
                        this.externalReportList = externalReportListData
                    }
                    // console.log('externalReportList', this.externalReportList)
                }
            }
        },
        // 外部列表加载更多
        getMoreExternalReportListLoading(loading) {
            // console.log('getExternalReportListLoading', loading)
            if (loading) {
                this.$layer.loading('加载中...')
            } else {
                this.$layer.close()
                this.closeBottom()
                let reportListRequestStatus = this.$store.getters.reportListRequestStatus
                if (reportListRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(reportListRequestStatus.msg)
                } else {
                    // 获取数据成功
                    this.externalReportTotalPage = this.$store.getters.externalReportListTotalPage
                    this.externalReportListCurrentPage = this.externalReportListCurrentPage + 1
                    let externalReportListData = this.$store.getters.externalReportListData
                    if (externalReportListData.length > 0) {
                        this.externalReportList = _.concat(this.externalReportList, externalReportListData)
                    }
                }
            }
        },
        // 内部列表首次加载
        getInternalReportListLoading(loading) {
            // console.log('getInternalReportListLoading', loading)
            if (loading) {
                this.$layer.loading('加载中...')
                this.firstLoadStatus = true
            } else {
                this.$layer.close()
                this.reportIndex = this.currentReportIndex
                this.closeTop()
                this.firstLoadStatus = false
                let reportListRequestStatus = this.$store.getters.reportListRequestStatus
                if (reportListRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(reportListRequestStatus.msg)
                    this.loadError = true
                } else {
                    // 获取数据成功
                    this.loadError = false
                    this.internalReportTotalPage = this.$store.getters.internalReportListTotalPage
                    let internalReportListData = this.$store.getters.internalReportListData
                    if (internalReportListData.length > 0) {
                        this.internalReportList = internalReportListData
                    }
                }
            }
        },
        // 内部列表加载更多
        getMoreInternalReportListLoading(loading) {
            // console.log('getInternalReportListLoading', loading)
            if (loading) {
                this.$layer.loading('加载中...')
            } else {
                this.$layer.close()
                this.closeBottom()
                let reportListRequestStatus = this.$store.getters.reportListRequestStatus
                if (reportListRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(reportListRequestStatus.msg)
                } else {
                    // 获取数据成功
                    this.internalReportTotalPage = this.$store.getters.internalReportListTotalPage
                    this.internalReportListCurrentPage = this.internalReportListCurrentPage + 1
                    let internalReportListData = this.$store.getters.internalReportListData
                    if (internalReportListData.length > 0) {
                        this.internalReportList = _.concat(this.internalReportList, internalReportListData)
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
        CustomHeader,
        ViewBox,
        'v-loadmore': Loadmore
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
}
</style>

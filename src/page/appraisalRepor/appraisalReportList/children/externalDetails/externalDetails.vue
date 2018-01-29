<template>
<div class="externalDetails">
    <custom-header :headerData="this.headerData"></custom-header>
    <div v-if="this.firstLoad" style="width: 100%;height: 500px">
        <div style="margin-top: 50%;text-align: center">正在加载中</div>
    </div>
    <div v-else>
        <div v-if="this.loadError" style="width: 100%;height: 500px">
            <div style="margin-top: 50%;text-align: center">加载出错,点击<span style="color: blue" @click="againLoad()">重试</span>加载
            </div>
        </div>
        <div v-else>
            <group title="评估报告所属人" label-width="5.5em" label-margin-right="1em" label-align="left">
                <x-input readonly="readonly" title="姓名" name="username" placeholder="" :value="this.user.userName"></x-input>
                <x-input readonly="readonly" title="性别" name="sex" placeholder="" :value="this.user.gender"></x-input>
            </group>
            <div style="margin-top: 20px;" v-for="(item, index) in this.externalDetailsData.imgList" :key="index">
                <img :src="item.imgurl" style="width: 100%;" />
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    XHeader,
    XInput,
    Group
} from 'vux'
import storage from '../../../../../config/storageHelp'
import * as type from './module/mutations_types'
import {
    mapGetters
} from 'vuex'

export default {
    mounted() {
        this.initData()
    },
    watch: {
        externalDetailsLoading(loading) {
            console.log('externalDetailsLoading', loading)
            if (loading) {
                this.$layer.loading('加载中...')
            } else {
                this.firstLoad = false
                // console.log(this.firstLoad)
                this.$layer.close()
                let externalDetailsRequestStatus = this.$store.getters.externalDetailsRequestStatus
                if (externalDetailsRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(externalDetailsRequestStatus.msg)
                    this.loadError = true
                } else {
                    // 获取数据成功
                    this.loadError = false
                    // let externalDetailsData = this.$store.getters.externalDetailsData
                    // console.log('externalDetailsData', this.externalDetailsData)
                }
            }
        }
    },
    computed: {
        ...mapGetters(['externalDetailsLoading', 'externalDetailsData', 'externalDetailsRequestStatus'])
    },
    data() {
        return {
            seqNo: '',
            loadError: false,
            firstLoad: true,
            user: {
                userName: '',
                gender: ''
            },
            routerParams: {},
            headerData: {
                headerTitle: '外部评估报告'
            }
        }
    },
    methods: {
        againLoad() {
            this.$store.dispatch({
                type: type.GET_EXTERNALDETAILS_DATA,
                payload: {
                    seqNo: this.seqNo.seqNo
                }
            });
        },
        showLoadMsg(msg, time = 2000) {
            this.$layer.toast({
                content: msg,
                time: time
            })
        },
        initData() {
            this.user.userName = storage.userName
            this.user.gender = storage.gender
            let routerParams = this.$route.query
            this.routerParams = routerParams
            this.headerData.headerTitle = this.routerParams.reportName ? this.routerParams.reportName : '外部评估报告'
            console.log('外部评估报告-路由参数', this.routerParams);
            if (routerParams.seqNo) {
                this.seqNo = routerParams.seqNo
                this.$store.dispatch({
                    type: type.GET_EXTERNALDETAILS_DATA,
                    payload: {
                        seqNo: routerParams.seqNo
                    }
                });
            }
        }
    },
    components: {
        XHeader,
        XInput,
        Group
    }
}
</script>
<style>

</style>

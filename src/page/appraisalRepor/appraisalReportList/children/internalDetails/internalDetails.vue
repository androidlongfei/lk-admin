<template>
<div class="internalDetails">
    <custom-header :headerData="this.headerData"></custom-header>
    <group title="评估报告所属人" label-width="5.5em" label-margin-right="1em" label-align="left">
        <x-input readonly="readonly" title="姓名" name="username" placeholder="" :value="this.user.userName"></x-input>
        <x-input readonly="readonly" title="性别" name="sex" placeholder="" :value="this.user.gender"></x-input>
    </group>
    <div style="margin-top: 20px;">
        <img src="../../../../../images/medicalRecordDetails.png" style="width: 100%;" />
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
import CustomHeader from '../../../../../components/CustomHeader'

export default {
    data() {
        return {
            user: {
                userName: '',
                gender: ''
            },
            routerParams: {},
            headerData: {
                headerTitle: '内部评估报告'
            }
        }
    },
    methods: {
        initData() {
            this.user.userName = storage.userName
            this.user.gender = storage.gender
            let routerParams = this.$route.query
            this.routerParams = routerParams
            this.headerData.headerTitle = this.routerParams.reportName ? this.routerParams.reportName : '内部评估报告'
            console.log('内部评估报告-路由参数', this.routerParams)
        }
    },
    components: {
        XHeader,
        XInput,
        Group,
        CustomHeader
    },
    mounted() {
        this.initData()
    }
}
</script>
<style>

</style>

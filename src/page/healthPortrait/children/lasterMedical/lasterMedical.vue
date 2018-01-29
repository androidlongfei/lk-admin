<template>
<div class="medicalRecord">
    <custom-header :headerData="headerData"></custom-header>
    <group title="体检记录所属人" label-width="5.5em" label-margin-right="1em" label-align="left">
        <x-input readonly="readonly" title="姓名" name="username" placeholder="" :value="this.user.userName"></x-input>
        <x-input readonly="readonly" title="性别" name="sex" placeholder="" :value="this.user.gender"></x-input>
    </group>

    <div class="health_title">
        <p>最近的一次体检记录</p>
        <router-link to="/medicalRecord">
            <span>查看更多</span>
        </router-link>
    </div>

    <div style="text-align: left;padding-left: 15px;margin-top: 0px;background-color: #FFFFFF;font-size: 15px;">
        <!--<h1 style="font-size: 18px;font-weight: normal;margin-bottom: 10px;">本周历史记录</h1>-->
        <p style="font-size: 15px;color: #4a4a4a;line-height: 40px;"><span style="display: inline-block;width: 150px;">体检时间:</span>{{this.conversionTime(this.laterMedicalRecordData.reportDate)}}
        </p>
        <p style="font-size: 15px;color: #4a4a4a;line-height: 40px;"><span style="display: inline-block;width: 150px;">体检数据来源:</span> {{this.checkEmptyStr(this.laterMedicalRecordData.recordSource)}}
        </p>
        <p style="line-height: 40px;"><span style="display: inline-block;width: 150px;">体检地点:</span> {{this.checkEmptyStr(this.laterMedicalRecordData.address)}}
        </p>
        <p style="line-height: 40px;"><span style="display: inline-block;width: 150px;">体检报告名称:</span> {{this.checkEmptyStr(this.laterMedicalRecordData.name)}}
        </p>
        <p style="line-height: 40px;"><span style="display: inline-block;width: 150px;">体检报告图片:</span></p>
        <div style="margin-top: 20px;" v-for="(item, index) in this.laterMedicalRecordData.images" :key="index">
            <img :src="item.imgurl" style="width: 100%;" />
        </div>
    </div>
</div>
</template>
<script>
import {
    Group,
    XInput
} from 'vux'
import {
    mapGetters
} from 'vuex'
import * as type from './module/mutations_types'
import moment from 'moment'
import storage from '../../../../config/storageHelp'

export default {
    data() {
        return {
            headerData: {
                headerTitle: '体检记录',
                routerTitle: '添加体检记录',
                routerPath: '/addMedicalRecord'
            },
            user: {
                userName: '',
                gender: ''
            }
        }
    },
    computed: {
        ...mapGetters(['getLaterMedicalRecordLoading', 'laterMedicalRecordData'])
    },
    components: {
        Group,
        XInput
    },
    methods: {
        againLoad() {
            this.$store.dispatch({
                type: type.GET_LATER_MEDICALRECORD,
                payload: {}
            })
        },
        conversionTime(time) {
            if (time) {
                return moment(time).format('YYYY-MM-DD')
            }
            return ''
        }
    },
    mounted() {
        this.user.userName = storage.userName
        this.user.gender = storage.gender
        this.againLoad()
    },
    watch: {
        getLaterMedicalRecordLoading(loading) {
            if (loading) {
                this.$layer.loading('加载中...')
                this.firstLoadStatus = true
            } else {
                this.$layer.close()
                this.firstLoadStatus = false
                let laterMedicalRecordRequestStatus = this.$store.getters.laterMedicalRecordRequestStatus
                if (laterMedicalRecordRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(laterMedicalRecordRequestStatus.msg)
                } else {
                    // 获取数据成功
                    let laterMedicalRecordData = this.$store.getters.laterMedicalRecordData
                    this.localLaterMedicalRecordData = laterMedicalRecordData
                    console.log('laterMedicalRecordData', laterMedicalRecordData)
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.medicalRecord {
    background-color: #EFEFF4;
}

.health_title {
    padding: 0 15px;
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
</style>

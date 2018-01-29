<template>
    <div>
        <div>
            <custom-header :headerData="headerData"></custom-header>
        </div>
        <group gutter="0" label-width="5.5em" label-margin-right="1em" label-align="left">
            <x-input readonly="readonly" title="姓名" v-model="user.userName"></x-input>
            <x-input readonly="readonly" title="性别" v-model="user.gender"></x-input>
        </group>

        <div v-for="src in medicalRecordImgList" class="medicalRecordDetails_png" style="margin-top: 20px;">
            <x-img :src="src.imgurl"></x-img>
        </div>


    </div>
</template>
<script>
    import {
        XHeader, Group, XInput, XImg
    } from 'vux'
    import HealthItem from '../../home/components/HealthItem'
    import storage from '../../../config/storageHelp'
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                user: {
                    userName: '',
                    gender: ''
                },
                headerData: {
                    headerTitle: '',
                    routerPath: '',
                    routerTitle: ''
                }
            }
        },
        methods: {
            success (src, ele) {
                console.log('success load', src)
                const span = ele.parentNode.querySelector('span')
                ele.parentNode.removeChild(span)
            },
            error (src, ele, msg) {
                console.log('error load', msg, src)
                const span = ele.parentNode.querySelector('span')
                span.innerText = 'load error'
            }
        },
        components: {
            XHeader, HealthItem, Group, XInput, XImg

        },
        watch: {
            loadingMedicalRecordImg (loading) {
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.$layer.close()
                    let requestStatus = this.$store.getters.medicalRecordImgRequestStatus
                    if (requestStatus.msg) {
                        // 显示提示信息
                        this.$layer.toast({
                            content: requestStatus.msg,
                            time: 2000
                        })
                    }
                }
            }
        },
        computed: {
            ...mapGetters(['loadingMedicalRecordImg', 'medicalRecordImgList'])
        },
        mounted () {
            console.log(this.$route.query, '得到当前路由信息对象的查询字符串对象')
            this.user.userName = storage.userName
            this.user.gender = storage.gender
            this.headerData.headerTitle = this.$route.query.reportName
            this.$store.dispatch({
                type: 'GETMEDICALRECORDEIMGS',
                payload: {
                    seqNo: this.$route.query.seqNo
                }
            })
        }
    }
</script>
<style>

</style>

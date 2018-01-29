<template>
    <div>
        <custom-header :headerData="headerData"></custom-header>
        <div class="title">
            现存心电主要问题
        </div>
        <div style="text-align: left;padding-left: 15px;margin-top: 10px;">
            <div class="am-btn" style="margin: 7px 2px;font-size: 16px;"
                    v-for="(item, index) in ecgList"
                    :key="index"
                    @click="selectEcg(item, index)"
                    :class="{isChecked:item.isChecked}"
            >
                {{item.name}}
            </div>
        </div>

        <div style="padding: 0px 10px;margin-top: 16px;">
            <button class="weui-btn weui-btn_primary"
                    @click="saveEcg"
            >保存
            </button>
        </div>


    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import moment from 'moment'
    import { getListByDictionaryKey } from '../../../utils/dictionaryUtils'
    export default {
        data () {
            return {
                headerData: {
                    headerTitle: '添加心电',
                    routerTitle: '',
                    routerPath: '',
                    backCall: null
                },
                date: '',
                ecgList: getListByDictionaryKey('ecg')
            }
        },
        computed: {
            ...mapGetters([
                'loadingUpdateEcg'
            ])
        },
        watch: {
            loadingUpdateEcg (loading) {
                if (loading) {
                    this.$layer.loading('更新中...')
                } else {
                    this.$layer.close()
                    let requestStatus = this.$store.getters.updateEcgRequestStatus
                    if (requestStatus.status === '1') {
                        // 显示提示信息
                        this.$layer.toast({
                            content: requestStatus.msg,
                            time: 2000
                        })
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 500)
                        // this.$router.push({
                        //     name: 'ecg',
                        //     query: {
                        //         quotaCode: this.$route.query.quotaCode
                        //     }
                        // })
                    }
                }
            }
        },
        methods: {
            selectEcg (item, idx) {
                this.ecgList.filter(function (el, index, arr) {
                    return idx !== index
                }).forEach(function (value, index, arr) {
                    value.isChecked = false
                })
                item.isChecked = !item.isChecked
            },
            saveEcg () {
                let sendEcg = this.ecgList.filter(function (el, index, arr) {
                    return el.isChecked === true
                })
                console.log(sendEcg, 'sendEcg,sendEcg,sendEcg')
                this.$store.dispatch({
                    type: 'UPDATE_ECG',
                    payload: {
                        data: [
                            {
                                quotaCode: this.$route.query.quotaCode,
                                quotaDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                systemDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                quotaValue: sendEcg[0].code,
                                quotaText: sendEcg[0].name
                            }
                        ]
                    }
                })
            },
            addResponseProperty() {
                for (let i = 0; i < this.ecgList.length; i++) {
                    this.$set(this.ecgList[i], 'isChecked', false)
                }
            }
        },
        mounted () {
            this.addResponseProperty()
            console.log(this.$route.query)
            console.log(this.ecgList, 'ecgList ecgList ecgList')
        }
    }
</script>
<style scoped>
    .title {
        color: #666666;
        background: #efeff4;
        padding-left: 18px;
        height: 40px;
        line-height: 40px;
        text-align: left;
    }

    .am-btn {
        display: inline-block;
        margin-bottom: 0;
        padding: .5em 1em;
        vertical-align: middle;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.2;
        text-align: center;
        white-space: nowrap;
        background-color: #efeff4;
        border: 1px solid transparent;
        border-radius: 0;
        cursor: pointer;
        outline: 0;
    }

    .weui-btn {
        position: relative;
        display: block;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding-left: 14px;
        padding-right: 14px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        color: #FFFFFF;
        line-height: 2.33333333;
        border-radius: 5px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        overflow: hidden;
    }
    .am-btn {
        display: inline-block;
        margin-bottom: 0;
        padding: .5em 1em;
        vertical-align: middle;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.2;
        text-align: center;
        white-space: nowrap;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 0;
        cursor: pointer;
        outline: 0;
        -webkit-appearance: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-transition: background-color .3s ease-out, border-color .3s ease-out;
        transition: background-color .3s ease-out, border-color .3s ease-out
    }
    .isChecked {
        background-color: #1AAD19;
        color: #FFFFFF;
    }
    .weui-btn_primary {
        background-color: #1AAD19;
        border: none;
    }
</style>
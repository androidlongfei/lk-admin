<!-- 增加指标 -->
<template>
<div class="addIndicator">
    <custom-header :headerData="this.headerData"></custom-header>
    <div v-if="this.loadError">
        <keep-alive>
            <reload-page :reload="this.againLoad"></reload-page>
        </keep-alive>
    </div>
    <div v-else>
        <div v-if="this.firstLoadStatus">
            <p>正在加载中</p>
        </div>
        <div v-else>
            <div class="title">
                <p>请选择您要关注的指标项</p>
            </div>
            <div class="content">
                <flexbox :gutter="0" wrap="wrap">
                    <flexbox-item :span="1/4" v-for="(indicators,index) in this.focusIndicatorsData" :key="index">
                        <div class="itemContainer" @click="selectedIndicatot(indicators)">
                            <div :class="[indicators.quotaMark === '1' ? 'itemActive' : 'item']">
                                {{indicators.quotaName}}
                            </div>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="footer">
                <flexbox>
                    <flexbox-item>
                        <x-button type="primary" action-type="button" class="save" @click.native="saveIndicatot()">保存</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
    </div>


</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import {
    Flexbox,
    FlexboxItem,
    XButton,
    XHeader
} from 'vux'
// import moment from 'moment'
import each from 'lodash/each'
import * as type from './module/mutations_types'
export default {
    components: {
        Flexbox,
        FlexboxItem,
        XButton,
        XHeader
    },
    data() {
        return {
            loadError: false,
            firstLoadStatus: true,
            headerData: {
                headerTitle: '增加指标'
            }
        }
    },
    computed: {
        ...mapGetters(['getFocusIndicatorsLoading', 'getSubmitIndicatorsLoading', 'focusIndicatorsData'])
    },
    methods: {
        selectedIndicatot(curIndicators) {
            if (curIndicators.quotaMark === '1') {
                curIndicators.quotaMark = '0'
            } else {
                curIndicators.quotaMark = '1'
            }
            // this.showLoadMsg(curIndicators.quotaMark)
        },
        saveIndicatot() {
            // this.showLoadMsg('保存')
            let dataList = []
            // if (!dataList.length) {
            //     this.showLoadMsg('请选择您要关注的指标项')
            //     return false
            // }
            each(this.focusIndicatorsData, (indicators) => {
                if (indicators.quotaMark === '1') {
                    if (indicators.quotaCode.indexOf('/')) {
                        // 血压单独处理
                        let indicatorsItems = indicators.quotaCode.split('/')
                        each(indicatorsItems, item => {
                            let selectIndicators = {
                                quotaCode: item
                            }
                            dataList.push(selectIndicators)
                        })
                    } else {
                        let selectIndicators = {
                            quotaCode: indicators.quotaCode
                        }
                        dataList.push(selectIndicators)
                    }
                }
            })
            this.$store.dispatch({
                type: type.SUNMIT_FOCUS_INDICATORS,
                payload: {
                    data: {
                        dataList: dataList
                    }
                }
            })
            // console.log('submit data', dataList)
        },
        againLoad() {
            this.$store.dispatch({
                type: type.GET_FOCUS_INDICATORS,
                payload: {}
            })
        }
    },
    mounted() {
        this.againLoad()
    },
    watch: {
        getFocusIndicatorsLoading(loading) {
            console.log('getFocusIndicatorsLoading', loading)
            if (loading) {
                this.$layer.loading('加载中...')
                this.firstLoadStatus = true
            } else {
                this.$layer.close()
                this.firstLoadStatus = false
                let focusIndicatorsRequestStatus = this.$store.getters.focusIndicatorsRequestStatus
                if (focusIndicatorsRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(focusIndicatorsRequestStatus.msg)
                    this.loadError = true
                } else {
                    // 获取数据成功
                    this.loadError = false
                    // let focusIndicatorsData = this.$store.getters.focusIndicatorsData
                    // console.log('focusIndicatorsData', focusIndicatorsData)
                }
            }
        },
        getSubmitIndicatorsLoading(loading) {
            // console.log('getFocusIndicatorsLoading', loading)
            if (loading) {
                this.$layer.loading('保存中...')
            } else {
                this.$layer.close()
                let focusIndicatorsRequestStatus = this.$store.getters.focusIndicatorsRequestStatus
                if (focusIndicatorsRequestStatus.isError) {
                    // 保存指标失败,显示错误信息
                    this.showLoadMsg(focusIndicatorsRequestStatus.msg)
                } else {
                    // 保存指标成功
                    this.showLoadMsg('保存指标成功')
                    this.$router.go(-1)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.addIndicator {
    .title {
        p {
            margin-top: 8px;
        }
    }
    .content {
        margin-top: 10px;
        .itemContainer {
            text-align: center;
            color: #fff;
            margin: 10px;
            cursor: pointer;
            .item {
                background-color: #D2D2D2;
                height: 30px;
                line-height: 30px;
            }
            .itemActive {
                background-color: #56A5DB;
                height: 30px;
                line-height: 30px;
            }
        }
    }
    .footer {
        margin-top: 50px;
        .save {
            width: 200px;
        }
    }
}
</style>

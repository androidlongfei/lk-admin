<template>
<div class="allIndicators">
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
            <grid>
                <grid-item class="item" v-for="(myIndicators,index) in splitArray(this.localAllIndicatorsData,6,0)" :key="index">
                    <indicator-item :indicator="myIndicators"></indicator-item>
                </grid-item>
                <div v-if="this.localAllIndicatorsData.length>6" style="width: 100%">
                    <img src="../../../images/banner0.png" alt="" style="width: 100%">
                </div>
                <grid-item class="item" v-for="(myIndicators,index) in splitArray(this.localAllIndicatorsData,6,1)" :key="index">
                    <indicator-item :indicator="myIndicators"></indicator-item>
                </grid-item>
                <div v-if="this.localAllIndicatorsData.length>12" style="width: 100%">
                    <img src="../../../images/banner2.png" alt="" style="width: 100%">
                </div>
                <grid-item class="item" v-for="(myIndicators,index) in splitArray(this.localAllIndicatorsData,6,2)" :key="index">
                    <indicator-item :indicator="myIndicators"></indicator-item>
                </grid-item>
            </grid>
        </div>
    </div>
</div>
</template>

<script>
import {
    XHeader,
    Grid,
    GridItem,
    GroupTitle
} from 'vux'
import {
    mapGetters
} from 'vuex'

import indicatorItem from './components/indicatorItem'
// import _ from 'lodash'
import chunk from 'lodash/chunk'
import * as type from './module/mutations_types'
import { reorderArr } from '../../../utils/dictionaryUtils'
// import allIndicatorsData from './allIndicatorsTest.json'

export default {
    components: {
        XHeader,
        Grid,
        GridItem,
        GroupTitle,
        indicatorItem
    },
    data() {
        return {
            localAllIndicatorsData: [],
            loadError: false,
            firstLoadStatus: true,
            headerData: {
                headerTitle: '所有监检指标'
            }
        }
    },
    computed: {
        ...mapGetters(['getAllIndicatorsLoading', 'allIndicatorsData'])
    },
    mounted() {
        this.againLoad()
    },
    methods: {
        splitArray(array, num, position) {
            let arr = chunk(array, num)
            if (arr[position]) {
                return arr[position]
            }
            return []
        },
        againLoad() {
            this.$store.dispatch({
                type: type.GET_ALL_INDICATORS,
                payload: {}
            })
        }
    },
    watch: {
        getAllIndicatorsLoading(loading) {
            // console.log('getAllIndicatorsLoading', loading)
            if (loading) {
                this.$layer.loading('加载中...')
                this.firstLoadStatus = true
            } else {
                this.$layer.close()
                this.firstLoadStatus = false
                let allIndicatorsRequestStatus = this.$store.getters.allIndicatorsRequestStatus
                if (allIndicatorsRequestStatus.isError) {
                    // 显示错误信息
                    this.showLoadMsg(allIndicatorsRequestStatus.msg)
                    this.loadError = true
                } else {
                    // 获取数据成功
                    this.loadError = false
                    let allIndicatorsData = this.$store.getters.allIndicatorsData
                    console.log(allIndicatorsData, 'allIndicatorsData')
                    //  console.log(arr, '重新组合过的新数组')
                    this.localAllIndicatorsData = reorderArr(allIndicatorsData)
                    this.scrollYPosition()
                    // console.log('allIndicatorsData', JSON.stringify(allIndicatorsData))
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.allIndicators {
    .item {
        width: 50% !important;
        height: 188px;
    }
}
</style>

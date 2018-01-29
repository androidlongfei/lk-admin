<template>
<x-header style="background-color: #B81C26" :left-options="{backText: ''}">{{headerData.headerTitle}}
    <x-icon @click="backHandler" slot="overwrite-left" type="ios-arrow-left" size="30" style="fill:#fff;position:relative;top:-6px;left:-1px;"></x-icon>
    <a slot="right" v-if="headerData.routerPath && headerData.routerTitle">
        <router-link v-if="!headerData.isRepace" :to="this.routerParamsData()" style="color:white;">{{headerData.routerTitle}}</router-link>
        <router-link v-else :to="this.routerParamsData()" style="color:white;" replace>{{headerData.routerTitle}}</router-link>
    </a>
</x-header>
</template>
<script>
import {
    XHeader
} from 'vux'

export default {
    props: {
        headerData: {
            type: Object,
            required: true,
            default: function () {
                return {
                    headerTitle: '', // title名字
                    routerTitle: '', // router 名字
                    routerPath: '', // router path
                    routerQuery: null, // router query传递参数, 如{id:123,name:'zhansan'}
                    backCall: null, // 返回的的回调函数
                    isRepace: false // 是否由新路由替换当前路由，如果设置为true,那么旧的路由就会从history中删除
                }
            }
        }
    },
    methods: {
        backHandler() {
            if (this.headerData.backCall && (typeof this.headerData.backCall) === 'function') {
                this.headerData.backCall()
            } else {
                this.$router.go(-1)
            }
        },
        routerParamsData() {
            if (this.headerData.routerQuery) {
                return {
                    path: this.headerData.routerPath,
                    query: this.headerData.routerQuery
                }
            } else {
                return this.headerData.routerPath
            }
        }
    },
    components: {
        XHeader
    }
}
</script>
<style scoped lang="scss">
</style>

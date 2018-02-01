<template>
<!-- 面包屑组件 -->
<el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
            <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{generateTitle(item.meta.title)}}</span>
            <router-link v-else :to="item.redirect||item.path">{{generateTitle(item.meta.title)}}</router-link>
        </el-breadcrumb-item>
    </transition-group>
</el-breadcrumb>
</template>

<script>
import { generateTitle } from '../../../../utils/i18n'
export default {
    created() {
        this.getBreadcrumb()
    },
    data() {
        return {
            levelList: null
        }
    },
    watch: {
        $route() {
            // 实时监控路由的改变
            this.getBreadcrumb()
            console.log('breadcrumb component => 路由改变', this.levelList)
        }
    },
    methods: {
        generateTitle,
        getBreadcrumb() {
            // console.log('this.$route.matched breadcrumb', this.$route.matched)
            // $route.matched 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
            let matched = this.$route.matched.filter(item => item.name)
            const first = matched[0]
            if (first && first.name !== 'dashboard') {
                matched = [{ path: '/dashboard', meta: { title: 'dashboard' } }].concat(matched)
            }
            this.levelList = matched
        }
    },
    mounted() {
        console.log('breadcrumb component mounted', this.levelList)
    },
    destoryed() {
        console.log('breadcrumb component destoryed')
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>

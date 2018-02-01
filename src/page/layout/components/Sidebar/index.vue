<template>
<scroll-bar>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
        <sidebar-item :routes="permissionRouter"></sidebar-item>
    </el-menu>
</scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '../ScrollBar'

/**
 * permissionRouter => store.permission.routers
 * sidebar => store.app.sidebar
 */

export default {
    components: { SidebarItem, ScrollBar },
    computed: {
        ...mapGetters([
            'permissionRouter',
            'sidebar'
        ]),
        isCollapse() {
            return !this.sidebar.opened
        }
    },
    mounted() {
        // console.log('sidebar component mounted =>', this.$store.getters.permissionRouter)
    }
}
</script>

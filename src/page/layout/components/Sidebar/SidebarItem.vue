<template>
<div class="menu-wrapper">
    <template v-for="item in routes" v-if="isShowRoute(item)">
      <router-link v-if="isOnlySingleRoute(item)" :to="currentRoutePath(item)" :key="currentRouteName(item)">
        <el-menu-item :index="currentRoutePath(item)" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="hasRouteIcon(item)" :icon-class="currentRouteIcon(item)"></svg-icon>
          <span v-if="hasRouteTitle(item)">{{generateTitle(currentRouteTitle(item))}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
            <template slot="title">
              <svg-icon v-if="hasSubRouteIcon(item)" :icon-class="subRouteIcon(item)"></svg-icon>
              <span v-if="hasSubRouteTitle(item)">{{generateTitle(subRouteTitle(item))}}</span>
            </template>

    <template v-for="child in item.children" v-if="!child.hidden">
                <sidebar-item :is-nest="true" class="nest-menu" v-if="hasMulRoute(child)" :routes="[child]" :key="child.path"></sidebar-item>
                <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                    <el-menu-item :index="item.path+'/'+child.path">
                        <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                        <span v-if="child.meta&&child.meta.title">{{generateTitle(child.meta.title)}}</span>
                    </el-menu-item>
              </router-link>
            </template>
    </el-submenu>

    </template>
</div>
</template>

<script>
import { generateTitle } from '../../../../utils/i18n'

export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        },
        isNest: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        generateTitle,
        isShowRoute(item) {
            //  hidden=fasle,并且配有子路由才显示
            return !item.hidden && item.children
        },
        isOnlySingleRoute(item) {
            // 是否只有单个路由，就是childre里只有一个元素
            return item.children.length === 1 && !item.children[0].children && !item.alwaysShow
        },
        currentRoutePath(item) {
            // 当前路由的path
            return item.path + '/' + item.children[0].path
        },
        currentRouteName(item) {
            // 当前路由的name
            return item.children[0].name
        },
        hasRouteIcon(item) {
            // 是否有配置路由的图标(svg)
            return item.children[0].meta && item.children[0].meta.icon
        },
        currentRouteIcon(item) {
            // 当前路由的icon
            return item.children[0].meta.icon
        },
        hasRouteTitle(item) {
            // 是否有配置路由的标题
            return item.children[0].meta && item.children[0].meta.title
        },
        currentRouteTitle(item) {
            // 当前路由的title
            return item.children[0].meta.title
        },
        // //////////////////////////////////////////// 以下主要是item.children.length >1 或者 item.children[0].children > 0
        hasSubRouteIcon(item) {
            // 是否有配置路由的图标(svg)
            return item.meta && item.meta.icon
        },
        subRouteIcon(item) {
            return item.meta.icon
        },
        hasSubRouteTitle(item) {
            // 是否有配置路由的图标(svg)
            return item.meta && item.meta.title
        },
        subRouteTitle(item) {
            return item.meta.title
        },
        hasMulRoute(childRoute) {
            // 是否有多级路由, 大于 item.children.children
            return childRoute.children && childRoute.children.length > 0
        }
    },
    mounted() {
        // console.log('sidebar routes', this.routes)
    }
}
</script>

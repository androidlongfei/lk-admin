<template>
<section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
        <!-- include 缓存指定的路由 -->
        <keep-alive :include="cachedViews">
            <router-view></router-view>
        </keep-alive>
    </transition>
</section>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
        cachedViews() {
            // console.log('cachedViews', this.$store.state.tagsView.cachedViews)
            return this.$store.state.tagsView.cachedViews
        }
    },
    mounted() {
        console.log('AppMain component mounted =>', this.$store.state.tagsView.cachedViews)
    }
}
</script>

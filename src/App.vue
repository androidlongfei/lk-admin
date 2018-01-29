<template>
<div id="app">
        <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
    #app {
        text-align: center;
    }

    html, body {
        height: 100%;
        width: 100%;
        /*overflow-x: hidden;*/
    }
</style>

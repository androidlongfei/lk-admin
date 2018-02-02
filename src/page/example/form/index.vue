<template>
<div class="">
    this is form
</div>
</template>

<script>
export default {
    name: 'testForm',
    // 写组件的名字主要是为了缓存组件
    // 组件的名字与路由的名字必须一样才能被缓存
    // https://panjiachen.github.io/vue-element-admin-site/#/zh-cn/tags-view
    data() {
        return {

        }
    },
    mounted() {
        console.log('form component mounted =>');
    }
}
</script>

<style lang="css">
</style>

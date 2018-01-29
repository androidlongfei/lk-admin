<template>
<div class="reloadContainer">
    <p>加载出错，<span @click="reload()">点击</span>重新加载</p>
</div>
</template>
<script>
export default {
    props: {
        // 重新加载回调函数
        reload: {
            type: Function,
            required: true
        }
    },
    methods: {},
    components: {}
}
</script>
<style scoped lang="scss">
.reloadContainer {
    p {
        margin-top: 10%;
        span {
            color: blue;
            cursor: pointer;
        }
    }
}
</style>

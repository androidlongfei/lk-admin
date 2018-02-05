<template>
<div class="icon-container">
    <div class="normal">
        <span>收藏(小):</span>
        <svg-icon icon-class="collection" />
    </div>

    <div class="big">
        <span>收藏(大):</span>
        <svg-icon icon-class="collection" class-name='svg-big' />
    </div>

    <div class="big">
        <span>图标:</span>
        <svg-icon icon-class="icon" class-name='svg-big' />
    </div>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.icon-container {
    margin: 30px;
    .big {
        margin-top: 30px;
        // border: 1px solid black;
        .svg-big {
            width: 30px;
            height: 30px;
            margin-left: 5px;
        }
        span {
            position: relative;
            bottom: 7px;

        }
    }

    .big:hover {
        color: red;
    }

    // 备注:svg图标的color可以通过更改其父元素的color来实现.
}
</style>

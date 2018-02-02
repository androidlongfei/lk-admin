<template>
<div class="">
    this is dashboard
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        console.log('The time is ', this.$moment().format('HH:mm'))
    }
}
</script>

<style lang="css">
</style>

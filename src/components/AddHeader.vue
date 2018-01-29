<template>
    <div>
        <x-header style="background-color: #B81C26" :left-options="{backText: ''}">
            <slot name="titleContent"></slot>
            <!--navicon-->
            <x-icon @click="backHandler" slot="overwrite-left" type="ios-arrow-left" size="30"
                    style="fill:#fff;position:relative;top:-6px;left:-3px;"></x-icon>
            <a slot="right" style="color: #2AA6FF;">
                <slot name="addName"></slot>
            </a>
        </x-header>
    </div>
</template>
<script>
    import { XHeader } from 'vux'

    export default {
        components: {
            XHeader
        },
        methods: {
            backHandler () {
                this.$router.go(-1)
            }
            // skipRouter (path) {
            //     this.$router.push(path)
            // }
        }
    }
</script>
<style>

</style>
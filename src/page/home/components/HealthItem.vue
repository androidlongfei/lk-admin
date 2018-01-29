<template>
    <div>
        <group gutter="0">
            <div class="vux-x-input weui-cell" style="background-color: #FFFFFF;">
                <!--<div class="weui-cell__hd">-->
                    <!--<label class="weui-label"-->
                           <!--style="width: 5.5em; text-align: left; margin-right: 1em;">-->
                        <!--{{ item?item.title:'既往病史' }}-->
                    <!--</label>-->
                <!--</div>-->
                <slot name="illnessTitle"></slot>
                <div class="weui-cell__bd weui-cell__primary" style="text-align: left;">
                    <div>{{itemValue}}</div>
                </div>
            </div>
        </group>
    </div>
</template>
<script>
    import {
        Cell, Group, XInput
    } from 'vux'
    export default {
        props: {
            itemValue: {
                type: String,
                required: true
            }
        },
        components: {
            Cell, Group, XInput
        }
    }
</script>
<style>
    .weui-cells:after{
        border-bottom: 1px solid transparent;
    }
</style>
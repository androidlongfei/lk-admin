<template>
    <div class="my-dialog">

        <p @click.stop="showDialogStyle=!showDialogStyle">{{ itemText }}</p>
        <div v-transfer-dom>

                <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
                    <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
                        <span style="font-size:16px;padding: 10px;display: block;">{{ itemText }}</span>
                        <br>
                        <br>
                        <x-icon type="ios-close-outline" style="fill:#fff;"></x-icon>
                    </p>
                </x-dialog>
        </div>

    </div>
</template>



<script>
    import { XDialog, Group, TransferDomDirective as TransferDom } from 'vux'

    export default {
        props: {
            itemText: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                showDialogStyle: false
            }
        },
        name: 'dailog',
        directives: {
            TransferDom
        },
        components: {
            XDialog,
            Group
        }
    }
</script>

<style lang="less" scoped>
    .my-dialog>p{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .dialog-demo {
        .weui-dialog{
            border-radius: 8px;
            padding-bottom: 8px;
        }
        .dialog-title {
            line-height: 30px;
            color: #666;
        }
        .img-box {
            height: 200px;
            overflow: hidden;
        }
        .vux-close {
            margin-top: 8px;
            margin-bottom: 8px;
        }
    }
</style>
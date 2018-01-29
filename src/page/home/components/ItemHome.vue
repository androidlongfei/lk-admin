<template>
    <div class="itemHome clearfix">
        <div class="padding2 title">
            <div style="font-size: 14px;color: #000000">{{item.quotaName}}</div>
            <div style="font-size: 11px;color: #4a4a4a">{{conversionTime(item.time)}}</div>
        </div>
        <div class="padding2 title title2">
            <img :src="item.quotaImageIcon"/>
            <div><span class="normal" :class="{abnormal: item.quotaNormal!=='1'}">{{item.quotaValue}}</span><span
                    style="font-size: 11px;color: #9B9B9B;">{{item.quotaUnit}}</span></div>
        </div>
        <div class="padding2" style="margin: 10px 0px;width: 100%;">
            <div style="text-align: left;font-size:11px;color: #4a4a4a">
                参考范围 {{item.quotaRange}}
            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        methods: {
            conversionTime(time) {
                return moment(time).format('YYYY-MM-DD')
            }
        },
        data () {
            return {
                to: {
                    type: String,
                    default: function () {
                        return '/'
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .itemHome {
        background-color: #FFFFFF;
        .title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .title2 {
            height: 80px;
        }
        .title2 > * {
            align-items: center;
        }
        .title2 > img {
            width: 48px;
            height: 48px;
        }
        .borderB {
            border-bottom: 1px solid #e8e9ec;
        }
        .borderR {
            border-right: 1px solid #e8e9ec;
        }
        .divinfo {
            font-size: 20px;
            color: #000000;
            float: left;
        }
        .divinfo1 {
            font-size: 17px;
            color: #000000;
            float: left;
        }
        .divtime {
            font-size: 12px;
            margin-top: 5px;
            font-weight: lighter;
            color: #666666;
            float: right;
            right: 1px;
        }
        .divbot {
            font-size: 12px;
            float: left;
            /*left: 1px;*/
            font-weight: lighter;
            color: #0087f9;
            min-height: 40px;
        }
        .imgl {
            margin-left: 3px;
            float: left;
            max-width: 100%;
            width: 70px;
            height: 70px;
        }
        .img3 {
            float: right;
            max-width: 100%;
            width: 85px;
            height: 98px;
        }
        .sp {
            color: #000000;
            float: right;
            font-size: 35px;
            font-weight: bold;
        }
        .sp1 {
            color: #666666;
            float: right;
            font-size: 13px;
            margin-top: 10px;
        }
        .sp3 {

            color: #000000;
            float: right;
            font-size: 25px;
            font-weight: bold;
        }
        .sp4 {
            color: #666666;
            float: right;
            font-size: 13px;
            margin-top: 10px;
        }
        .sp5 {
            color: #666666;
            float: right;
            font-size: 13px;
            /*margin-top: 10px;*/
        }
        .padding2 {
            padding: 0 3px 0 5px;
        }
        .normal{
            font-size: 21px;
            color: #4a4a4a;
        }
        .abnormal{
            color: #FF0202;
        }
    }
</style>

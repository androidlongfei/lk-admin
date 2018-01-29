<template>
    <div>
        <x-header style="background-color: #20A0FF;" :left-options="{backText: ''}">{{configData.title}}</x-header>
        <div style="display: flex;height: 36px;line-height: 36px;margin: 0 auto;font-size: 14px;
        border: 1px solid #C0CCDA;border-radius: 2px;width: 296px;margin-top: 30px;">
            <div style="width: 74px;border-right: 1px solid #C0CCDA;margin-bottom: -1px;">日</div>
            <div style="width: 74px;border-right: 1px solid #C0CCDA;background-color: #20A0FF;color: #FFFFFF;margin-bottom: -1px;">
                周
            </div>
            <div style="width: 74px;border-right: 1px solid #C0CCDA;margin-bottom: -1px;">月</div>
            <div style="width: 74px;margin-bottom: -1px;">年</div>
        </div>
        <div style="text-align: left;padding-left: 15px;margin-top: 50px;">
            <h1 style="font-size: 18px;font-weight: normal;margin-bottom: 10px;">本周历史记录</h1>
            <p style="font-size: 15px;color: #4a4a4a;">时间范围: 2017年01月-2017年11月</p>
            <p style="font-size: 15px;color: #4a4a4a;">当前日期: 2017年11月29日 星期四</p>
            <p style="color: orangered;">所选日期体重值: 75kg</p>
        </div>
    </div>
</template>
<script>
    import { XHeader } from 'vux'

    export default {
        props: ['configData'],
        components: { XHeader }
    }
</script>
<style>

</style>
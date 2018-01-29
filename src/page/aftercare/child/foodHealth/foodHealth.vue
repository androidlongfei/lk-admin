<template>
    <div>
        <custom-header :headerData="this.headerData"></custom-header>
        <div v-if="this.firstLoad" style="width: 100%;height: 500px">
            <div style="margin-top: 50%;text-align: center">正在加载中</div>
        </div>
        <div v-else>
            <div v-if="this.loadError" style="width: 100%;height: 500px">
                <keep-alive>
                    <reload-page :reload="this.againLoad"></reload-page>
                </keep-alive>
            </div>

            <div v-else>
                <div id="wrapper">
                    <div id="principle">
                        <p class="title">{{this.renderData.states.title}}</p>
                        <ol class="principle_list">
                            <li v-for="(item, index) in this.renderData.states.list" v-html="item"></li>
                        </ol>
                    </div>
                    <div id="recipes" style="padding-bottom: 0;margin-bottom: 0;">
                        <p class="recipes_title">{{this.renderData.dayFood.title}}</p>
                        <hr/>
                        <div>
                            <div>
                                <p class="breakfast_title" style="text-align: center;">
                                    {{this.renderData.dayFood.dietaryBreakfast.title}}</p>
                                <div class="breakfast_wrapper" id="breakfast_content">
                                    <dl v-for="(item, index) in this.renderData.dayFood.dietaryBreakfast.list"
                                        :key="index">
                                        <dt><img :src="item.itemImg"/></dt>
                                        <dd>
                                            <p class="meal">{{item.itemFood}}</p>
                                            <p class="amount">{{item.itemDesc}}</p>
                                        </dd>
                                    </dl>
                                </div>
                            </div>

                            <hr/>
                            <div id="morningMeal">
                                <div class="addMealImg"><img :src="this.renderData.dayFood.morningAdd.img"/></div>
                                <div class="addMealText">{{this.renderData.dayFood.morningAdd.title}}</div>
                                <div class="addMealContent">{{this.renderData.dayFood.morningAdd.desc}}</div>
                            </div>
                            <hr/>

                            <div id="">
                                <p id="lunch_title" style="text-align: center;">
                                    {{this.renderData.dayFood.dietaryLunch.title}}</p>
                                <div class="breakfast_wrapper" id="lunch_content">
                                    <dl v-for="(item, index) in this.renderData.dayFood.dietaryLunch.list" :key="index">
                                        <dt><img :src="item.itemImg"/></dt>
                                        <dd>
                                            <p class="meal">{{item.itemFood}}</p>
                                            <p class="amount">{{item.itemDesc}}</p>
                                        </dd>
                                    </dl>
                                </div>
                            </div>

                            <hr/>
                            <div id="afternoon">
                                <div class="addMealImg"><img :src="this.renderData.dayFood.afternoonAdd.img"/></div>
                                <div class="addMealText">{{this.renderData.dayFood.afternoonAdd.title}}</div>
                                <div class="addMealContent">{{this.renderData.dayFood.afternoonAdd.title}}</div>
                            </div>
                            <hr/>

                            <div>
                                <p id="dinner_title" style="text-align: center;">
                                    {{this.renderData.dayFood.dietaryDinner.title}}</p>
                                <div class="breakfast_wrapper" id="dinner_content">
                                    <dl v-for="(item, index) in this.renderData.dayFood.dietaryDinner.list"
                                        :key="index">
                                        <dt><img :src="item.itemImg"/></dt>
                                        <dd>
                                            <p class="meal">{{item.itemFood}}</p>
                                            <p class="amount">{{item.itemDesc}}</p>
                                        </dd>
                                    </dl>
                                </div>
                            </div>

                            <hr/>
                            <div id="before_bed">
                                <div class="addMealImg"><img :src="this.renderData.dayFood.dinnerAdd.img"/></div>
                                <div class="addMealText">{{this.renderData.dayFood.dinnerAdd.title}}</div>
                                <div class="addMealContent">{{this.renderData.dayFood.dinnerAdd.desc}}</div>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    <div id="shouldEat" style="padding-top: 0;margin-top: 0;padding-bottom: 0;margin-bottom: 0;">
                        <p id="shouldEat_title" class="title" style="color: #006600;letter-spacing: 3px;">
                            <span>{{this.renderData.dietaryShould.title}}</span>
                            <star :score="this.renderData.dietaryShould.score"></star>
                        </p>
                        <hr/>
                        <div id="meal_list">
                            <dl v-for="(item, index) in this.renderData.dietaryShould.list" :key="index">
                                <dt><img :src="item.itemImg"/></dt>
                                <dd style="padding-left: 15px;">
                                    <div class="" style="border-bottom:1px solid #CCCCCC ;">
                                        {{item.itemFood}}
                                    </div>
                                    <div class="foods" style="line-height: 20px;margin-top: 5px;">
                                        {{item.itemDesc}}
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div id="avoid">
                        <p id="avoid_title" class="title" style="color: #CC0000;letter-spacing: 3px;">
                            <span>{{this.renderData.dietaryBogey.title}}</span>
                            <star :score="this.renderData.dietaryBogey.score"></star>
                        </p>
                        <hr/>
                        <div class="avoid_list">
                            <dl v-for="(item, index) in this.renderData.dietaryBogey.list" :key="index">
                                <dt>{{item.cat}}</dt>
                                <dd>{{item.value}}</dd>
                            </dl>
                        </div>
                    </div>
                    <div id="tuijian">
                        <p id="recommend_food_title">
                            {{this.renderData.dietaryRecommendFood.title.value}}
                        </p>
                        <hr/>
                        <div id="recommend_food_content" class="breakfast_wrapper">
                            <dl v-for="(item, index) in this.renderData.dietaryRecommendFood.list" :key="index">
                                <dt><img :src="item.img"/></dt>
                                <dd>
                                    <p class="meal">{{item.food}}</p>
                                </dd>
                            </dl>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        XHeader
    } from 'vux'
    import * as type from './module/mutations_types'
    import {
        mapGetters
    } from 'vuex'
    import HeaderTitle from '../../../../components/HeaderTitle'
    import Star from '../../../../components/star'

    export default {
        mounted() {
            this.sendData.diseaseCode = this.$route.query.diseaseCode
            this.sendData.pageId = this.$route.query.pageId
            this.$store.dispatch({
                type: type.GET_FOODHEALTH_DATA,
                payload: this.sendData
            });
        },
        computed: {
            ...mapGetters(['foodHealthLoading', 'foodHealthData', 'foodHealthRequestStatus'])
        },
        watch: {
            foodHealthLoading(loading) {
                // console.log('foodHealthLoading', loading)
                if (loading) {
                    this.$layer.loading('加载中...')
                } else {
                    this.firstLoad = false
                    // console.log(this.firstLoad)
                    this.$layer.close()
                    let foodHealthRequestStatus = this.$store.getters.foodHealthRequestStatus
                    if (foodHealthRequestStatus.isError) {
                        // 显示错误信息
                        this.showLoadMsg(foodHealthRequestStatus.msg)
                        this.loadError = true
                    } else {
                        // 获取数据成功
                        this.loadError = false
                        let foodHealthData = this.$store.getters.foodHealthData
                        // console.log('foodHealthData', this.foodHealthData)
                        this.testData = foodHealthData
                        this.assemblyData(this.testData)
                    }
                }
            }
        },
        components: {
            XHeader,
            HeaderTitle,
            Star
        },
        data() {
            return {
                sendData: {
                    temCode: 'WUYANG_LKJ',
                    deType: '0',
                    pageId: '',
                    diseaseCode: ''
                },
                loadError: false,
                firstLoad: true,
                headerData: {
                    headerTitle: '食养'
                },
                renderData: {
                    states: {
                        title: '',
                        list: []
                    },
                    dayFood: {
                        title: '',
                        dietaryBreakfast: {
                            title: '',
                            list: []
                        },
                        morningAdd: {
                            img: '',
                            desc: '',
                            title: ''
                        },
                        afternoonAdd: {
                            img: '',
                            desc: '',
                            title: ''
                        },
                        dinnerAdd: {
                            img: '',
                            desc: '',
                            title: ''
                        },
                        dietaryLunch: {
                            title: '',
                            list: []
                        },
                        dietaryDinner: {
                            title: '',
                            list: []
                        }
                    },
                    dietaryShould: {
                        title: '',
                        score: '',
                        list: []
                    },
                    dietaryBogey: {
                        title: '',
                        score: '',
                        list: []
                    },
                    dietaryRecommendFood: {
                        title: '',
                        list: []
                    }
                },
                testData: {}
            }
        },
        methods: {
            showLoadMsg(msg, time = 2000) {
                this.$layer.toast({
                    content: msg,
                    time: time
                })
            },
            assemblyData(data) {
                if (data) {
                    if (data.dietary_title) {
                        let dietaryTitle = data.dietary_title
                        if (dietaryTitle.value) {
                            this.headerData.headerTitle = dietaryTitle.value
                        }
                    }
                    if (data.dietary_states_title) {
                        let dietaryStatesTitle = data.dietary_states_title
                        if (dietaryStatesTitle.value) {
                            this.renderData.states.title = dietaryStatesTitle.value
                        }
                    }
                    if (data.dietary_states_content) {
                        let dietaryStatesContent = data.dietary_states_content
                        for (let i = 0; i < dietaryStatesContent.length; i++) {
                            let oLiVal = dietaryStatesContent[i].dietary_states_content.value
                            this.renderData.states.list.push(oLiVal)
                        }
                    }
                    if (data.day_food) {
                        let dayFood = data.day_food
                        //     //一日食谱
                        if (dayFood.dietary_day_food_title) {
                            let dietaryDayFoodTitle = dayFood.dietary_day_food_title
                            if (dietaryDayFoodTitle.value) {
                                this.renderData.dayFood.title = dietaryDayFoodTitle.value
                            }
                        }

                        // 早餐
                        if (dayFood.dietary_breakfast) {
                            let dietaryBreakfast = dayFood.dietary_breakfast
                            // title
                            if (dietaryBreakfast.dietary_breakfast_title) {
                                let dietaryBreakfastTitle = dietaryBreakfast.dietary_breakfast_title
                                if (dietaryBreakfastTitle.value) {
                                    this.renderData.dayFood.dietaryBreakfast.title = dietaryBreakfastTitle.value
                                }
                            }
                            // 早餐内容
                            if (dietaryBreakfast.dietary_breakfast_food_list) {
                                let dietaryBreakfastFoodList = dietaryBreakfast.dietary_breakfast_food_list
                                for (let i = 0; i < dietaryBreakfastFoodList.length; i++) {
                                    let item = dietaryBreakfastFoodList[i]
                                    let itemObj = {
                                        itemImg: '',
                                        itemDesc: '',
                                        itemFood: ''
                                    }
                                    if (item.dietary_breakfast_food) {
                                        itemObj.itemFood = item.dietary_breakfast_food.value
                                    }
                                    if (item.dietary_breakfast_img) {
                                        itemObj.itemImg = item.dietary_breakfast_img.value
                                    }
                                    if (item.dietary_breakfast_weight_desc) {
                                        itemObj.itemDesc = item.dietary_breakfast_weight_desc.value
                                    }
                                    this.renderData.dayFood.dietaryBreakfast.list.push(itemObj)
                                }
                            }
                            // 上午加餐
                            if (dayFood.dietary_morning_add) {
                                let dietaryMorningAdd = dayFood.dietary_morning_add
                                if (dietaryMorningAdd.dietary_morning_add_desc) {
                                    this.renderData.dayFood.morningAdd.desc = dietaryMorningAdd.dietary_morning_add_desc.value
                                }
                                if (dietaryMorningAdd.dietary_morning_add_img) {
                                    this.renderData.dayFood.morningAdd.img = dietaryMorningAdd.dietary_morning_add_img.value
                                }
                                if (dietaryMorningAdd.dietary_morning_add_title) {
                                    this.renderData.dayFood.morningAdd.title = dietaryMorningAdd.dietary_morning_add_title.value
                                }
                            }

                            // 午餐
                            if (dayFood.dietary_lunch) {
                                let dietaryLunch = dayFood.dietary_lunch
                                // 午餐title
                                if (dietaryLunch.dietary_lunch_title) {
                                    let dietaryLunchTitle = dietaryLunch.dietary_lunch_title
                                    if (dietaryLunchTitle.value) {
                                        this.renderData.dayFood.dietaryLunch.title = dietaryLunchTitle.value
                                    }
                                }

                                if (dietaryLunch.dietary_lunch_food_list) {
                                    let dietaryLunchFoodList = dietaryLunch.dietary_lunch_food_list
                                    for (let i = 0; i < dietaryLunchFoodList.length; i++) {
                                        let itemObj = {
                                            itemImg: '',
                                            itemDesc: '',
                                            itemFood: ''
                                        }
                                        if (dietaryLunchFoodList[i].dietary_lunch_food) {
                                            itemObj.itemFood = dietaryLunchFoodList[i].dietary_lunch_food.value
                                        }
                                        if (dietaryLunchFoodList[i].dietary_lunch_img) {
                                            itemObj.itemImg = dietaryLunchFoodList[i].dietary_lunch_img.value
                                        }
                                        if (dietaryLunchFoodList[i].dietary_lunch_weight_desc) {
                                            itemObj.itemDesc = dietaryLunchFoodList[i].dietary_lunch_weight_desc.value
                                        }
                                        this.renderData.dayFood.dietaryLunch.list.push(itemObj)
                                    }
                                }
                            }
                            // 下午加餐
                            if (dayFood.dietary_afternoon_add) {
                                let dietaryAfternoonAdd = dayFood.dietary_afternoon_add
                                if (dietaryAfternoonAdd.dietary_afternoon_add_desc) {
                                    this.renderData.dayFood.afternoonAdd.desc = dietaryAfternoonAdd.dietary_afternoon_add_desc.value
                                }
                                if (dietaryAfternoonAdd.dietary_afternoon_add_img) {
                                    this.renderData.dayFood.afternoonAdd.img = dietaryAfternoonAdd.dietary_afternoon_add_img.value
                                }
                                if (dietaryAfternoonAdd.dietary_afternoon_add_title) {
                                    this.renderData.dayFood.afternoonAdd.title = dietaryAfternoonAdd.dietary_afternoon_add_title.value
                                }
                            }
                            // 晚餐
                            if (dayFood.dietary_dinner) {
                                let dietaryDinner = dayFood.dietary_dinner
                                // 晚餐title
                                if (dietaryDinner.dietary_dinner_title) {
                                    let dietaryDinnerTitle = dietaryDinner.dietary_dinner_title
                                    if (dietaryDinnerTitle.value) {
                                        this.renderData.dayFood.dietaryDinner.title = dietaryDinnerTitle.value
                                    }
                                }

                                if (dietaryDinner.dietary_dinner_list) {
                                    let dietaryDinnerList = dietaryDinner.dietary_dinner_list
                                    for (let i = 0; i < dietaryDinnerList.length; i++) {
                                        let itemObj = {
                                            itemImg: '',
                                            itemDesc: '',
                                            itemFood: ''
                                        }
                                        if (dietaryDinnerList[i].dietary_dinner_food) {
                                            itemObj.itemFood = dietaryDinnerList[i].dietary_dinner_food.value
                                        }
                                        if (dietaryDinnerList[i].dietary_dinner_img) {
                                            itemObj.itemImg = dietaryDinnerList[i].dietary_dinner_img.value
                                        }
                                        if (dietaryDinnerList[i].dietary_dinner_weight_desc) {
                                            itemObj.itemDesc = dietaryDinnerList[i].dietary_dinner_weight_desc.value
                                        }
                                        this.renderData.dayFood.dietaryDinner.list.push(itemObj)
                                    }
                                }
                            }
                            // 晚上加餐
                            if (dayFood.dietary_before_bed) {
                                let dietaryBeforeBed = dayFood.dietary_before_bed
                                if (dietaryBeforeBed.dietary_before_bed_desc) {
                                    this.renderData.dayFood.dinnerAdd.desc = dietaryBeforeBed.dietary_before_bed_desc.value
                                }
                                if (dietaryBeforeBed.dietary_before_bed_img) {
                                    this.renderData.dayFood.dinnerAdd.img = dietaryBeforeBed.dietary_before_bed_img.value
                                }
                                if (dietaryBeforeBed.dietary_before_bed_title) {
                                    this.renderData.dayFood.dinnerAdd.title = dietaryBeforeBed.dietary_before_bed_title.value
                                }
                            }
                        }
                    }
                    // 宜吃
                    if (data.dietary_should) {
                        let dietaryShould = data.dietary_should
                        if (dietaryShould.dietary_should_title) {
                            this.renderData.dietaryShould.title = dietaryShould.dietary_should_title.value
                        }
                        if (dietaryShould.dietary_should_star) {
                            this.renderData.dietaryShould.score = dietaryShould.dietary_should_star.value
                        }

                        if (dietaryShould.dietary_should_list) {
                            let dietaryShouldList = dietaryShould.dietary_should_list
                            for (let i = 0; i < dietaryShouldList.length; i++) {
                                let itemObj = {
                                    itemImg: '',
                                    itemDesc: '',
                                    itemFood: ''
                                }
                                if (dietaryShouldList[i].dietary_should_cat) {
                                    itemObj.itemFood = dietaryShouldList[i].dietary_should_cat.value
                                }
                                if (dietaryShouldList[i].dietary_should_content) {
                                    itemObj.itemDesc = dietaryShouldList[i].dietary_should_content.value
                                }
                                if (dietaryShouldList[i].dietary_should_img) {
                                    itemObj.itemImg = dietaryShouldList[i].dietary_should_img.value
                                }
                                this.renderData.dietaryShould.list.push(itemObj)
                            }
                        }
                    }
                    // 忌吃
                    if (data.dietary_bogey) {
                        let dietaryBogey = data.dietary_bogey
                        if (dietaryBogey.dietary_bogey_title) {
                            this.renderData.dietaryBogey.title = dietaryBogey.dietary_bogey_title.value
                        }
                        if (dietaryBogey.dietary_bogey_star) {
                            this.renderData.dietaryBogey.score = dietaryBogey.dietary_bogey_star.value
                        }

                        if (dietaryBogey.dietary_bogey_list) {
                            let dietaryBogeyList = dietaryBogey.dietary_bogey_list
                            for (let i = 0; i < dietaryBogeyList.length; i++) {
                                let itemObj = {
                                    cat: '',
                                    value: ''
                                }
                                if (dietaryBogeyList[i].dietary_bogey_cat) {
                                    itemObj.cat = dietaryBogeyList[i].dietary_bogey_cat.value
                                }
                                if (dietaryBogeyList[i].dietary_bogey_content) {
                                    itemObj.value = dietaryBogeyList[i].dietary_bogey_content.value
                                }
                                this.renderData.dietaryBogey.list.push(itemObj)
                            }
                        }
                    }
                    if (data.dietary_recommend_food) {
                        let dietaryRecommendFood = data.dietary_recommend_food
                        if (dietaryRecommendFood.dietary_recommend_food_title) {
                            var dietaryRecommendFoodTitle = dietaryRecommendFood.dietary_recommend_food_title
                            if (dietaryRecommendFoodTitle.value) {
                                this.renderData.dietaryRecommendFood.title = dietaryRecommendFoodTitle
                            }
                        }

                        if (dietaryRecommendFood.dietary_recommend_food_list) {
                            let dietaryRecommendFoodList = dietaryRecommendFood.dietary_recommend_food_list
                            for (let i = 0; i < dietaryRecommendFoodList.length; i++) {
                                let itemObj = {
                                    food: '',
                                    img: ''
                                }
                                itemObj.food = dietaryRecommendFoodList[i].dietary_recommend_food_food.value
                                itemObj.img = dietaryRecommendFoodList[i].dietary_recommend_food_img.value
                                this.renderData.dietaryRecommendFood.list.push(itemObj)
                            }
                        }
                    }
                }
            },
            againLoad() {
                this.$store.dispatch({
                    type: type.GET_FOODHEALTH_DATA,
                    payload: this.sendData
                });
            }
        }
    }
</script>

<style lang="css" scoped>
    /*@import "../../../../style/amazeui/css/amazeui.min.css";*/
    * {
        margin: 0;
        padding: 0;
    }

    body {
        width: 100%;
        height: 100%;
        background: #E4E4E4;
    }

    #wrapper {
        text-align: left;
    }

    #principle li {
        list-style: none;
    }

    #principle, #recipes, #shouldEat, #avoid, #tuijian {
        background: #fff;
        margin: 10px 0px;
        padding: 10px;
    }

    .title {
        margin: 0;
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
    }

    .recipes_title {
        margin: 0;
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
    }

    .principle_list {
        margin: 0;
        font-size: 16px;
    }

    .principle_list li {
        margin: 5px 0;
    }

    #meal_list {
        margin-top: 15px;
    }

    #meal_list dl {
        display: flex;
        border-bottom: 1px solid gainsboro;
    }

    #meal_list dl dt {
        width: 160px;
    }

    #meal_list dl dt img {
        width: 100%;
    }

    #meal_list dl dd {
        flex: 1;
    }

    dt + dd {
        margin-top: 0 !important;
        /*padding-left: 10px;*/
    }

    dl {
        margin-top: 0 !important;
    }

    .meal {
        line-height: 12px;
    }

    .foods {
        font-size: 12px;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

    .avoid_list {
        /*display: flex;*/
    }

    .avoid_list dl {
        vertical-align: top;
        display: inline-block;
        width: 49%;
    }

    /*
    #tuijian dl dt{
        width: 100px;height: 100px;
        border: 1px solid #E4E4E4;
    }
    #tuijian dl dt img{
        width: 100%;
    }
    #tuijian dl{
         width: 30%;
         margin: 5px 4px;
        display: inline-block;
    }
    #tuijian dl dd{
        background: #E4E4E4;
        text-align: center;
        padding: 2px 0;
    }*/
    .breakfast_wrapper {
        width: 100%;
    }

    .breakfast_wrapper dl {
        display: inline-block;
        width: 30%;
        margin: 4px;
    }

    .breakfast_wrapper dl dt {
        width: 100%;
    }

    .breakfast_wrapper dl dt img {
        width: 100%;
        border: 1px solid #ccc;
    }

    .breakfast_wrapper dl dd {
        background: #CCCCCC;
    }

    .breakfast_wrapper dl dd p {
        line-height: 24px;
        margin: 0;
    }

    .meal {
        text-align: center;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .amount {
        text-align: center;
        font-size: 12px;
        color: #9B9B9B;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    #morningMeal, #afternoon, #before_bed {
        display: flex;
        padding: 20px 0;
    }

    #morningMeal div, #afternoon div, #before_bed div {
        line-height: 45px;
    }

    .addMealText {
        width: 40%;
        padding-left: 20px;
    }

    .addMealImg {
        width: 50px;
        height: 50px;
    }

    .addMealImg img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .addMealContent {
        flex: 1;
        line-height: 16px !important;
        margin-top: 12px;
        text-align: right;
        font-size: 12px;
        color: #4A4A4A;
    }

</style>

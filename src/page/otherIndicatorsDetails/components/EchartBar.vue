<template>
    <div>
        <div v-if="barData.dataList.length" ref="barChart" id="myChart">
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            barData: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                title: ''
            }
        },
        updated () {
            this.drawLine()
        },
        mounted () {
            this.drawLine()
        },
        methods: {
            drawLine () {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                var xAxisData = []
                var data1 = []
                if (!this.barData.dataList.length) {
                    return false
                } else {
                    let code = this.barData.dataList[0].quotaCode
                    switch (code) {
                        case 'XYZBXY0010240':
                            this.title = '体脂/%'
                            break
                        case 'XYZBXY0010241':
                            this.title = '体脂/%'
                            break
                        case 'XYZBXY001007':
                            this.title = '体重/kg'
                            break
                        case 'XYZBXY001008':
                            this.title = '血糖/mmol/l'
                            break
                        case 'XYZBXY001013':
                            this.title = '身高/cm'
                            break
                        case 'XYZBXY001006':
                            this.title = '体温/℃'
                            break
                        case 'XYZBXY001004':
                            this.title = '血氧%'
                            break
                        case 'XYZBXY001025':
                            this.title = '防摔指数/分'
                            break
                        case 'XYZBXY001026':
                            this.title = '睡眠/小时'
                            break
                        case 'XYZBXY001005':
                            this.title = '心率/次'
                            break
                        case 'XYZBXY001027/XYZBXY001028/XYZBXY001026':
                            this.title = '睡眠/小时'
                            break
                    }
                    let charData = this.barData.dataList.filter(function (el, index, self) {
                        return index < 7
                    })
                    console.log('charData', charData)
                    for (let i = 0; i < charData.length; i++) {
                        console.log('charData[i].quotaDate', charData[i].quotaDate)
                        let day = charData[i].quotaDate.substring(5, 10)
                        let time = charData[i].quotaDate.substring(11, 16)
                        xAxisData.push(day + '\n' + time)
                        data1.push(charData[i].quotaValue)
                    }
                    let itemStyle = {
                        normal: {
                            barBorderRadius: 5,
                            label: {
                                show: true,
                                position: 'outside'
                            },
                            color: '#2378f7'
                        },
                        emphasis: {
                            label: {
                                position: 'outside'
                            },
                            barBorderColor: '#fff',
                            barBorderWidth: 1,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0
//                      shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    }
                    let label = {
                        normal: {
                            //  position: 'insideLeft'
                            position: 'top',
                            color: '#000'
                            //  color: 'red'
                        },
                        emphasis: {
                            position: 'insideLeft'
                        }
                    }
                    myChart.setOption({
                        title: {
                            padding: 0
                        },
                        legend: {
                            inactiveColor: '#abc',
                            // inactiveColor: 'red',
                            // borderWidth: 7,
                            data: [this.title],
                            align: 'left',
                            tooltip: {
                                show: true
                            }
                        },
                        tooltip: {show: false},
                        // yAxis   xAxis
                        xAxis: {
                            data: xAxisData,
                            name: '',
                            silent: false,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: true
                            },
                            splitLine: {
                                show: true
                                //  show: false
                            },
                            splitArea: {
                                show: true
                                //  show: false
                            },
                            axisLabel: {
                                interval: 0
                            }
                        },
                        yAxis: {
                            //                      inverse: true,
                            axisTick: {
                                show: false
                            },
                            splitArea: {
                                show: false
                            }
                        },
                        grid: {x: '10%', y: 50, x2: 5, y2: 40},
                        series: [{
                            name: this.title,
                            type: 'bar',
                            stack: 'one',
                            itemStyle: itemStyle,
                            label: label,
                            data: data1,
                            barWidth: 20  //  柱图宽度
                        }]
                    })
                    window.onresize = myChart.resize
                }
            }
        }

    }
</script>
<style scoped>
    #myChart {
        width: 100%;
        height: 400px;
        margin-top: 10px;
    }
    .chart_title {
        font-size: 18px;
        color: #666666;
    }
</style>
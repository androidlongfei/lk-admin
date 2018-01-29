<!-- 柱状图 -->
<template>
    <div>
        <div v-if="pressureData.dataList.length" ref="barChart" id="myChart">
        </div>
        <div v-if="!pressureData.dataList.length">暂时没有数据,请添加数据!!!!</div>
    </div>
</template>

<script>
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/componen' + 't/tooltip')
    require('echarts/lib/component/title')
    export default {
        name: 'hello',
        props: {
            pressureData: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                title: ['', ''],
                gap: '30%'
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
                let xAxisData = []
                let data1 = []
                let data2 = []
                if (!this.pressureData.dataList) {
                    return false
                }
                if (this.pressureData.code === 'pressure') {
                    this.title[0] = '高血压'
                    this.title[1] = '低血压'
                } else if (this.pressureData.code === 'fat') {
                    this.title[0] = '高血脂'
                    this.title[1] = '低血脂'
                    this.gap = '150%'
                } else if (this.pressureData.code === 'sleep') {
                    this.title[0] = '深度睡眠'
                    this.title[1] = '浅度睡眠'
                }
                let charData = []
                if (this.pressureData.code === 'fat') {
                    charData = this.pressureData.dataList.filter(function (el, index, arr) {
                        return index < 6
                    })
                } else {
                    charData = this.pressureData.dataList.filter(function (el, index, arr) {
                        return index < 7
                    })
                }
                for (let i = 0; i < charData.length; i++) {
                    let day = charData[i].quotaDate.substring(5, 10)
                    let time = charData[i].quotaDate.substring(11, 16)
                    xAxisData.push(day + '\n' + time)
                    data1[i] = charData[i].highValue
                    data2[i] = charData[i].lowValue
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
                    }
                }
                let label = {
                    normal: {
                        position: 'top',
                        color: '#000'
                    },
                    emphasis: {
                        position: 'insideLeft'
                    }
                }
                myChart.setOption({
                    title: {
                        text: this.text,
                        padding: 0
                    },
                    legend: {
                        inactiveColor: '#abc',
                        //  borderWidth: 7,
                        data: [this.title[0], this.title[1]],
                        align: 'left',
                        tooltip: {
                            show: true
                        }
                    },
                    tooltip: {show: false},
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
                        },
                        splitArea: {
                            show: true
                        },
                        axisLabel: {
                            interval: 0
                        }
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        }
                    },
                    grid: {x: '10%', y: 50, x2: 5, y2: 40},
                    series: [{
                        name: this.title[0],
                        type: 'bar',
                        itemStyle: itemStyle,
                        label: label,
                        data: data1,
                        barWidth: 12,  //  柱图宽度
                        barGap: this.gap
                    },
                    {
                        name: this.title[1],
                        type: 'bar',
                        label: label,
                        data: data2,
                        barWidth: 12,  //  柱图宽度
                        barGap: this.gap,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                label: {
                                    show: true,
                                    position: 'outside'
                                },
                                color: 'yellow'
                            }
                        }
                    }]
                })
                window.onresize = myChart.resize
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

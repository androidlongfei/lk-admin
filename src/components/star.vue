<template>
    <div style="display: inline-block">
        <i :class="item" v-for="(item, index) in stars" :key="index"></i>
    </div>
</template>

<script>
    export default {
        props: {
            score: {
                type: [String, Number],
                default: 0
            }
        },
        methods: {
            drawStar(starNumber) {
                let arr = [];
                for (let i = 0; i < this.score; i++) {
                    arr.push('fa fa-star')
                }
                this.stars = arr;
            }
        },
        data() {
            return {
                stars: [],
                lastScore: ''
            }
        },
        updated() {
            console.log('score', this.score)
            if (this.score && this.lastScore !== this.score) {
                this.lastScore = this.score
                this.drawStar(this.lastScore)
            }
        },
        mounted() {
            if (this.score) {
                this.drawStar(this.score)
            }
        }
    }
</script>

<style scoped>
</style>

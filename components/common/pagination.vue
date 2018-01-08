<template lang="pug">
    ul.c-pagination-container
        li.c-page(@click="activeIndex=1",:class="{'c-disabled':activeIndex===1}")
            i.fa.fa-angle-double-left
        li.c-page(@click="leftClick",:class="{'c-disabled':activeIndex===1}")
            i.fa.fa-angle-left
        li.c-page(v-for="index in totalPages",:key="index",:class="{'c-active':activeIndex===index}",@click="activeIndex=index") {{index}}
        li.c-page(@click="rightClick",:class="{'c-disabled':activeIndex===totalPages}")
            i.fa.fa-angle-right
        li.c-page(@click="activeIndex=totalPages",:class="{'c-disabled':activeIndex==totalPages}")
            i.fa.fa-angle-double-right
</template>

<script>
    export default {
        name: "pagination",
        props: {
            total: {
                type: Number
            },
            pageSize: {
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                activeIndex: 1
            }
        },
        watch: {
            activeIndex(val) {
                this.$emit('pageChange', val)
            }
        },
        computed: {
            totalPages() {
                return Math.floor((this.total + this.pageSize - 1) / this.pageSize)
            }
        },
        methods: {
            rightClick() {
                if (this.activeIndex === this.totalPages) {
                    return
                }
                this.activeIndex++
            },
            leftClick() {
                if (this.activeIndex === 1) {
                    return
                }
                this.activeIndex--
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-pagination-container {
        position: relative;
        text-align: center;
        .c-page {
            display: inline-block;
            font-size: 1em;
            font-weight: bold;
            height: 2em;
            width: 2em;
            line-height: 2em;
            text-align: center;
            cursor: pointer;
            background-color: $color-background;
            margin: 0 0.2em;
            &:hover {
                color: $color-primary;
            }
        }
        .c-active {
            color: $color-primary;
        }
        .c-disabled {
            color: $color-disabled;
            cursor: not-allowed;
            &:hover{
                color: $color-disabled;;
            }
        }
    }
</style>
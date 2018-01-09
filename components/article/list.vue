<template lang="pug">
    .c-article-list-container
        transition-group(name="list",tag="div")
            item.item(v-for="article in articles",:key="article.id",:article="article")
        pagination(:total="total",:pageSize="pageSize",@pageChange="pageChange")
</template>

<script>
    import Item from './item'
    import Pagination from '../common/pagination'

    export default {
        name: 'article-list',
        props: {
            articles: {
                type: Array,
                default: []
            },
            total: {
                type: Number
            },
            pageSize: {
                type: Number
            }

        },
        data() {
            return {}
        },
        methods: {
            pageChange(val) {
                this.$emit('pageChange', val)
            }
        },
        components: {
            Item,
            Pagination
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-article-list-container {
        position: relative;
        overflow: hidden;
        .item {
            margin-bottom: 1em;
        }
        .list-enter-active {
            transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
        }
        .list-leave-active {
            display: none;
        }
        .list-enter {
            opacity: 0;
            transform: translateX(100%);
        }
        .list-enter-to {
            opacity: 1;
            transform: translateX(0);
        }

    }


</style>

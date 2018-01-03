<template lang="pug">
    .self-info-container
        template(v-if="drafts.length>0")
            h2.title 草稿
            ul.draft-wrapper
                li.draft(v-for="(draft,index) in drafts",:key="index")
                    nuxt-link.title(:to="{path:'/article/write',query:{draftId:draft.id}}") {{draft.title}}
        template(v-if="categories.length>0")
            h2.title 常用分类
            .list-wrapper
                .item(v-for="(category,index) in categories",:key="index")
                    c-category-item(:category="category")
        template(v-if="articles.length>0")
            h2.title 最近文章
            .list-wrapper
                .item(v-for="(article,index) in articles",:key="index")
                    c-article-item(:article="article")
</template>

<script>
    import CArticleItem from '~/components/article/item'
    import CCategoryItem from '~/components/category/item'

    export default {
        name: "info",
        async asyncData({params, store}) {
            const userId = params.id
            const result = {}
            await store.$api.category.getAllByUserId({
                userId,
                pageNum: 1,
                pageSize: 4,
                sorts: 'weight DESC'
            }).then(data => {
                result.categories = data.data
            }).catch()
            await store.$api.article.getAllByUserId({
                userId,
                pageSize: 6,
                pageNum: 1,
                sorts: 'updateTime DESC'
            }).then(data => {
                result.articles = data.data
            }).catch()
            await store.$api.draft.getAllByUserId({
                userId,
                pageNum: 1,
                pageSize: 100
            }).then(data => {
                result.drafts = data.data
            })
            return result
        },
        data() {
            return {}
        },
        mounted() {
        },
        components: {
            CArticleItem,
            CCategoryItem
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .self-info-container {
        .title {
            font-size: 1.1rem;
        }
        .draft-wrapper {
            list-style: none;
            .title {
                display: block;
                border: 1px solid $color-border-base;
                border-radius: 0.5rem;
                padding: 1rem;
                margin-bottom: 1rem;
            }
        }
        .list-wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-right: -1rem;
            .item {
                width: calc(50% - 1rem);
                margin-right: 1rem;
                margin-bottom: 1rem;
                font-size: 0.8rem;
                font-weight: normal;
            }
        }

    }
</style>
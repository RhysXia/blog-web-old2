<template lang="pug">
    .c-self-info-container
        template(v-if="drafts.length>0")
            h2.title 草稿
            ul.draft-wrapper
                li.draft(v-for="(draft,index) in drafts",:key="index")
                    nuxt-link.title(:to="{path:'/article/write',query:{draftId:draft.id}}") {{draft.title}}
        template(v-if="categories.length>0")
            h2.title 常用分类
            .categories
                .category(v-for="(category,index) in categories",:key="index")
                    nuxt-link(:to="'/category/'+category.id")
                        .subtitle {{category.name}}
                    .desc {{category.description}}
                    .count
                        i.fa.fa-book
                        | {{category.articleCount}}
        template(v-if="articles.length>0")
            h2.title 最近文章
            .article-wrapper
                .article(v-for="(article,index) in articles",:key="index")
                    article-item(:article="article")
</template>

<script>
    import ArticleItem from '~/components/article/item'

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
            ArticleItem
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-self-info-container {
        .title {
            font-size: 1.1rem;
        }
        .draft-wrapper{
            list-style: none;
            .title{
                display: block;
                border: 1px solid $color-border-base;
                border-radius: 0.5rem;
                padding: 1rem;
                margin-bottom: 1rem;
            }
        }
        .article-wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-right: 1rem;
            .article {
                width: calc(50% - 1rem);
                margin-right: 1rem;
                font-size: 0.8rem;
                font-weight: normal;
            }
        }
        .categories {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-right: 2rem;
            .category {
                box-sizing: border-box;
                width: calc(50% - 2rem);
                border: 1px solid $color-border-base;
                font-size: 0.8rem;
                margin-right: 2rem;
                margin-bottom: 1rem;
                padding: 1rem;
                border-radius: 0.5rem;
                .subtitle {
                    margin-bottom: 0.5rem;
                }
                .desc {
                    color: $color-text-light;
                    margin-bottom: 0.5rem;
                }
                .count {
                    i {
                        padding-right: 0.25rem;
                    }
                }
            }
        }
    }
</style>
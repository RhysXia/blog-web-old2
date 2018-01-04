<template lang="pug">
    .c-category-container
        .category
            h1.name {{category.name}}
            p.desc {{category.description}}
            p.count 文章数：{{category.articleCount}}
        c-article-list(:articles="articles",:hasMore="hasMore",:loadMore="loadMore")
</template>

<script>
    import CArticleList from '~/components/article/list'

    export default {
        validate({params}) {
            return /^\d+$/.test(params.id)
        },
        asyncData({params, store, error}) {
            const categoryId = params.id
            const result = {
                articles: [],
                pageNum: 0,
                pageSize: 10,
                category: {}

            }
            return store.$api.category.getById(categoryId).then(data => {
                result.category = data.data
            }).then(() => {
                return store.$api.article.getAllByCategoryId({
                    categoryId,
                    pageNum: result.pageNum + 1,
                    pageSize: result.pageSize,
                    sorts: 'updateTime DESC'
                }).then(data => {
                    result.pageNum++
                    result.articles = data.data
                })
            }).then(() => {
                return result
            }).catch(err => {
                error({statusCode: 500, message: err.message})
            })
        },
        computed: {
            hasMore() {
                return this.pageNum * this.pageSize < this.category.articleCOunt
            }
        },
        methods: {
            loadMore() {
                return this.$api.article.getAllByCategoryId({
                    categoryId: this.category.id,
                    pageNum: this.pageNum + 1,
                    pageSize: this.pageSize,
                    sorts: 'updateTime DESC'
                }).then(data => {
                    this.pageNum++
                    this.articles = this.articles.concat(data.data)
                })
            }
        },
        components: {
            CArticleList
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-category-container{
        .category{
            background-color: $color-background;
            margin-bottom: 1rem;
            padding: 1rem;
            .name{
                text-align: center;
            }
            .desc{
                color: $color-text-light;
            }
        }
    }
</style>
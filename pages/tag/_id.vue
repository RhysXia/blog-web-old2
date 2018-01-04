<template lang="pug">
    .c-tag-container
        .tag
            h1.name {{tag.name}}
            p.count 文章数：{{tag.articleCount}}
        c-article-list(:articles="articles",:hasMore="hasMore",:loadMore="loadMore")
</template>

<script>
    import CArticleList from '~/components/article/list'

    export default {
        validate({params}) {
            return /^\d+$/.test(params.id)
        },
        asyncData({params, store, error}) {
            const tagId = Number(params.id)
            const result = {
                articles: [],
                pageNum: 0,
                pageSize: 10,
                tag: {}

            }
            return store.$api.tag.getById(tagId).then(data => {
                result.tag = data.data
            }).then(() => {
                return store.$api.article.getAllByTagId({
                    tagId,
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
                return this.pageNum * this.pageSize < this.tag.articleCount
            }
        },
        methods: {
            loadMore() {
                return this.$api.article.getAllByTagId({
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

    .c-tag-container{
        .tag{
            background-color: $color-background;
            margin-bottom: 1rem;
            padding: 1rem;
            .name{
                text-align: center;
            }
        }
    }
</style>
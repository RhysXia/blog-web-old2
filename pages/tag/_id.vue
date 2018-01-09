<template lang="pug">
    .c-tag-container
        .tag
            h1.name {{tag.name}}
            p.count 文章数：{{tag.articleCount}}
        c-article-list(:articles="articles",:total="count",:pageSize="size",@pageChange="pageChange")
</template>

<script>
    import CArticleList from '~/components/article/list'

    export default {
        validate({params}) {
            const id = Number(params.id)
            return /^\d+$/.test(id)
        },
        async asyncData({params, store, error}) {
            const tagId = Number(params.id)
            const result = {
                articles: [],
                page: 0,
                size: 6,
                count: 0,
                tag: {}

            }
            try {
                let res = await store.$api.tag.getById(tagId)
                result.tag = res.data
                res = await store.$api.article.getAllByTagId({
                    tagId,
                    page: result.pageNum,
                    size: result.size,
                    sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
                })
                result.articles = res.data.content
                result.count = res.data.totalElements
                return result
            } catch (err) {
                error({statusCode: 500, message: err.message})
            }
        },
        methods: {
            async pageChange(val) {
                this.page = val - 1
                const res = await this.$api.article.getAllByTagId({
                    tagId: this.tag.id,
                    page: this.page,
                    size: this.size,
                    sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
                })
                this.count = res.data.totalElements
                this.articles = res.data.content
            }
        },
        components: {
            CArticleList
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-tag-container {
        .tag {
            background-color: $color-background;
            margin-bottom: 1rem;
            padding: 1rem;
            .name {
                text-align: center;
            }
        }
    }
</style>
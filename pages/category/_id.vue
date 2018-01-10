<template lang="pug">
    .c-category-container
        .category
            h1.name {{category.name}}
            p.desc {{category.description}}
            p.count 文章数：{{category.articleCount}}
        c-article-list(:articles="articles",:total="count",:pageSize="size",@pageChange="pageChange")
</template>

<script>
  import CArticleList from '~/components/article/list'

  export default {
    validate ({params}) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({params, store, error}) {
      const categoryId = Number(params.id)
      const result = {
        articles: [],
        page: 0,
        size: 6,
        count: 0,
        category: {}

      }
      try {
        let res = await store.$api.category.getById(categoryId)
        result.category = res.data
        res = await store.$api.article.getAllByCategoryId({
          categoryId,
          page: result.page,
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
      async pageChange (val) {
        this.page = val - 1
        const res = await this.$api.article.getAllByCategoryId({
          categoryId: this.category.id,
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

    .c-category-container {
        .category {
            background-color: $color-background;
            margin-bottom: 1rem;
            padding: 1rem;
            .name {
                text-align: center;
            }
            .desc {
                color: $color-text-light;
            }
        }
    }
</style>
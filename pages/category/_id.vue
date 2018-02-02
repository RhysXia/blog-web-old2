<template lang="pug">
    .c-category
        .c-category__header
            h1.name {{category.name}}
            p.desc {{category.description}}
            p.count 文章数：{{category.articleNum}}
        c-article-item(:article="article",v-for="article in articles",:key="article.id")
        c-pagination(@change="pageChange",:totalPages="totalPages",:page="page")

</template>

<script>
  import CArticleItem from '~/components/article/item-show'
  import CPagination from '~/components/common/pagination'

  export default {
    head () {
      const keywords = this.articles.map(it => it.title)
      return {
        title: this.category.name,
        meta: [
          {name: 'keywords', content: keywords.join(',')},
          {name: 'description', content: this.category.description}
        ]
      }
    },
    watchQuery: ['page'],
    key: to => to.fullPath,
    validate ({params}) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({params, query, store, error}) {
      const categoryId = Number(params.id)
      const page = Number(query.page || 1)
      const size = 8
      const data = {
        articles: [],
        page,
        size,
        totalPages: 0,
        category: {}
      }
      try {
        let res = await store.$api.category.getById(categoryId)
        data.category = res.data
        res = await store.$api.article.getAllByCategoryId({
          categoryId,
          page: page - 1,
          size,
          sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
        })
        data.articles = res.data.content
        data.totalPages = res.data.totalPages
        return data
      } catch (err) {
        error({statusCode: 500, message: err.message})
      }
    },
    methods: {
      async pageChange (val) {
        if (val === this.page) {
          let res = await this.$api.article.getAllByCategoryId({
            categoryId: this.category.id,
            page: val - 1,
            size: this.size,
            sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
          })
          this.articles = res.data.content
          this.totalPages = res.data.totalPages
          return
        }
        this.$router.push({
          path: `/category/${this.category.id}`,
          query: {
            page: val
          }
        })
      }
    },
    components: {
      CArticleItem,
      CPagination
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/application";

    .c-category {
        > * {
            margin-bottom: 1em;
        }
        .c-category__header {
            background-color: $bg-color;
            padding: 1em;
            .name, .desc {
                text-align: center;
            }
        }
    }
</style>

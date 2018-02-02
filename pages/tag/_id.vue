<template lang="pug">
    .c-tag
        .tag__header
            h1.name {{tag.name}}
            p.count 文章数：{{tag.articleNum}}
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
        title: this.tag.name,
        meta: [
          {name: 'keywords', content: keywords.join(',')}
        ]
      }
    },
    watchQuery: ['page'],
    key: to => to.fullPath,
    validate ({params}) {
      const id = Number(params.id)
      return /^\d+$/.test(id)
    },
    async asyncData ({params, query, store, error}) {
      const tagId = Number(params.id)
      const page = Number(query.page || 1)
      const size = 8
      const data = {
        articles: [],
        page,
        size,
        totalPages: 0,
        tag: {}

      }
      try {
        let res = await store.$api.tag.getById(tagId)
        data.tag = res.data
        res = await store.$api.article.getAllByTagId({
          tagId,
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
          let res = await this.$api.article.getAllByTagId({
            tagId: this.tag.id,
            page: val - 1,
            size: this.size,
            sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
          })
          this.articles = res.data.content
          this.totalPages = res.data.totalPages
          return
        }
        this.$router.push({
          path: `/tag/${this.tag.id}`,
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

    .c-tag {
        > * {
            margin-bottom: 1em;
        }
        .tag__header {
            background-color: $bg-color;
            margin-bottom: 1em;
            padding: 1em;
            .name {
                text-align: center;
            }
        }
    }
</style>

<template lang="pug">
    .self-info-container
        template(v-if="drafts.length>0")
            h2.title 草稿
            c-draft-list(:drafts.sync="drafts")
        template(v-if="categories.length>0")
            h2.title 常用分类
            c-category-list(:categories.sync="categories")
        template(v-if="articles.length>0")
            h2.title 最近文章
            c-article-list.article-list(:articles.sync="articles",:showPage="false")
</template>

<script>
  import CArticleList from '~/components/article/list'
  import CCategoryList from '~/components/category/list'
  import CDraftList from '~/components/draft/list'

  export default {
    name: 'info',
    async asyncData ({params, store, error}) {
      const userId = Number(params.id)
      const result = {
        categories: [],
        articles: [],
        drafts: []
      }
      try {
        let res = await store.$api.category.getAllByUserId({
          userId,
          page: 0,
          size: 4,
          sort: 'weight,DESC'
        })
        result.categories = res.data.content
        res = await store.$api.article.getAllByUserId({
          userId,
          page: 0,
          size: 6,
          sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
        })
        result.articles = res.data.content

        if (store.getters.permissions.includes('GET:/drafts/self')) {
          res = await store.$api.draft.getSelf({page: 0, size: 100})
          result.drafts = res.data.content
        }

        return result
      } catch (err) {
        error(err)
      }
    },
    data () {
      return {}
    },
    components: {
      CArticleList,
      CCategoryList,
      CDraftList
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

        .article-list {
            font-size: 0.6rem;
        }

    }
</style>

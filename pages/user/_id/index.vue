<template lang="pug">
    .self-info-container
        template(v-if="drafts.length>0")
            h2.title 草稿
            c-draft-item.item(v-for="draft in drafts",:key="draft.id",:draft="draft")
        template(v-if="categories.length>0")
            h2.title 常用分类
            c-category-item.item(v-for="category in categories",:key="category.id",:category="category")

        template(v-if="articles.length>0")
            h2.title 最近文章
            c-article-item.item(v-for="article in articles",:key="article.id",:article="article")
</template>

<script>
  import CArticleItem from '~/components/article/item'
  import CCategoryItem from '~/components/category/item'
  import CDraftItem from '~/components/draft/item'

  export default {
    name: 'info',
    async asyncData ({params, store, error}) {
      const userId = Number(params.id)
      try {
        const data = {
          categories: [],
          drafts: [],
          articles: []
        }
        let res = await store.$api.category.getAllByUserId({
          userId,
          page: 0,
          size: 4,
          sort: 'weight,DESC'
        })
        data.categories = res.data.content

        res = await store.$api.article.getAllByUserId({
          userId,
          page: 0,
          size: 6,
          sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
        })
        data.articles = res.data.content

        if (store.getters.permissions.includes('GET:/drafts/self')) {
          res = await store.$api.draft.getSelf({page: 0, size: 100})
          data.drafts = res.data.content
        }
        return data
      } catch (err) {
        error({statusCode: err.statusCode, message: err.message})
      }
    },
    components: {
      CArticleItem,
      CCategoryItem,
      CDraftItem
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .self-info-container {
        .title {
            font-size: 1.1em;
        }
        .item{
            margin-bottom: 1em;
        }
    }
</style>

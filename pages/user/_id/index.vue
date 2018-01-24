<template lang="pug">
    .self-info-container
        template(v-if="draftList.content&&draftList.content.length>0")
            h2.title 草稿
            c-draft-item(v-for="draft in draftList.content",:key="draft.id",:draft="draft")
        template(v-if="categoryList.content&&categoryList.content.length>0")
            h2.title 常用分类
            c-category-item(v-for="category in categoryList.content",:key="category.id",:category="category")

        template(v-if="articleList.content&&articleList.content.length>0")
            h2.title 最近文章
            c-article-item(v-for="article in articleList.content",:key="article.id",:article="article")
</template>

<script>
  import CArticleItem from '~/components/article/item'
  import CCategoryItem from '~/components/category/item'
  import CDraftItem from '~/components/draft/item'
  import { mapState } from 'vuex'

  export default {
    name: 'info',
    async asyncData ({params, store, error}) {
      const userId = Number(params.id)
      try {
        let res = await store.$api.category.getAllByUserId({
          userId,
          page: 0,
          size: 4,
          sort: 'weight,DESC'
        })
        store.commit('category/setList', res.data)
        res = await store.$api.article.getAllByUserId({
          userId,
          page: 0,
          size: 6,
          sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
        })
        store.commit('article/setList', res.data)

        if (store.getters.permissions.includes('GET:/drafts/self')) {
          res = await store.$api.draft.getSelf({page: 0, size: 100})
          store.commit('draft/setList', res.data)
        }
      } catch (err) {
        error({statusCode: err.statusCode, message: err.message})
      }
    },
    computed: {
      ...mapState({
        articleList: state => state.article.list,
        draftList: state => state.draft.list,
        categoryList: state => state.category.list
      })
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

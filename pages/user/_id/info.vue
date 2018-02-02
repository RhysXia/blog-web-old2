<template lang="pug">
    .self-info-container
        .wrapper(v-if="articles.length>0")
            h2.title 最近文章
            c-article-item(v-for="article in articles",:key="article.id",:article="article")
        .wrapper(v-if="comments.length>0")
            h2.title 最近评论
            c-comment-item(v-for="comment in comments",:key="comment.id",:comment="comment")
</template>
<script>
  import CArticleItem from '~/components/article/item-show'
  import CCommentItem from '~/components/comment/item-show'

  export default {
    async asyncData ({params, store, error}) {
      const userId = Number(params.id)
      try {
        const data = {
          articles: [],
          comments: [],
          userId
        }
        let res = await store.$api.article.getAllByUserId({
          userId,
          page: 0,
          size: 6,
          sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
        })
        data.articles = res.data.content

        res = await store.$api.comment.getAllByUserId({
          userId,
          page: 0,
          size: 6,
          sort: ['createAt,DESC']
        })
        data.comments = res.data.content
        return data
      } catch (err) {
        error({statusCode: err.statusCode, message: err.message})
      }
    },
    components: {
      CArticleItem,
      CCommentItem
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/application";

    .self-info-container {
        .title {
            font-size: 1.2em;
            margin: 0 0 0.5em 0;
            padding: 0;
            font-weight: bold;
        }

        .c-article-item--show {
            font-size: 0.9em;
            margin-bottom: 0.5em;
        }
    }
</style>

<template lang="pug">
    .article-container
        r-article(:article="article")
        r-comment(:comments="comments")

</template>
<script>
  import ArticleApi from '~/api/article-api'
  import RArticle from '~/components/Article/article'
  import RComment from '~/components/Article/comment'

  export default {
    components: {
      RArticle,
      RComment
    },
    validate ({params}) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({params}) {
      const id = params.id
      const data = {
        article: {},
        comments: []
      }
      await ArticleApi.getArticleById(id).then(res => {
        if (res.data.code === 0) {
          data.article = res.data.result
        }
      })
      await ArticleApi.getCommentsByArticleId(id, 0, 50).then(res => {
        if (res.data.code === 0) {
          data.comments = res.data.result.data
        }
      })
      return data
    }
  }
</script>
<style lang="stylus" scoped>
    .article-container
        >*
            margin-bottom 10px
        &:last-child
            margin-bottom inherit
</style>

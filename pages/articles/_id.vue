<template lang="pug">
    .article-container
        r-article(:article="article")
</template>
<script>
  import ArticleApi from '~/api/article-api'
  import RArticle from '~/components/Article/article'

  export default {
    components: {
      RArticle
    },
    validate ({params}) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({params}) {
      const id = params.id
      const data = {
        article: {}
      }
      await ArticleApi.getArticleById(id).then(res => {
        if (res.data.code === 0) {
          data.article = res.data.result
        }
      })
      return data
    }
  }
</script>
<style lang="stylus" scoped>

</style>
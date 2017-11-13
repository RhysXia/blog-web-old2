<template lang="pug">
    .content asfasdgdfghfrghsrtetr


</template>
<script>

  import ArticleApi from '~/api/article-api'

  export default {
    components: {},
    computed: {
      hotArticles () {
        return this.$store.state.article.hotArticles
      }
    },
    data () {
      return {
      }
    },
    async asyncData () {
      const data = {
        page: 0,
        size: 10,
        articles: [],
        hasMore: true
      }
      await ArticleApi.getArticles(data.page, data.size).then(res => {
        if (res.data.code === 0) {
          data.articles.push(res.data.result.data)
          data.page++
          data.hasMore = res.data.result.totalPages > data.page
        }
      })
      return data
    }
  }
</script>

<style lang="stylus">

</style>

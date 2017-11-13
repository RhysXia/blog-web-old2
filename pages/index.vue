<template lang="pug">
    .content
        .swiper-wrapper
            r-swiper(:articles="hotArticles")
        r-article-list(:articles="articles",:hasMore="hasMore",:v-model="isLoading",@on-load="onLoad")

</template>
<script>

  import ArticleApi from '~/api/article-api'
  import RArticleList from '~/components/article-list'
  import RSwiper from '~/components/swiper'

  export default {
    components: {
      RArticleList,
      RSwiper
    },
    computed: {
      hotArticles () {
        return this.$store.state.article.hotArticles
      }
    },
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      onLoad () {
        ArticleApi.getArticles(this.page, this.size).then(res => {
          if (res.data.code === 0) {
            res.data.result.data.forEach(article => {
              this.articles.push(article)
            })
            this.page++
            this.hasMore = res.data.result.totalPages > this.page
          }
        })
        this.isLoading = false
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
          res.data.result.data.forEach(article => {
            data.articles.push(article)
          })
          data.page++
          data.hasMore = res.data.result.totalPages > data.page
        }
      })
      return data
    }
  }
</script>

<style lang="stylus">
    .content
        .swiper-wrapper
            height 200px
            margin-bottom 10px
</style>

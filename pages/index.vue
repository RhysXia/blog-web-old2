<template lang="pug">
    .content
        .swiper-container
            r-swiper(:list="hotArticles")
                template(scope="{item}")
                    nuxt-link.article-wrapper(:to="'/articles/'+item.id")
                        img.poster(:src="item.poster")
                        span.title {{item.title}}
        r-load-more(:hasMore="hasMore",:v-model="isLoading",@on-load="onLoad")
            r-article-item(v-for="(article,index) in articles",:key="index",:article="article")

</template>
<script>

  import ArticleApi from '~/api/article-api'
  import RLoadMore from '~/components/Common/load-more'
  import RSwiper from '~/components/Common/swiper'
  import RArticleItem from '~/components/Article/article-item'

  export default {
    components: {
      RLoadMore,
      RSwiper,
      RArticleItem
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
          this.isLoading = false
        })
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
    @import "~assets/stylus/variables.styl"

    .content
        .swiper-container
            height 200px
            margin-bottom 10px
            width $main-width
            .article-wrapper
                display block
                width 100%
                height 100%
                .poster
                    width 100%
                    height 100%
                    transition transform 0.4s
                    &:hover
                        transform rotate(-5deg) scale(1.1)
                .title
                    position absolute
                    display block
                    padding 5px 10px
                    top 10px
                    right 10px
                    background-color $bg-dark-active-color
</style>

<template lang="pug">
    .index-container
        .carousel-wrapper
            c-carousel(width="100%",height="200px")
                c-carousel-item(v-for="(article,index) in  hotArticles",:key="index")
                    nuxt-link.article-image-wrapper(:to="'/article/'+article.id")
                        img.article-image(:src="article.poster")
                        span.title {{article.title}}
        c-article-list(:articles="articles",:hasMore="hasMore",:loadMore="loadMore")
</template>
<script>
  import { CCarouselItem, CCarousel } from '~/components/common/carousel'
  import CArticleList from '~/components/article/list'

  export default {
    head () {
      return {
        title: '首页'
      }
    },
    async asyncData ({store}) {
      const result = {
        articles: [],
        pageNum: 1,
        pageSize: 5,
        articleCount: 0
      }
      await store.$api.article.count().then(data => {
        result.articleCount = data.data
      }).catch((err) => {
      })
      await store.$api.article.getAll({
        pageSize: result.pageSize,
        pageNum: result.pageNum,
        sorts: 'updateTime DESC'
      }).then(data => {
        result.articles = data.data
      }).catch(() => {})

      return result
    },
    data () {
      return {
        articles: []
      }
    },
    methods: {
      async loadMore () {
        this.pageNum++
        await this.$api.article.getAll({
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          sorts: 'updateTime DESC'
        }).then(data => {
          data.data.forEach(it => {
            this.articles.push(it)
          })
        })
      }
    },
    computed: {
      hasMore () {
        return this.pageNum * this.pageSize < this.articleCount
      },
      hotArticles () {
        return this.$store.state.hotArticles
      }
    },
    components: {
      CCarousel,
      CCarouselItem,
      CArticleList
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .index-container {
        > * {
            margin-bottom: 1rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .carousel-wrapper {
            padding: 0.5rem;
            background-color: $color-background;
            .article-image-wrapper {
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
                .article-image {
                    width: 100%;
                    height: 100%;
                }
                .title {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    padding: 0.25rem 0.5rem;
                    background-color: $color-background;
                    opacity: 0.5;
                }
            }

        }

    }
</style>

<template lang="pug">
    .index-container
        .carousel-wrapper
            c-carousel(width="100%",height="200px")
                c-carousel-item(v-for="(article,index) in  hotArticles.slice(0)",:key="index")
                    nuxt-link.article-image-wrapper(:to="'/article/'+article.id")
                        img.article-image(:src="article.poster")
                        span.title {{article.title}}
        c-article-list(:articles="articles",:total="count",:pageSize="size",@pageChange="pageChange")
</template>
<script>
  import { CCarousel, CCarouselItem } from '~/components/common/carousel'
  import CArticleList from '~/components/article/list'

  export default {
    head () {
      return {
        title: '首页'
      }
    },
    async asyncData ({store, error}) {
      try {
        const result = {
          articles: [],
          count: 0,
          size: 6,
          page: 0
        }
        const {data} = await store.$api.article.getAll({
          page: result.page,
          size: result.size,
          sort: 'updateAt,DESC'
        })
        result.count = data.totalElements
        result.articles = data.content
        return result
      } catch (err) {
        error(err)
      }

    },
    data () {
      return {
        refresh: true
      }
    },
    methods: {
      async pageChange (val) {
        this.page = val - 1
        const res = await this.$api.article.getAll({
          page: this.page,
          size: this.size,
          sort: 'updateAt,DESC'
        })
        this.count = res.data.totalElements
        this.articles = res.data.content
      }
    },
    computed: {
      hotArticles () {
        return this.$store.state.article.hotArticles
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

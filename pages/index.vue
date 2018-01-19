<template lang="pug">
    .index-container
        .left
            .carousel-wrapper
                c-carousel(width="100%",height="200px")
                    c-carousel-item(v-for="(article,index) in  hotArticles.slice(0)",:key="index")
                        nuxt-link.article-image-wrapper(:to="'/article/'+article.id")
                            img.article-image(:src="article.poster")
                            span.title {{article.title}}
            c-article-list(:articles.sync="articles",:total="count",:pageSize="size",@pageChange="pageChange")
        .right
            c-panel(title="热门文章")
                .content
                    p.article-item(v-for="(article,index) in hotArticles",:key="index")
                        span.index {{index+1}}
                        nuxt-link(:to="'/article/'+article.id") {{article.title}}
            c-panel(title="热门标签")
                .content.tag-content
                    nuxt-link.tag-item(:to="'/tag/'+tag.id",v-for="(tag,index) in hotTags",:key="index") {{tag.name}}
</template>
<script>
  import { CCarousel, CCarouselItem } from '~/components/common/carousel'
  import CArticleList from '~/components/article/list'
  import CPanel from '~/components/common/panel'

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
          page: 0,
          hotArticles: [],
          hotTags: []
        }

        let res = await store.$api.article.getAll({
          page: 0,
          size: 6,
          sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
        })
        result.hotArticles = res.data.content

        res = await store.$api.tag.getAll({
          page: 0,
          size: 10,
          sort: ['articleNum,DESC']
        })
        result.hotTags = res.data.content

        res = await store.$api.article.getAll({
          page: result.page,
          size: result.size,
          sort: ['updateAt,DESC']
        })
        result.count = res.data.totalElements
        result.articles = res.data.content
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
    components: {
      CCarousel,
      CCarouselItem,
      CArticleList,
      CPanel
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .index-container {
        display: flex;
        flex-direction: row;
        .left{
            width: $width-main - 18 - 1;
            margin-right: 1rem;
        }
        .right{
            width: 18em;
        }
    }
    .carousel-wrapper {
        padding: 0.5em;
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
                top: 1em;
                right: 1em;
                padding: 0.25em 0.5em;
                background-color: $color-background;
                opacity: 0.5;
            }
        }

    }
    .c-article-list-container{
        margin-top: 1em;
    }
    .article-item{
        .index{
            display: inline-block;
            background-color: $color-background-active;
            width: 1.5em;
            height: 1.5em;
            line-height: 1.5em;
            text-align: center;
        }
    }
    .c-panel-container{
        margin-bottom: 1rem;
    }
    .tag-content{
        margin:0 -0.5em;
    }
    .tag-item{
        display: inline-block;
        padding: 0.25em;
        background-color: $color-background;
        margin: 0.5em;
        &:hover{
            background-color: $color-background-active;
        }
    }
</style>

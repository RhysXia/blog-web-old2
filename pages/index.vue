<template lang="pug">
    c-row.index(:gutter="14")
        c-col(:span="18")
            .index__carousel(v-if="hotArticles.length>0")
                c-carousel
                    c-carousel-item(v-for="(article,index) in  hotArticles",:key="index")
                        nuxt-link.index__carousel__content(:to="'/article/'+article.id")
                            img.article__image(:src="article.poster")
                            span.article__title {{article.title}}
            .index__articles
                c-article-item.article-wrapper(:article="article",v-for="article in articles",:key="article.id")
                c-pagination(@change="pageChange",:totalPages="totalPages",:page="page")
        c-col(:span="6",v-fixed)
            c-panel(title="热门文章",v-if="hotArticles.length>0")
                ul.index__panel--articles
                    li.article-item(v-for="(article,index) in hotArticles",:key="index")
                        nuxt-link(:to="'/article/'+article.id")
                            span.index {{index+1}}
                            | {{article.title}}
            c-panel(title="热门标签",v-if="hotTags.length>0")
                ul.index__panel--tags
                    li.tag-item(v-for="(tag,index) in hotTags",:key="index")
                        nuxt-link(:to="'/tag/'+tag.id") {{tag.name}}
</template>
<script>
  import { CCarousel, CCarouselItem } from '~/components/common/carousel'
  import CArticleItem from '~/components/article/item-show'
  import CPanel from '~/components/common/panel'
  import CPagination from '~/components/common/pagination'
  import CTag from '~/components/common/tag'
  import fixed from '~/utils/directive/fixed'

  export default {
    directives: {
      fixed
    },
    head () {
      return {
        title: '首页'
      }
    },
    watchQuery: ['page'],
    key: to => to.fullPath,
    async asyncData ({store, error, query}) {
      const size = 8
      const page = Number(query.page || 1)
      try {
        const data = {
          hotArticles: [],
          hotTags: [],
          articles: [],
          page,
          size,
          totalPages: 0
        }
        // 热门文章
        let res = await store.$api.article.getAll({
          page: 0,
          size: 6,
          sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
        })
        data.hotArticles = res.data.content

        // 热门标签
        res = await store.$api.tag.getAll({
          page: 0,
          size: 10,
          sort: ['articleNum,DESC']
        })

        data.hotTags = res.data.content

        // 正常文章
        res = await store.$api.article.getAll({
          page: page - 1,
          size: size,
          sort: ['updateAt,DESC']
        })
        data.articles = res.data.content
        data.totalPages = res.data.totalPages
        return data
      } catch (err) {
        error({statusCode: err.statusCode, message: err.message})
      }
    },
    data () {
      return {
        refresh: true,
        delay: 0
      }
    },
    methods: {
      async pageChange (val) {
        if (val === this.page) {
          let res = await this.$api.article.getAll({
            page: val - 1,
            size: this.size,
            sort: ['updateAt,DESC']
          })
          this.articles = res.data.content
          this.totalPages = res.data.totalPages
          return
        }
        this.$router.push({
          path: '/',
          query: {
            page: val
          }
        })
      }
    },
    components: {
      CCarousel,
      CCarouselItem,
      CArticleItem,
      CPanel,
      CPagination,
      CTag
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/application";

    .index {
        > * > * {
            margin-bottom: 1em;
        }
        .index__carousel {
            height: 15em;
            padding: 0.5em;
            background-color: $bg-color;
            .index__carousel__content {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                .article__image {
                    width: 100%;
                    height: 100%;
                }
                .article__title {
                    position: absolute;
                    display: block;
                    top: 1em;
                    right: 1em;
                    padding: 0.5em;
                    background-color: darken($bg-color, 10%);
                    transition: background-color 0.2s ease-in-out;
                    &:hover {
                        background-color: darken($bg-color, 15%);
                    }
                }
            }
        }
        .index__articles {
            > * {
                margin-bottom: 1em;
            }
        }


        .index__panel--articles,
        .index__panel--tags {
            list-style: none;
            margin: 0 0 -1em 0;
            padding: 0;
        }
        .index__panel--articles {
            .article-item {
                display: block;
                margin-bottom: 1em;
                a {
                    display: block;
                    .index {
                        display: inline-block;
                        padding: 0 0.5em;
                        color: $text-color;
                        background-color: darken($bg-color, 10%);
                        margin-right: 0.5em;
                        transition: 0.2s ease-in-out;
                    }
                    &:hover {
                        .index {
                            transform: rotate(360deg);
                            margin-right: 1em;
                        }
                    }
                }
            }
        }
        .index__panel--tags {
            margin-right: -0.5em;
            .tag-item {
                display: inline-block;
                margin: 0 0.5em 1em 0;
                a {
                    display: inline-block;
                    padding: 0.15em 0.5em;
                    background-color: darken($bg-color, 10%);
                    transition: 0.2s ease-in-out;
                    &:hover {
                        transform: skewX(-10deg) scale(1.1, 1.1);
                    }
                }
            }
        }
    }


</style>

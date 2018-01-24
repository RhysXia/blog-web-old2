<template lang="pug">
    .index-container
        .left
            .carousel-wrapper
                c-carousel(width="100%",height="200px")
                    c-carousel-item(v-for="(article,index) in  hotArticles.content.slice(0)",:key="index")
                        nuxt-link.article-image-wrapper(:to="'/article/'+article.id")
                            img.article-image(:src="article.poster")
                            span.title {{article.title}}
            .article-list
                c-article-item.article-wrapper(@delete="deleteArticle(article.id)",:article="article",v-for="article in articleList.content",:key="article.id")
                c-pagination(@change="pageChange",:totalPages="articleList.totalPages",:page="articleList.number+1")
        .right
            c-panel(title="热门文章")
                .content
                    p.article-item(v-for="(article,index) in hotArticles.content",:key="index")
                        span.index {{index+1}}
                        nuxt-link(:to="'/article/'+article.id") {{article.title}}
            c-panel(title="热门标签")
                .content.tag-content
                    nuxt-link.tag-item(:to="'/tag/'+tag.id",v-for="(tag,index) in hotTags.content",:key="index") {{tag.name}}
</template>
<script>
  import { CCarousel, CCarouselItem } from '~/components/common/carousel'
  import CArticleItem from '~/components/article/item'
  import CPanel from '~/components/common/panel'
  import { mapState } from 'vuex'
  import CPagination from '~/components/common/pagination'

  export default {
    head () {
      return {
        title: '首页'
      }
    },
    async asyncData ({store, error, query}) {
      const size = 6
      const page = (query.page || 1) - 1
      try {
        let res = await store.$api.article.getAll({
          page: 0,
          size: 6,
          sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
        })
        store.commit('article/setHotArticles', res.data)

        res = await store.$api.tag.getAll({
          page: 0,
          size: 10,
          sort: ['articleNum,DESC']
        })
        store.commit('tag/setHotTags', res.data)

        res = await store.$api.article.getAll({
          page: page,
          size: size,
          sort: ['updateAt,DESC']
        })
        store.commit('article/setList', res.data)
      } catch (err) {
        error({statusCode: err.statusCode, message: err.message})
      }
    },
    data () {
      return {
        refresh: true
      }
    },
    computed: {
      ...mapState({
        hotArticles: state => state.article.hotArticles,
        hotTags: state => state.tag.hotTags,
        articleList: state => state.article.list
      })
    },
    methods: {
      async deleteArticle (id) {
        try {
          await this.$api.article.deleteById(id)
          await this.pageChange(this.articleList.number + 1)
          this.$message({
            content: '删除成功',
            duration: 2000,
            type: 'success'
          })
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      async pageChange (val) {
        try {
          const page = val - 1
          const size = this.articleList.size
          const res = await this.$api.article.getAll({
            page, size, sort: 'updateAt,DESC'
          })
          this.$store.commit('article/setList', res.data)
          this.$router.push({
            path: '/',
            query: {
              page: val
            }
          })
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      }
    },
    components: {
      CCarousel,
      CCarouselItem,
      CArticleItem,
      CPanel,
      CPagination
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .index-container {
        display: flex;
        flex-direction: row;
        .left {
            width: $width-main - 18 - 1;
            margin-right: 1rem;
        }
        .right {
            width: 18em;
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

        .article-list {
            position: relative;
        }
        .article-wrapper {
            margin: 1em 0;
        }

        .c-panel-container {
            margin-bottom: 1rem;
        }

        .tag-content {
            margin: 0 -0.5em;
        }

        .tag-item {
            display: inline-block;
            padding: 0.25em 0.5em;
            background-color: $color-background-dark;
            margin: 0.5em;
            &:hover {
                background-color: $color-background-dark-active;
            }
        }
    }


</style>

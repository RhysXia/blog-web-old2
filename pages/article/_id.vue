<template lang="pug">
    .article-id-container
        .article-wrapper
            .header
                h1.title {{article.title}}
                .info
                    span
                        i.fa.fa-clock-o
                        | 创建{{article.createTime | formatDate}};
                        | 更新{{article.updateTime | formatDate}}
                    .right
                        button.link(@click="fullPageClick")
                            i.fa(:class="fullPage?'fa-compress':'fa-arrows-alt'")
                            | 全屏阅读
                        button.link(@click="partFullPageClick")
                            i.fa(:class="partFullPage?'fa-compress':'fa-expand'")
                            | 通栏阅读
                .info
                    span
                        i.fa.fa-eye
                        | {{article.readCount}}
                    span
                        i.fa.fa-heart
                        | {{article.likeCount}}
                    span
                        i.fa.fa-user
                        nuxt-link(:to="'/user/'+article.author.id") {{article.author.nickname}}
                    span
                        i.fa.fa-tag
                        template(v-for="(tag,index) in article.tags")
                            nuxt-link(:to="'/tag/'+tag.id") {{tag.name}}
                    span
                        i.fa.fa-list
                        nuxt-link(:to="'/category/'+article.category.id") {{article.category.name}}
            .body
                .content(v-html="content")
</template>

<script>
  import marked from '~/utils/marked'

  export default {
    validate ({params}) {
      return /^\d+$/.test(params.id)
    },
    head () {
      return {
        title: this.article.title
      }
    },
    computed: {
      fullPage () {
        const isMenuShow = this.$store.state.isMenuShow
        const isAsideShow = this.$store.state.isAsideShow
        return !isMenuShow && !isAsideShow
      },
      partFullPage () {
        const isMenuShow = this.$store.state.isMenuShow
        const isAsideShow = this.$store.state.isAsideShow
        return isMenuShow && !isAsideShow
      },
      content () {
        const content = this.article.content
        if (this.article.contentType === 'MARKDOWN') {
          return marked(this.article.content)
        } else {
          return content
        }
      }
    },
    methods: {
      fullPageClick () {
        const flag = this.fullPage
        this.$store.commit('showMenu', flag)
        this.$store.commit('showAside', flag)
      },
      partFullPageClick () {
        const flag = this.partFullPage
        this.$store.commit('showMenu', true)
        this.$store.commit('showAside', flag)
      }
    },
    async asyncData ({route, store}) {
      const result = {
        article: {}
      }
      const id = route.params.id
      await store.$api.article.getById(id).then(data => {
        result.article = data.data
      }).catch(() => {})
      return result
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .article-id-container {
        .article-wrapper {
            background-color: $color-background;
            padding: 1rem;
            border-radius: 5px;
            .header {
                padding-bottom: 1rem;
                border-bottom: 1px solid $color-border-base;
                .title {
                    text-align: center;
                    margin: 0.5rem 0 0.6rem 0;
                }
                .action {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                .info {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    margin-top: 0.5rem;
                    span {
                        margin-left: 0.5rem;
                        i {
                            padding-right: 0.25rem;
                        }
                    }
                    .right {
                        display: flex;
                        flex: 1 1 auto;
                        justify-content: flex-end;
                        align-items: center;
                    }
                    button {
                        padding: 0.3rem 0.5rem;
                        i {
                            padding-right: 0.25rem;
                        }
                        &:hover {
                            background-color: color-active($color-background);
                        }
                    }
                }
            }
        }
    }
</style>

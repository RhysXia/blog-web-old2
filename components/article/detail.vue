<template lang="pug">
    .article-detail-container
        slot(name="header",:article="article")
            .c-header
                h1.title {{article.title}}
                .info
                    span
                        i.fa.fa-user
                        nuxt-link(:to="'/user/'+article.author.id") {{article.author.nickname}}
                    span
                        i.fa.fa-tag
                        nuxt-link.tag(:to="'/tag/'+tag.id",v-for="tag in article.tags",:key="tag.id") {{tag.name}}
                    span
                        i.fa.fa-list
                        nuxt-link(:to="'/category/'+article.category.id") {{article.category.name}}
                    span
                        i.fa.fa-clock-o
                        | {{article.createAt | formatDate}}
                    .right
                        button.btn.link(@click="fullPageClick")
                            i.fa(:class="fullPage?'fa-compress':'fa-arrows-alt'")
                            | 全屏阅读
                        button.btn.link(@click="partFullPageClick")
                            i.fa(:class="partFullPage?'fa-compress':'fa-expand'")
                            | 通栏阅读
        .c-body
            c-show-more(:hiddenHeight="500")
                .content(v-html="content")
        slot(name="footer",:article="article")
            .c-footer
                span.read
                    b {{article.readNum}}
                    | 人阅读
                span.like
                    b {{article.voteNum}}
                    | 人喜欢

</template>

<script>
  import markdown from '~/utils/markdown'
  import CShowMore from '~/components/common/show-more'

  export default {
    name: 'c-article-detail',
    props: {
      article: {
        type: Object
      }
    },
    computed: {
      content () {
        const content = this.article.content
        if (this.article.contentType === 'MARKDOWN') {
          return markdown(content)
        } else {
          return content
        }
      },
      fullPage () {
        const isMenuShow = this.$store.state.isMenuShow
        const isAsideShow = this.$store.state.isAsideShow
        return !isMenuShow && !isAsideShow
      },
      partFullPage () {
        const isMenuShow = this.$store.state.isMenuShow
        const isAsideShow = this.$store.state.isAsideShow
        return isMenuShow && !isAsideShow
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
    components: {
      CShowMore
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .article-detail-container {
        background-color: $color-background;
        padding: 1em;
        border-radius: 5px;
        .c-header {
            padding-bottom: 1em;
            border-bottom: 1px solid $color-border-base;
            .title {
                text-align: center;
                margin: 0.5em 0 0.6em 0;
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
                margin-top: 0.5em;
                span {
                    margin-left: 0.5em;
                    i {
                        padding-right: 0.25em;
                    }
                }
                .tag {
                    margin-right: 0.2em;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                .right {
                    display: flex;
                    flex: 1 1 auto;
                    justify-content: flex-end;
                    align-items: center;
                }

            }
        }
        .body {
        }
        .c-footer {
            border-top: 1px solid $color-border-base;
            padding-top: 1em;
            .read, .like {
                display: inline-block;
                background-color: $color-background-dark;
                padding: 0.2em 0.5em;
            }
            .read{
                margin-right: 0.5em;
            }
        }
    }
</style>

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
        .c-body
            .content(v-html="content",v-copyright)
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
  import copyright from '~/utils/directive/copyright'

  export default {
    name: 'c-article-detail',
    directives: {
      copyright
    },
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
      }
    },
    methods: {
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
            .read {
                margin-right: 0.5em;
            }
        }
    }
</style>

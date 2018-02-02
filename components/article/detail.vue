<template lang="pug">
    .c-article--detail
        .c-article__header
            slot(name="header",:article="article")
                h1.article__title {{article.title}}
                ul.article__info.article__info--header
                    li
                        i.fa.fa-user
                        nuxt-link(:to="'/user/'+article.author.id") {{article.author.nickname}}
                    li
                        i.fa.fa-tag
                        nuxt-link(:to="'/tag/'+tag.id",v-for="tag in article.tags",:key="tag.id") {{tag.name}}
                    li
                        i.fa.fa-list
                        nuxt-link(:to="'/category/'+article.category.id") {{article.category.name}}
                    li
                        i.fa.fa-clock-o
                        | {{article.createAt | formatDate}}
        .c-article__body
            .content(v-html="content",v-copyright)
        .c-article__footer
            slot(name="footer",:article="article")
                ul.article__info.article__info--footer
                    li
                        span.article__info--read
                            b {{article.readNum}}
                            | 人阅读
                    li
                        span.article__info--vote
                            b {{article.voteNum}}
                            | 人喜欢


</template>

<script>
  import markdown from '~/utils/markdown'
  import copyright from '~/utils/directive/copyright'

  export default {
    name: 'c-article-detail',
    directives: {
      copyright
    },
    props: {
      article: {
        type: Object,
        required: true
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
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/application";

    .c-article--detail {
        background-color: $bg-color;
        border-radius: $border-radius;
        box-sizing: border-box;
        .c-article__header,
        .c-article__body,
        .c-article__footer {
            padding: 1em;
        }

        .article__info {
            list-style: none;
            margin: 0;
            padding: 0;
            li {
                display: inline-block;
                margin-right: 1em;
                &:last-child {
                    margin-right: 0;
                }
            }
        }

        .c-article__header {
            border-bottom: 1px solid $border-color;
            .article__title {
                margin: 0;
                padding: 0;
                font-size: 1.4em;
                text-align: center;
            }
        }
        .article__info--header {
            margin-top: 1em;
            i {
                margin-right: 0.25em;
            }
            a {
                &:hover {
                    text-decoration: underline;
                }
                & + a {
                    margin-left: 0.5em;
                }
            }
        }
        .c-article__footer {
            border-top: 1px solid $border-color;
        }
        .article__info--footer {
            .article__info--read,
            .article__info--vote {
                display: inline-block;
                color: $bg-color;
                padding: 0.25em 0.5em;
            }
            .article__info--read {
                background-color: $success-color;
            }

            .article__info--vote {
                background-color: $primary-color;
            }
        }
    }
</style>

<template lang="pug">
    .article-id-container
        .article-wrapper
            .header
                h1.title {{article.title}}
                .info
                    span
                        i.fa.fa-clock-o
                        | 创建时间{{article.createTime | formatDate}}
                    span
                        i.fa.fa-clock-o
                        | 更新时间{{article.updateTime | formatDate}}
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
      content () {
        const content = this.article.content
        if (this.article.contentType === 'MARKDOWN') {
          return marked(this.article.content)
        } else {
          return content
        }
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
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

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
                }
                .info {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    align-items: center;
                    margin-top: 0.5rem;
                    span {
                        margin-left: 0.5rem;
                        i {
                            padding-right: 0.25rem;
                        }
                    }
                }
            }
        }
    }
</style>

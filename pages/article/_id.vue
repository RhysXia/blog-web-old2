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
                        button.btn.link(@click="fullPageClick")
                            i.fa(:class="fullPage?'fa-compress':'fa-arrows-alt'")
                            | 全屏阅读
                        button.btn.link(@click="partFullPageClick")
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
            .footer
                button.btn.link
                    i.fa.fa-hand-pointer-o
                    | 点赞一下
        .comment-wrapper
            .header
                h2.title 评论列表
                span.info(v-if="commentCount")
                    | 共
                    b {{commentCount}}
                    | 条评论
            .body
                .write(v-if="isLogin")
                    .left
                        c-avatar(:imgUrl="user.avatar")
                    .right
                        c-min-editor(:imageUpload="commentImageUpload")
                template(v-if="!commentCount")
                    .no-content 好可怜，都没人理我~
                template(v-else)
                    c-comment-list(:comments="comments")
</template>
<script>
  import markdown from '~/utils/markdown'
  import CCommentList from '~/components/comment/list'
  import CAvatar from '~/components/common/avatar'
  import CMinEditor from '~/components/common/min-editor'

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
      user () {
        return this.$store.state.user
      },
      isLogin () {
        return this.$store.getters.isLogin
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
      },
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
      commentImageUpload (files) {
        return new Promise((resolve, reject) => {
          if (files.length === 0) {

            return reject(new Error('没有选择文件'))
          }
          const formDate = new FormData()
          formDate.append('image', files[0])
          this.$api.comment.uploadImage(formDate).then(data => {
            return resolve(data.data)
          })
        })
      },
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
        article: {},
        commentCount: 0,
        comments: [],
        pageNum: 1,
        pageSize: 10
      }
      const id = route.params.id
      await store.$api.article.getById(id).then(data => {
        result.article = data.data
      }).catch(() => {})
      const articleId = result.article.id
      if (articleId) {
        await store.$api.comment.getCountByArticleId(articleId).then(data => {
          result.commentCount = data.data
        }).catch(() => {})
        if (result.commentCount > 0) {
          await store.$api.comment.getAllByArticleId({
            articleId,
            pageSize: result.pageSize,
            pageNum: result.pageNum
          }).then(data => {
            result.comments = data.data
          }).catch(() => {})
        }
      }
      return result
    },
    components: {
      CCommentList,
      CAvatar,
      CMinEditor
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .article-id-container {
        > * {
            margin-bottom: 1rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
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

                }
            }
            .footer {
                border-top: 1px solid $color-border-base;
                padding-top: 1rem;
            }
        }
        .btn {
            padding: 0.3rem 0.5rem;
            i {
                padding-right: 0.25rem;
            }
            &:hover {
                background-color: color-active($color-background);
            }
        }
        .comment-wrapper {
            .header {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                background-color: $color-background;
                border-radius: 5px;
                .title {
                    font-size: 1.2rem;
                    margin: 0;
                    padding: 0.5rem;
                }
            }
            .body {
                margin-top: 1rem;
                font-size: 1rem;
                > * {
                    margin-bottom: 0.9rem;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
                .write {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    background-color: $color-background;
                    padding: 0.7rem;
                    .left {
                        margin-right: 0.5rem;
                    }
                    .right {
                        width: 100%;

                    }
                }
                .no-content {
                    height: 80px;
                    text-align: center;
                    line-height: 80px;
                    font-weight: bold;
                    background-color: $color-background;

                }
            }
        }
    }


</style>

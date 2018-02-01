<template lang="pug">
    .article-id
        c-article-detail(:article="article")
            template(slot="footer")
                .article__footer--left
                    c-button.article__vote(:type="isVoted?'success':'primary'",@click="voteClick")
                        b {{article.voteNum}}
                        | 人喜欢
                    span
                        b {{article.readNum}}
                        | 人阅读
                .article__footer--right(v-if="isSelf")
                    c-button(type="warning",@click="$router.push({path:'/article/write',query:{articleId:article.id}})") 修改
                    c-button(type="error",@click="deleteArticle") 删除
        .comment--wrapper
            .comment__header(ref="comment-header")
                h2.comment__title {{isLogin?'评论列表':'评论列表(登陆后可评论)'}}
                span.comment__info(v-if="article.commentNum")
                    | 共
                    b {{article.commentNum}}
                    | 条评论
            .comment__body
                .comment__write(ref="writer",v-if="isLogin")
                    .comment__write--left
                        c-avatar(:src="loginUser.avatar",shape="square") {{loginUser.nickname}}
                    .comment__write--right
                        .reply__header(v-if="replyCommentIndex>=0")
                            span.reply__title 回复
                                b {{comments[replyCommentIndex].author.nickname}}
                            span.reply__close(@click="replyCommentIndex=-1")
                                i.fa.fa-close
                        .reply__body
                            c-editor(:minHeight="150",v-model="commentContent",:imageUpload="commentImageUpload")
                        .reply__footer
                            c-button(type="primary",@click="commentSubmit") 提交
                template(v-if="!article.commentNum")
                    .comment__content--no 好可怜，都没人理我~
                template(v-else)
                    c-comment-item(@delete="commentDelete(comment.id)",@reply="replyHandler(index)",:comment="comment",:key="comment.id",v-for="(comment,index) in comments")
                    c-pagination(@change="pageChange",:totalPages="totalPages",:page="page")

</template>
<script>
  import CCommentItem from '~/components/comment/item'
  import CAvatar from '~/components/common/avatar'
  import CButton from '~/components/common/button'
  import CEditor from '~/components/common/editor'
  import CArticleDetail from '~/components/article/detail'
  import CPagination from '~/components/common/pagination'
  import { mapGetters, mapState } from 'vuex'

  export default {
    watchQuery: ['page'],
    key: to => to.fullPath,
    validate ({params}) {
      const id = Number(params.id)
      return /^\d+$/.test(id)
    },
    async asyncData ({params, store, error, query}) {
      const page = Number((query.page || 1))
      const size = 8
      const id = Number(params.id)
      try {
        const data = {
          // 评论页
          page,
          // 评论数
          size,
          // 评论总页数
          totalPages: 0,
          // 文章id
          id,
          article: {},
          comments: [],
          isVoted: false
        }

        // 获取文章
        let res = await store.$api.article.getById(id)
        data.article = res.data

        // 判断是否点赞了该文章
        if (store.getters.isLogin) {
          res = await store.$api.article.getVote(id)
          if (res.data) {
            data.isVoted = res.data
          }
        } else {
          data.isVoted = false
        }

        // 获取评论列表
        res = await store.$api.comment.getAllByArticleId({
          articleId: id,
          page: page - 1,
          size,
          sort: 'floorNum,DESC'
        })
        data.comments = res.data.content
        data.totalPages = res.data.totalPages
        return data
      } catch (err) {
        error({statusCode: err.statusCode, message: err.message})
      }
    },
    head () {
      const keywords = this.article.tags.map(it => it.name)
      return {
        title: this.article.title,
        meta: [
          {name: 'keywords', content: keywords.join(',')}
        ]
      }
    },
    data () {
      return {
        commentContent: '',
        replyCommentIndex: -1
      }
    },
    computed: {
      ...mapState({
        loginUser: state => state.loginUser
      }),
      ...mapGetters([
        'isLogin'
      ]),
      isSelf () {
        const loginUser = this.loginUser
        const author = this.article.author
        if (loginUser && loginUser.id) {
          if (author.id === loginUser.id) {
            return true
          }
        }
        return false
      }
    },
    watch: {
      isLogin (val) {
        if (val) {
          this.checkVote()
        } else {
          this.isVoted = false
        }
      }
    },
    methods: {
      replyHandler (index) {
        this.replyCommentIndex = index
        // 滚动到编辑器
        this.$velocity(this.$refs.writer, 'scroll', {duration: 400, offset: 0})
      },
      async deleteArticle () {
        try {
          await this.$api.article.deleteById(this.article.id)
          this.$message({
            content: '删除成功',
            type: 'error',
            duration: 2000
          })
          this.$router.push('/')
        } catch (err) {
          this.$message({
            content: err.message,
            type: 'error',
            duration: 2000
          })
        }
      },
      async checkVote () {
        let isVoted = false
        try {
          const res = await this.$api.article.getVote(this.article.id)
          isVoted = res.data
        } catch (err) {
          isVoted = false
        }
        this.isVoted = isVoted
      },
      async pageChange (val) {
        if (val === this.page) {
          // 获取评论列表
          let res = await this.$api.comment.getAllByArticleId({
            articleId: this.article.id,
            page: val - 1,
            size: this.size,
            sort: 'floorNum,DESC'
          })
          this.comments = res.data.content
          this.totalPages = res.data.totalPages
          return
        }
        this.$router.push({
          path: `/article/${this.article.id}`,
          query: {
            page: val
          }
        })
      },
      async voteClick () {
        try {
          const article = this.article
          if (this.isVoted) {
            await this.$api.article.deleteVote(article.id)
            article.voteNum--
          } else {
            await this.$api.article.addVote(article.id)
            article.voteNum++
          }
          this.isVoted = !this.isVoted
        } catch (err) {
          this.$message({
            content: err.message,
            type: 'error',
            duration: 2000
          })
        }
      },
      async commentDelete (id) {
        try {
          await this.$api.comment.deleteById(id)
          this.$message({
            content: '删除成功',
            type: 'success',
            duration: 2000
          })
          await this.pageChange(this.page)
        } catch (err) {
          this.$message({
            content: err.message,
            type: 'error',
            duration: 2000
          })
        }
      },
      async commentSubmit () {
        try {
          const articleId = this.article.id
          const content = this.commentContent
          if (!content) {
            this.$message({
              type: 'error',
              duration: 2000,
              content: '内容不能为空'
            })
            return
          }
          // 如果是回复
          if (this.replyCommentIndex >= 0) {
            const commentId = this.comments[this.replyCommentIndex].id
            await this.$api.reply.add({
              content,
              contentType: 'MARKDOWN',
              commentId
            })
            this.replyCommentIndex = -1
          } else {
            // 如果是评论
            await this.$api.comment.add({
              content,
              contentType: 'MARKDOWN',
              articleId
            })
          }
          this.$message({
            type: 'success',
            duration: 2000,
            content: '评论成功'
          })
          // 评论编辑框置空
          this.commentContent = ''
          // 重新跳转到当前页
          this.pageChange(this.page)
        } catch (err) {
          this.$message({
            content: err.message,
            type: 'error',
            duration: 2000
          })
        }
      },
      async commentImageUpload (files) {
        if (files.length === 0) {
          throw new Error('没有选择文件')
        }
        const formData = new FormData()
        formData.append('image', files[0])
        const {data} = await this.$api.comment.uploadImage(formData)
        return data
      }
    },
    components: {
      CCommentItem,
      CAvatar,
      CEditor,
      CArticleDetail,
      CPagination,
      CButton
    }
  }
</script>
<style lang="scss">
    @import "~assets/scss/application";
    @import "~assets/scss/mixins";

    .article-id {
        > * {
            margin-bottom: 1em;
        }
        .article__footer--left {
            display: inline-block;
            > * {
                margin-right: 1em;
            }
        }
        .article__footer--right {
            > * {
                margin-left: 1em;
            }
            float: right;
        }

        .comment--wrapper {
            > * {
                margin-bottom: 1em;
            }
            .comment__header {
                background-color: $bg-color;
                padding: 1em;
                .comment__title {
                    display: inline-block;
                    margin: 0;
                    padding: 0;
                    font-size: 1.2em;
                    font-weight: bold;
                }
                .comment__info {
                    float: right;
                }
            }

            .comment__body {
                > * {
                    margin-bottom: 0.5em;
                }
            }

            .comment__write {
                .comment__write--left {
                    float: left;
                    font-size: 2em;
                }
                .comment__write--right {
                    margin-left: 7em;
                    .reply__header {
                        display: block;
                        background-color: $bg-color;
                        margin-bottom: 0.5em;
                        padding: 0.5em;
                    }
                    .reply__close {
                        float: right;
                        color: $error-color;
                        cursor: pointer;
                        padding: 0 0.25em;
                        &:hover {
                            color: darken($error-color, 10%);
                        }
                    }
                    .reply__footer {
                        background-color: $bg-color;
                        padding: 0.5em;
                        @include clearfix;
                        .c-button{
                            float: right;
                        }
                    }

                    .reply__body{
                        padding: 0 1em;
                        background-color: $bg-color;
                    }
                }
            }

            .comment__content--no{
                background-color: $bg-color;
                text-align: center;
                height: 5em;
                line-height: 5em;
                font-weight: bold;
                font-size: 1.1em;
            }
        }
    }


</style>

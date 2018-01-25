<template lang="pug">
    .article-id-container
        c-article-detail(:article="article")
            .footer(slot="footer",slot-scope="props")
                span.like(@click="voteClick",:class="{'is-login-like':isLogin,'is-voted':isVoted}")
                    b {{props.article.voteNum}}
                    | 人点赞
                span.read
                    b {{props.article.readNum}}
                    | 人阅读
                template(v-if="isSelf")
                    span.update(@click="$router.push({path:'/article/write',query:{articleId:article.id}})") 修改
                    span.delete(@click="deleteArticle") 删除
        .comment-wrapper
            .header
                h2.title {{isLogin?'评论列表':'评论列表(登陆后可评论)'}}
                span.info(v-if="article.commentNum")
                    | 共
                    b {{article.commentNum}}
                    | 条评论
            .body
                .write(ref="writer",v-if="isLogin")
                    .left
                        c-avatar(:imgUrl="loginUser.avatar")
                    .right
                        .reply(v-if="replyCommentIndex>=0")
                            span.reply-title 回复
                                b {{comments[replyCommentIndex].author.nickname}}
                            button.close(@click="replyCommentIndex=-1")
                                i.fa.fa-close
                        c-editor(:textHeight="150",barPosition="bottom",v-model="commentContent",:imageUpload="commentImageUpload")
                            button.submit(slot="button",@click="commentSubmit") 提交
                template(v-if="!article.commentNum")
                    .no-content 好可怜，都没人理我~
                template(v-else)
                    c-comment-item(@delete="commentDelete(comment.id)",@reply="replyHandler(index)",:comment="comment",:key="comment.id",v-for="(comment,index) in comments")
                    c-pagination(@change="pageChange",:totalPages="totalPages",:page="page")

</template>
<script>
  import CCommentItem from '~/components/comment/item'
  import CAvatar from '~/components/common/avatar'
  import CEditor from '~/components/common/editor'
  import CArticleDetail from '~/components/article/detail'
  import CPagination from '~/components/common/pagination'
  import { mapGetters, mapState } from 'vuex'

  export default {
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
          this.$router.push(this.$route.meta.from)
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
        // 页面改变时，replyCommentIndex置为-1
        this.replyCommentIndex = -1
        try {
          const page = val - 1
          const size = this.size
          const res = await this.$api.comment.getAllByArticleId({
            articleId: this.article.id,
            page,
            size,
            sort: 'floorNum,DESC'
          })
          this.comments = res.data.content
          this.totalPages = res.data.totalPages

          this.$router.push({
            path: `/article/${this.article.id}`,
            query: {
              page: val
            }
          })
          this.page = val
          // 滚动到评论开始的地方
          this.$velocity(this.$refs.writer, 'scroll', {duration: 400, offset: 0})
        } catch (err) {
          this.$message({
            content: err.message,
            type: 'error',
            duration: 2000
          })
        }
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
          await this.pageChange(this.page)
          this.$message({
            content: '删除成功',
            type: 'success',
            duration: 2000
          })
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
          if (this.replyCommentIndex >= 0) {
            const commentId = this.comments[this.replyCommentIndex].id
            await this.$api.reply.add({
              content,
              contentType: 'MARKDOWN',
              commentId
            })
            this.replyCommentIndex = -1
            // 获取当前页
            await this.pageChange(this.page)
          } else {
            await this.$api.comment.add({
              content,
              contentType: 'MARKDOWN',
              articleId
            })
            await this.pageChange(1)
          }
          this.$message({
            type: 'success',
            duration: 2000,
            content: '评论成功'
          })
          this.commentContent = ''
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
    beforeRouteEnter (to, from, next) {
      // 获取from的路径，将跳转来的路径记录下来
      to.meta.from = from.fullPath
      next()
    },
    components: {
      CCommentItem,
      CAvatar,
      CEditor,
      CArticleDetail,
      CPagination
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .article-id-container {
        > * {
            margin-bottom: 1em;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .footer {
            border-top: 1px solid $color-border-base;
            padding-top: 1em;
            span {
                background-color: $color-background-dark;
                display: inline-block;
                padding: 0.3em 0.5em;
                margin-right: 0.5em;
            }
            .update, .delete {
                float: right;
                padding: 0.3em 1em;
                color: $color-text-white;
                cursor: pointer;
            }
            .update {
                background-color: $color-primary;
                &:hover {
                    background-color: $color-primary-active;
                }
            }
            .delete {
                background-color: $color-danger;
                &:hover {
                    background-color: $color-danger-active;
                }
            }
            .is-login-like {
                background-color: $color-primary;
                color: $color-text-white;
                cursor: pointer;
                transition: color 0.4s ease-in-out;
                &:hover {
                    background-color: $color-primary-active;
                }
            }
            .is-voted {
                background-color: $color-success !important;
                &:hover {
                    background-color: $color-success-active !important;
                }
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
                padding: 0.5em;
                .title {
                    font-size: 1.2em;
                    margin: 0;
                }
            }
            .body {
                margin-top: 1em;
                font-size: 1em;
                > * {
                    margin-bottom: 0.9em;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
                .reply {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: $color-success;
                    color: $color-text-white;
                    padding: 0.5em;
                    margin-bottom: 1em;
                    border-radius: 3px;
                    .reply-title {
                        display: block;

                    }
                    .close {
                        border: none;
                        background-color: transparent;
                        color: $color-warn;
                    }
                }
                .write {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    background-color: $color-background;
                    padding: 0.7em;
                    .left {
                        margin-right: 0.5em;
                    }
                    .right {
                        width: 100%;
                        font-size: 0.8em;
                        .submit {
                            height: 100%;
                            padding: 0.5em 1em;
                            background-color: $color-primary;
                            color: $color-text-white;
                            float: right;
                            border-radius: 0;
                            &:hover {
                                background-color: $color-primary-active;
                            }
                        }
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

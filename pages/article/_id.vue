<template lang="pug">
    .article-id-container
        c-article-detail(:article="article")
            .footer(slot="footer",slot-scope="props")
                span.like(@click="voteClick",:class="{'is-login-like':isLogin,'is-voted':isVoted&&isLogin}")
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
                span.info(v-if="count")
                    | 共
                    b {{count}}
                    | 条评论
            .body
                .write(v-if="isLogin")
                    .left
                        c-avatar(:imgUrl="user.avatar")
                    .right
                        c-editor(:textHeight="150",barPosition="bottom",v-model="commentContent",:imageUpload="commentImageUpload")
                            button.submit(slot="button",@click="commentSubmit") 提交
                template(v-if="!count")
                    .no-content 好可怜，都没人理我~
                template(v-else)
                    c-comment-list(:comments="comments",@item-delete="itemDelete",:total="count",:pageSize="size",@pageChange="pageChange")
</template>
<script>
  import CCommentList from '~/components/comment/list'
  import CAvatar from '~/components/common/avatar'
  import CEditor from '~/components/common/editor'
  import CArticleDetail from '~/components/article/detail'

  export default {
    validate ({params}) {
      const id = Number(params.id)
      return /^\d+$/.test(id)
    },
    async asyncData ({params, store, error}) {
      try {
        const id = Number(params.id)
        const result = {
          article: {},
          comments: [],
          page: 0,
          size: 5,
          count: 0,
          isVoted: false
        }
        const {data} = await store.$api.article.getById(id)
        result.article = data
        let res = await store.$api.comment.getAllByArticleId({
          articleId: id,
          page: result.page,
          size: result.size,
          sort: 'floorNum,DESC'
        })
        result.comments = res.data.content
        result.count = res.data.totalElements

        // 判断是否点赞了该文章
        if (store.getters.isLogin) {
          res = await store.$api.article.getVote(id)
          if (res.data) {
            result.isVoted = res.data
          }
        }
        return result
      } catch (err) {
        error(err)
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
        commentContent: ''
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      isLogin () {
        return this.$store.getters.isLogin
      },
      isSelf () {
        const loginUser = this.$store.state.user
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
        try {
          const res = await this.$api.article.getVote(this.article.id)
          this.isVoted = res.data
        } catch (err) {
          this.isVoted = false
        }
      },
      async pageChange (val) {
        try {
          this.page = val - 1
          const res = await this.$api.comment.getAllByArticleId({
            articleId: this.article.id,
            page: this.page,
            size: this.size,
            sort: 'floorNum,DESC'
          })
          this.comments = res.data.content
          this.count = res.data.totalElements
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
          const id = this.article.id
          const isVoted = this.isVoted
          if (isVoted) {
            await this.$api.article.deleteVote(id)
            this.isVoted = false
            this.article.voteNum--
          } else {
            await this.$api.article.addVote(id)
            this.isVoted = true
            this.article.voteNum++
          }
        } catch (err) {
          this.$message({
            content: err.message,
            type: 'error',
            duration: 2000
          })
        }
      },
      async itemDelete (index) {
        try {
          await this.$api.comment.deleteById(this.comments[index].id)
          const {data} = await this.$api.comment.getAllByArticleId({
            articleId: this.article.id,
            page: this.page,
            size: this.size,
            sort: 'floorNum,DESC'
          })
          this.comments = data.content
          this.count = data.totalElements
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
          await this.$api.comment.add({
            content,
            contentType: 'MARKDOWN',
            articleId
          })

          const res = await this.$api.comment.getAllByArticleId({
            articleId: this.article.id,
            page: this.page,
            size: this.size,
            sort: 'floorNum,DESC'
          })
          this.comments = res.data.content
          this.count = res.data.totalElements

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
      // 获取from的路径
      const path = from.fullPath
      // 将跳转来的路径记录下来
      to.meta.from = path
      next()
    },
    components: {
      CCommentList,
      CAvatar,
      CEditor,
      CArticleDetail
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
                padding: 0.5rem;
                .title {
                    font-size: 1.2rem;
                    margin: 0;
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
                        font-size: 0.8rem;
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

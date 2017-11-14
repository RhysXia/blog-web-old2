<template lang="pug">
    .article-id-container
        r-article(:article="article")
        .comments-container(v-if="commentNum >0")
            .header
                h2.title 评论列表
                span 共{{commentNum}}条评论
            .comments
                r-load-more(:hasMore="hasMore",:v-model="isLoading",@on-load="onLoad")
                    r-comment-item(v-for="(comment,index) in comments",:key="index",:comment="comment")
        .comments-container(v-else)
            .header
                h2.title 好可怜，没人关心我~
</template>
<script>
  import ArticleApi from '~/api/article-api'
  import RArticle from '~/components/Article/article'
  import RCommentItem from '~/components/Comment/comment-item'
  import RLoadMore from '~/components/Common/load-more'

  export default {
    components: {
      RArticle,
      RCommentItem,
      RLoadMore
    },
    validate ({params}) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({params}) {
      const id = params.id
      const data = {
        article: {},
        comments: [],
        page: 0,
        size: 10,
        hasMore: true,
        commentNum: 0
      }
      await ArticleApi.getArticleById(id).then(res => {
        if (res.data.code === 0) {
          data.article = res.data.result
        }
      })
      await ArticleApi.getCommentsByArticleId(id, data.page, data.size, 'floorNum,DESC').then(res => {
        if (res.data.code === 0) {
          data.commentNum = res.data.result.totalElements
          res.data.result.data.forEach(comment => {
            data.comments.push(comment)
          })
          data.page++
          data.hasMore = res.data.result.totalPages > data.page
        }
      })
      return data
    },
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      onLoad () {
        ArticleApi.getCommentsByArticleId(this.$route.params.id, this.page, this.size, 'floorNum,DESC').then(res => {
          if (res.data.code === 0) {
            res.data.result.data.forEach(comment => {
              this.comments.push(comment)
            })
            this.page++
            this.hasMore = res.data.result.totalPages > this.page
          }
          this.isLoading = false
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
    @import "~assets/stylus/variables.styl"

    .article-id-container
        width $main-width
        > *
            margin-bottom 20px
        &:last-child
            margin-bottom inherit
        .comments-container
            .header
                background-color $bg-color
                margin-bottom 10px
                border-radius 5px
                .title
                    display inline-block
                    margin 0
                    padding 10px
                    font-size $font-size-m

</style>

<template lang="pug">
    .comments-container
        .header
            h2.title 评论列表
        .comments
            .comment(v-for="(comment,index) in comments",:key="index")
                template(v-if="comment.author.avatar")
                    img.avatar(:src="comment.author.avatar")
                template(v-else)
                    .avatar.anon
                .content-wrapper
                    .info
                        .author {{comment.author.nickname}}
                        .floor {{comment.floorNum}}
                    .content {{comment.content}}
                    .operation
                        .createDate {{comment.createDate | formatDate}}
                        button.reply
                            i.fa.fa-reply
                            | 回复
</template>
<script>
  export default {
    props: {
      comments: {
        type: Array,
        default: () => {
          return []
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
    .comments-container
        background-color #fff
        padding 10px
        border-radius 5px
        .header
            border-bottom 1px solid #eee
            .title
                font-size 14px
        .comments
            .comment
                .avatar
                    height 50px
                    width 50px
                    border-radius 50%
                .anon
                    background url("~assets/img/anon.png")
                    background-size cover
</style>

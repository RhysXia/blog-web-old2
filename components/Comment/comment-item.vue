<template lang="pug">
    .comment-item-container
        nuxt-link(:to="'/users/'+comment.author.id")
            template(v-if="comment.author.avatar")
                img.avatar(:src="comment.author.avatar")
            template(v-else)
                .avatar.anon
        .main
            .header
                .name {{comment.author.nickname}}
                .floor.right \#{{comment.floorNum}}
            .content {{comment.content}}
            .footer
                button.reply.button
                    i.fa.fa-reply
                    | 回复
                button.like.button
                    i.fa.fa-thumbs-o-up
                    | 顶
</template>
<script>
  export default {
    props: {
      comment: {
        type: Object,
        default: () => {
          return {}
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
    @import "~assets/stylus/variables.styl"

    .comment-item-container
        display flex
        flex-direction row
        background-color $bg-color
        border-radius 5px
        padding 10px
        font-size $font-size-s
        .avatar
            width 50px
            height 50px
            border-radius 50%
            margin 5px 0
        .anon
            background url("~assets/img/anon.png")
            background-size cover
        .main
            display flex
            flex-direction column
            margin-left 10px
            width 100%
            .header
                display flex
                flex-direction row
                font-weight bold
                border-bottom 1px solid $border-color
                padding 5px 0
                .right
                    margin 0 0 0 auto
            .content
                padding 10px 0

            .footer
                display flex
                flex-direction row
                border-top 1px solid $border-color
                padding-top 5px
                font-size $font-size-xs
                > *
                    margin-right 8px
                    > i
                        padding-right 5px
                .button
                    border none
                    outline none
                    color inherit
                    background-color transparent
                    cursor pointer
                    &:hover
                        color $link-color
</style>

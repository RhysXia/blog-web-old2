<template lang="pug">
    .c-comment-item-container
        avatar.left(:width="60",:height="60",:imgUrl="comment.author.avatar")
        .right
            .top
                b.name {{comment.author.nickname}}
                b.floor \#{{comment.floorNum}}
            .middle
                .content(v-html="content")
            .bottom
                span
                    i.fa.fa-clock-o
                    | {{comment.createTime | formatDate}}
                button
                    i.fa.fas-reply
                    | 回复
                button
                    i.fa.fa-hand-pointer-o
                    | 顶

</template>
<script>
  import Avatar from '../common/avatar'
  import markdown from '~/utils/markdown'

  export default {
    name: 'comment-item',
    props: {
      comment: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      content () {
        const content = this.comment.content
        if (this.comment.contentType === 'MARKDOWN') {
          return markdown(content)
        } else {
          return content
        }
      }
    },
    components: {
      Avatar
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-comment-item-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        background-color: $color-background;
        padding: 0.7em;
        border-radius: 5px;
        .left {

        }
        .right {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 1em;
            flex: 1 1 auto;
            .top{
                display: flex;
                width: 100%;
                flex-direction: row;
                justify-content: space-between;
            }
            .middle{
                margin-top: 0.5em;
                width: 100%;
                padding: 0.5em;
                color: $color-text + 25;
                font-size: 0.8em;
            }
            .bottom{
                display: flex;
                width: 100%;
                flex-direction: row;
                margin-top: 0.5em;
            }
        }
    }
</style>

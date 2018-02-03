<template lang="pug">
    .c-comment-item--show
        .c-comment__content(v-html="content")
        .c-comment__info
            span
                i.fa.fa-clock-o
                | {{comment.createAt|formatDate}}
                i.dot
                nuxt-link(:to="`/article/${comment.article.id}`")
                    i.fa.fa-book
                    | {{comment.article.title}}
                i.dot
                | 回复数:{{comment.replyNum}}
</template>

<script>
  import markdown from '~/utils/markdown'

  export default {
    name: 'item-show',
    props: {
      comment: {
        type: Object,
        required: true
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
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/application";

    .c-comment-item--show {
        border: 1px solid $border-color;
        border-radius: $border-radius;
        padding: 0.5em;
        .c-comment__content {
            height: 3em;
            overflow: hidden;
        }

        .c-comment__info{
            color: $text-color--secondary;
            font-size: 0.9em;
        }

    }
</style>

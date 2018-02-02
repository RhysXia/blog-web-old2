<template lang="pug">
    .c-comment-item--show
        .c-comment__content(v-html="content")
        .c-comment__info

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

<style>

</style>

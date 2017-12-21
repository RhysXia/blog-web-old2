<template lang="pug">
    .c-comment-list-container
        item(v-for="(comment,index) in comments",:key="index",:comment="comment")
</template>

<script>
  import Item from './item'

  export default {
    name: 'comment-list',
    props: {
      comments: {
        type: Array,
        default: []
      }
    },
    components: {
      Item
    }
  }
</script>

<style lang="scss" scoped>
    .c-comment-list-container{
        >*{
            margin-bottom: 1em;
            &:last-child{
                margin-bottom: 0;
            }
        }
    }
</style>

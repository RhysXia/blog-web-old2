<template lang="pug">
    .c-comment-list-container
        transition-group(name="list",tag="div")
            item.item(v-for="(comment,index) in comments",:key="comment.id",:comment="comment",@item-delete="$emit('item-delete',index)",@reply="$emit('reply',index)")
        pagination(:total="total",:pageSize="pageSize",@pageChange="pageChange")
</template>
<script>
  import Item from './item'
  import Pagination from '../common/pagination'

  export default {
    name: 'c-comment-list',
    props: {
      comments: {
        type: Array,
        default: []
      },
      total: {
        type: Number
      },
      pageSize: {
        type: Number
      }

    },
    data () {
      return {}
    },
    methods: {
      pageChange (val) {
        this.$emit('pageChange', val)
      }
    },
    components: {
      Item,
      Pagination
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-comment-list-container {
        .item {
            margin-bottom: 1em;
        }
        .list-enter-active {
            transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
        }
        .list-leave-active {
            display: none;
        }
        .list-enter {
            opacity: 0;
            transform: translateX(100%);
        }
        .list-enter-to {
            opacity: 1;
            transform: translateX(0);
        }

    }
</style>

<template lang="pug">
    .c-draft-list-container
        .draft-wrapper
            transition-group(name="list",tag="div")
                item.item(:draft="draft",:key="draft.id",v-for="draft in drafts",@delete="draftDelete(draft.id)")
        pagination(:total="total",:pageSize="pageSize",@pageChange="pageChange")
</template>

<script>
  import item from './item'
  import Pagination from '../common/pagination'

  export default {
    name: 'c-draft-list',
    props: {
      drafts: {
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
    methods: {
      pageChange (val) {
        this.$emit('pageChange', val)
      },
      async draftDelete (id) {
        try {
          await this.$api.draft.deleteById(id)
          const drafts = this.drafts.filter(d => {
            return d.id !== id
          })
          this.$emit('update:drafts', drafts)
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
      }
    },
    components: {
      item,
      Pagination
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-draft-list-container {
        position: relative;
        width: 100%;
        .draft-wrapper {
            position: relative;
            margin-right: -1em;
            @include clearfix;
            .item {
                box-sizing: border-box;
                float: left;
                margin-right: 1em;
                width: calc(50% - 1em);
            }
        }
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

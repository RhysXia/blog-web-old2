<template lang="pug">
    .c-article-list-container
        transition-group(name="list",tag="div")
            item.item(v-for="article in articles",:key="article.id",:article="article",@delete="deleteArticle(article.id)")
        pagination(:total="total",:pageSize="pageSize",@pageChange="pageChange")
</template>

<script>
  import Item from './item'
  import Pagination from '../common/pagination'

  export default {
    name: 'c-article-list',
    props: {
      articles: {
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
      },
      async deleteArticle (id) {
        try {
          await this.$api.article.deleteById(id)
          const articles = this.articles.filter(c => {
            return c.id !== id
          })
          this.$emit('update:articles', articles)
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
      Item,
      Pagination
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-article-list-container {
        position: relative;
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

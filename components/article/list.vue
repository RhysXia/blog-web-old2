<template lang="pug">
    .c-article-list-container
        item(v-for="(article,index) in articles",:key="index",:article="article")
        .action.has-more(v-if="hasMore&&!isLoading",@click="loadClick") 加载更多
        .action.loading(v-else-if="isLoading") 正在加载
        .action.no-more(v-else) 已经到底了

</template>

<script>
  import Item from './item'

  export default {
    name: 'article-list',
    props: {
      articles: {
        type: Array,
        default: () => []
      },
      hasMore: {
        type: Boolean
      },
      loadMore: {
        type: Function,
        default: () => {
          return new Promise((resolve, reject) => {
            resolve()
          })
        }
      }
    },
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      loadClick () {
        this.isLoading = true
        this.loadMore().then(() => {
          this.isLoading = false
        })
      }
    },
    components: {
      Item
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-article-list-container {
        > * {
            margin-bottom: 1rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .action {
            background-color: $color-background;
            padding: 0.5rem 0;
            text-align: center;
            &.no-more,
            &.loading {
                cursor: not-allowed;
                background-color: color-active($color-background);
            }
            &.has-more {
                cursor: pointer;
                &:hover {
                    background-color: color-active($color-background);
                }
            }
        }
    }


</style>

<template lang="pug">
    .list
        r-article(v-for="(article,index) in articles",:key="index",:article="article")
        .hasmore.panel(v-if="hasMore && !isLoading",@click="loadMore") 加载更多
        .nomore.panel(v-if="!hasMore") 没有更多
        .loading.panel(v-if="hasMore && isLoading")
            Icon.icon-loading(type="load-c" size=18)
            span Loading
</template>

<script>
  import RArticle from './article'
  export default {
    props: {
      articles: {
        type: Array,
        default: []
      },
      hasMore: {
        type: Boolean,
        default: true
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods: {
      loadMore () {
        this.$emit('on-load', true)
      }
    },
    model: {
      prop: 'isLoading',
      event: 'on-load'
    },
    components: {
      RArticle
    }
  }
</script>
<style lang="stylus" scoped>
    .list
        >*
            margin 1rem 0
            &:first-child
                margin-top 0
            &:last-child
                margin-bottom 0
        .panel
            padding 5px
            text-align center
            border-radius 5px
            font-size 14px
        .hasmore
        .loading
            background-color #fff
            .icon-loading
                margin-right 5px
                transform-origin 50% 50%
                animation circle 1s linear infinite
        .hasmore
            cursor pointer
            &:hover
                background-color #ddd
        .loading
        .nomore
            cursor not-allowed
        .nomore
            background-color #f7f7f7
    @keyframes circle
        from
            transform rotate(0deg)
        50%
            transform rotate(180deg)
        to
            transform rotate(360deg)
</style>
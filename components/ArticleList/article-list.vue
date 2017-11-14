<template lang="pug">
    .list
        r-article(v-for="(article,index) in articles",:key="index",:article="article")
        .hasmore.panel(v-if="hasMore && !isLoading",@click="loadMore") 加载更多
        .nomore.panel(v-if="!hasMore") 没有更多
        .loading.panel(v-if="hasMore && isLoading")
            i.fa.fa-circle-o-notch
            span Loading
</template>

<script>
  import RArticle from './article-item'
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
                margin-top inherit
            &:last-child
                margin-bottom inherit
        .panel
            padding 5px
            text-align center
            border-radius 5px
            font-size 14px
        .hasmore
        .loading
            background-color #fff
            .fa-circle-o-notch
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

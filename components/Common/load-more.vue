<template lang="pug">
    .load-more-container
        slot
        .has-more.panel(v-if="hasMore && !isLoading",@click="loadMore") 加载更多
        .no-more.panel(v-if="!hasMore") 已经没有了
        .loading.panel(v-if="hasMore && isLoading")
            i.fa.fa-circle-o-notch
            span Loading
</template>

<script>

  export default {
    props: {
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
    }
  }
</script>
<style lang="stylus" scoped>
    @import "~assets/stylus/variables.styl"

    .load-more-container
        > *
            margin 1rem 0
            &:first-child
                margin-top inherit
            &:last-child
                margin-bottom inherit
        .panel
            padding 5px
            text-align center
            border-radius 5px
            font-size $font-size-s
        .has-more
        .loading
            background-color $bg-color
            .fa-circle-o-notch
                margin-right 5px
                transform-origin 50% 50%
                animation circle 1s linear infinite
        .has-more
            cursor pointer
            &:hover
                background-color $bg-dark-active-color
        .loading
        .no-more
            cursor not-allowed
        .no-more
            background-color $bg-dark-active-color

    @keyframes circle
        from
            transform rotate(0deg)
        50%
            transform rotate(180deg)
        to
            transform rotate(360deg)
</style>

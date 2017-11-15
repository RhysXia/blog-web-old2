<template lang="pug">
    .layout
        r-header
        main.main
            r-menu
            .content-wrapper
                keep-alive
                    nuxt
                transition(name="aside")
                    r-aside(:articles="hotArticles",v-show="showAside")
        r-footer
</template>

<script>
  import RHeader from '~/components/Layout/header'
  import RFooter from '~/components/Layout/footer'
  import RMenu from '~/components/Layout/menu'
  import RAside from '~/components/Layout/aside'

  export default {
    components: {
      RHeader,
      RFooter,
      RAside,
      RMenu
    },
    data () {
      return {
        height: 0
      }
    },
    computed: {
      hotArticles () {
        return this.$store.state.article.hotArticles
      },
      showAside () {
        return this.$store.state.showAside
      }
    }
  }
</script>
<style lang="stylus" scoped>
    @import "~assets/stylus/variables.styl"

    .layout
        display flex
        flex-direction column
        .main
            display flex
            flex-direction row
            margin $margin auto
            justify-content center
            width $width
            > *
                margin-right $margin
                &:last-child
                    margin-right 0
            .content-wrapper
                display flex
                flex-direction row
                width $width - $menu-width - $margin
                > *
                    margin-right $margin
                    &:last-child
                        margin-right 0
                .aside-enter-active
                .aside-leave-active
                    transition all 0.5s
            
                .aside-enter
                .aside-leave-to
                    opacity 0
                    transform translateX(100%)
            
                .aside-enter-to
                .aside-leave
                    opacity 1
                    transform translateX(0)
</style>

<template lang="pug">
    .layout
        r-header
        main.main
            r-menu
            .content-wrapper
                nuxt

            r-aside(:articles="hotArticles")
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
      showPanel () {
        return this.$store.state.showPanel
      }
    },
    mounted () {
      // 设置高度，使滚动条生效
//      this.height = window.document.body.offsetHeight
//      window.onresize = e => {
//        this.height = window.document.body.offsetHeight
//      }
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

</style>

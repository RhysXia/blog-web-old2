<template lang="pug">
    .layout
        r-header
        main.main
            r-aside
            nuxt
            r-panel(:articles="hotArticles")
        r-footer
</template>

<script>
  import RHeader from '~/components/header'
  import RFooter from '~/components/footer'
  import RAside from '~/components/aside'
  import RPanel from '~/components/panel'

  export default {
    components: {
      RHeader,
      RFooter,
      RAside,
      RPanel
    },
    data () {
      return {
        height: 0
      }
    },
    computed: {
      hotArticles () {
        return this.$store.state.article.hotArticles
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
    .layout
        display flex
        flex-direction column
        .main
            display flex
            flex-direction row
            width 1000px
            margin 10px auto

</style>

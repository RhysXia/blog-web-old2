<template lang="pug">
    .layout-container(v-cloak)
        c-back-top(:bottom="10",:right="20")
        c-header
        .layout-main
            keep-alive
                nuxt
        c-footer
</template>
<script>
  import CHeader from '~/components/layout/header'
  import CFooter from '~/components/layout/footer'
  import CBackTop from '~/components/common/back-top'
  import fixed from '~/utils/directive/fixed'

  export default {
    directives: {
      fixed
    },
    methods: {
      tabChange () {
        let originTitle
        document.addEventListener('visibilitychange', event => {
          if (event.target.hidden || event.target.webkitHidden) {
            originTitle = document.title
            document.title = '皮皮虾，快回来！'
          } else {
            document.title = originTitle
          }
        }, false)
      }
    },
    mounted () {
      this.tabChange()
    },
    components: {
      CHeader,
      CFooter,
      CBackTop
    }
  }
</script>
<style lang="scss">
    @import "~assets/scss/application";
    @import "~assets/scss/mixins";

    .layout-container {
        min-height: 100%;
        position: relative;
    }

    .layout-main {
        position: relative;
        display: block;
        width: $main-width;
        margin: 1em auto;
        padding-bottom: $footer-height;
    }


</style>
<style lang="scss">
    [v-cloak] {
        display: none;
    }
</style>

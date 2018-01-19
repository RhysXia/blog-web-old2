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
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .layout-container {

    }

    .layout-main {
        position: relative;
        width: $width-main;
        margin: 0 auto;
    }

    .layout-main {
        margin-top: 1rem;
    }


</style>
<style lang="scss">
    [v-cloak] {
        display: none;
    }
</style>

<template lang="pug">
    .layout-container(v-cloak)
        .particlesJS
        c-header
        c-row.layout-main(type="flex",align="top",justify="center",:gutter="16")
            c-col(:span="4")
                c-menu
            c-col(:span="16")
                keep-alive
                    nuxt
        c-footer
</template>

<script>
  import CHeader from '~/components/layout/header'
  import CMenu from '~/components/layout/menu'
  import CFooter from '~/components/layout/footer'

  export default {
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
      CMenu
    }
  }
</script>
<style lang="scss" scoped>
    .layout-container {

        .layout-main {
            margin: 1rem 0;
        }
    }
</style>
<style lang="scss">
    [v-cloak] {
        display: none;
    }
</style>

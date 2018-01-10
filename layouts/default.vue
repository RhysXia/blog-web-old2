<template lang="pug">
    .layout-container(v-cloak)
        c-back-top(:bottom="10",:right="20")
        .layout-header
            c-header
        c-row.layout-main
            c-col(:span="20",:offset="2")
                c-row(:gutter="16")
                    transition(name="menu")
                        c-col(:span="5",v-show="isMenuShow")
                            c-menu(v-fixed="70")
                    c-col(:span="mainSpan")
                        keep-alive
                            nuxt
                    transition(name="aside")
                        c-col(:span="5",v-show="isAsideShow")
                            c-aside(v-fixed="70")
        c-footer
</template>
<script>
  import CHeader from '~/components/layout/header'
  import CMenu from '~/components/layout/menu'
  import CFooter from '~/components/layout/footer'
  import CAside from '~/components/layout/aside'
  import CBackTop from '~/components/common/back-top'
  import fixed from '~/utils/directive/fixed'

  export default {
    directives: {
      fixed
    },
    computed: {
      isMenuShow () {
        return this.$store.state.isMenuShow
      },
      isAsideShow () {
        return this.$store.state.isAsideShow
      },
      mainSpan () {
        let span = 24
        if (this.isAsideShow) {
          span -= 5
        }
        if (this.isMenuShow) {
          span -= 5
        }
        return span
      }
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
      CMenu,
      CAside,
      CBackTop
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .layout-container {
        .layout-header {
            position: fixed;
            top: 0;
            z-index: $z-index-xl;
            width: 100%;
        }
        .layout-main {
            margin-top: $height-header + 1rem;
            margin-bottom: 1rem;
        }
        .menu-enter-active,
        .menu-leave-active {
            transition: transform 0.4s ease, opacity 0.4s ease;
        }

        .menu-enter,
        .menu-leave-to {
            transform: translateX(-100%);
            opacity: 0;
        }
        .menu-leave-active {
            position: absolute;
            left: 0;
        }

        .menu-enter-to,
        .menu-leave {
            transform: translateX(0);
            opacity: 1;
        }
        .aside-enter-active,
        .aside-leave-active {
            transition: transform 0.4s ease, opacity 0.4s ease;

        }
        .aside-leave-active {
            position: absolute;
            right: 0;
        }

        .aside-enter,
        .aside-leave-to {
            transform: translateX(100%);
            opacity: 0;
        }

        .aside-enter-to,
        .aside-leave {
            transform: translateX(0);
            opacity: 1;
        }
    }
</style>
<style lang="scss">
    [v-cloak] {
        display: none;
    }
</style>

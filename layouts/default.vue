<template lang="pug">
    .layout-container(v-cloak)
        c-header
        c-row.layout-main(type="flex",:gutter="16")
            transition(name="menu")
                c-col(:span="4",v-show="isMenuShow",:offset="2")
                    c-menu
            c-col(:span="mainSpan",:offset="isMenuShow?0:2")
                keep-alive
                    nuxt
            transition(name="aside")
                c-col(:span="4",v-show="isAsideShow")
                    c-aside(:articles="hotArticles",:tags="hotTags")
        c-footer
</template>

<script>
  import CHeader from '~/components/layout/header'
  import CMenu from '~/components/layout/menu'
  import CFooter from '~/components/layout/footer'
  import CAside from '~/components/layout/aside'

  export default {
    computed: {
      isMenuShow () {
        const pageNames = ['auth-login']
        return !pageNames.includes(this.$route.name)
      },
      isAsideShow () {
        const pageNames = ['auth-login', 'about']
        return !pageNames.includes(this.$route.name)
      },
      mainSpan () {
        let span = 20
        if (this.isAsideShow) {
          span -= 4
        }
        if (this.isMenuShow) {
          span -= 4
        }
        return span
      },
      hotArticles () {
        return this.$store.state.hotArticles
      },
      hotTags () {
        return this.$store.state.hotTags
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
      CAside
    }
  }
</script>
<style lang="scss" scoped>
    .layout-container {
        .layout-main {
            margin: 1rem 0;
        }
        .menu-enter-active {
            transition: transform 0.4s ease, opacity 0.4s ease;
        }

        .menu-enter {
            transform: translateX(-100%);
            opacity: 0;
        }

        .menu-enter-to {
            transform: translateX(0);
            opacity: 1;
        }
        .aside-enter-active {
            transition: transform 0.4s ease, opacity 0.4s ease;

        }

        .aside-enter {
            transform: translateX(100%);
            opacity: 0;
        }

        .aside-enter-to {
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

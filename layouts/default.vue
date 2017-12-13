<template lang="pug">
    .layout-container(v-cloak)
        c-header
        c-row.layout-main(type="flex",align="top",justify="center",:gutter="16")
            c-col(:span="4")
                c-menu
            c-col(:span="12")
                keep-alive
                    nuxt
            c-col(:span="4")
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
      hotArticles () {
        return this.$store.state.hotArticles
      },
      hotTags () {
        return this.$store.state.hotTags
      }
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
    }
</style>
<style lang="scss">
    [v-cloak] {
        display: none;
    }
</style>

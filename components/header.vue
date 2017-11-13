<template lang="pug">
    header.nav
        .nav-main
            nuxt-link.nav-logo(to="/")
                img(src="~assets/img/logo.png")
            nuxt-link.nav-logo-info(to="/") Coding All My Life
            ul.nav-menu.right
                li
                    nuxt-link.menu-item(to="/register") 注册
                li
                    nuxt-link.menu-item(to="/login") 登录
</template>
<script>
  export default {}
</script>
<style lang="stylus" scoped>
    .nav
        position sticky
        top 0
        height 50px
        width 100%
        background-color hsla(0, 0%, 100%, .6)
        .nav-main
            display flex
            flex-direction row
            align-items center
            width 1000px
            margin 0 auto
            .nav-logo
                img
                    height 40px
                margin-right 10px
            .nav-logo-info
                padding-top 10px
            .nav-menu
                li
                    display inline-block
                    a
                        padding 0 10px
            .right
                margin-left auto
                margin-right 0

</style>

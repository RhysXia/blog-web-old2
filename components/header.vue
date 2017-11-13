<template lang="pug">
    header.header
        nav.nav
            nuxt-link(to="/").nav-header
                h1.logo Ryths
                span.info Coding All My Life
            .nav-link
                nuxt-link(to="/register").btn 注册
                nuxt-link(to="/login").btn 登陆
</template>
<style lang="stylus" scoped>
    .header
        background-color hsla(0,0%,100%,.6)
        position sticky
        width 100%
        top 0
        .nav
            display flex
            flex-direction row
            align-items center
            height 50px
            width 80%
            margin 0 auto
            justify-content space-between
            .nav-header
                display flex
                flex-direction row
                align-items center
                text-decoration none
                .logo
                    font-size 20px
                    font-weight bold
                    padding-right 10px
                .info
                    font-size 14px
                    &:hover
                        text-decoration underline
</style>

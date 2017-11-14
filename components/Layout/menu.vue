<template lang="pug">
    aside.menu-container
        ul.menu
            li.menu-item
                nuxt-link(to="/")
                    i.fa.fa-home
                    | 首页
            li.menu-item
                nuxt-link(to="/tags")
                    i.fa.fa-tag
                    | 分类
            li.menu-item
                nuxt-link(to="/about")
                    i.fa.fa-user
                    | 关于
</template>
<script>
  export default {}
</script>
<style lang="stylus" scoped>
    @import "~assets/stylus/variables.styl"

    .menu-container
        width $menu-width
        .menu
            .menu-item
                margin-bottom 10px
                a
                    display block
                    font-size $font-size-m
                    font-weight bold
                    border-radius 5px
                    padding 5px 30px
                    color inherit
                    &:hover
                        color $link-color
                a.nuxt-link-exact-active
                    background-color $bg-color
                    color $link-color
                &:first-child
                    margin-top 0
                &:last-child
                    margin-bottom 0
            &:first-child
                margin-top inherit
            &:last-child
                margin-bottom inherit
</style>

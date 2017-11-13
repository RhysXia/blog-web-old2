<template lang="pug">
    aside.aside
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
    .aside
        .menu
            .menu-item
                margin 10px 0
                a
                    font-size 14px
                    font-weight bold
                    border-radius 5px
                    padding 5px 30px
                a.nuxt-link-active
                    background-color #fff
</style>


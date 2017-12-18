<template lang="pug">
    c-row.c-header-container(type="flex",align="middle",justify="center")
        c-col(:span="20")
            c-row(type="flex",align="middle",justify="space-between")
                c-col
                    nuxt-link(to="/")
                        h1.logo Ryths Blog
                c-col
                    .action
                        nuxt-link(to="/auth/login") 登录
                        nuxt-link(to="/auth/register") 注册

</template>
<script>
  export default {
    name: 'header'
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    $height-header: 55px;
    .c-header-container {
        background-color: $color-background;
        height: $height-header;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
        position: sticky;
        top: 0;
        z-index: 1000;
        .logo {
            font-size: 1.4rem;
            color: $color-primary;
        }
        .action {
            margin-right: -1rem;
            a {
                padding-right: 1rem;
            }
        }
    }
</style>

<template lang="pug">
    ul.c-menu-container
        li
            nuxt-link(to="/")
                i.fa.fa-home
                | HOME
        li
            nuxt-link(to="/about")
                i.fa.fa-user
                | ABOUT
</template>

<script>
  export default {
    name: 'menu'
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-menu-container {
        padding-left: 0;
        list-style: none;
        li {
            a {
                display: block;
                padding: 1rem;
                font-size: 1.2rem;
                font-weight: bold;
                transition: background-color $time-transition ease;
                i {
                    padding-right: 0.5rem;
                }
                &.nuxt-link-exact-active {
                    background-color: $color-background;
                    border-radius: 5px;
                }
            }
            margin-bottom: 1rem;
        }
    }
</style>

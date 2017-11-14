<template lang="pug">
    .tag-item-container
        img.poster(:src="tag.poster")
        nuxt-link(:to="'/tags/'+tag.id")
            h1.name {{tag.name}}
        p.desc {{tag.description}}
</template>
<script>
  export default {
    props: {
      tag: {
        type: Object,
        default: () => {
          return {}
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
    @import "~assets/stylus/variables.styl"

    $item-width = ($width - $menu-width - $margin * 5) / 4
    .tag-item-container
        background-color $bg-color
        width $item-width
        display inline-block
        height 300px
        text-align center
        border-radius $border-radius
        &:hover
            background-color $bg-dark-active-color
        .poster
            margin $margin
            height 150px
        .name
            font-size $font-size-xl
        .desc
            overflow hidden
</style>

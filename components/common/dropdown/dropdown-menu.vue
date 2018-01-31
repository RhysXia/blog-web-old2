<template lang="pug">
    ul.c-dropdown__menu(:style="styles")
        slot
</template>

<script>

  export default {
    name: 'c-dropdown-menu',
    props: {
      maxHeight: {
        type: [Number, String]
      }
    },
    computed: {
      styles () {
        const obj = {}
        const height = this.maxHeight
        if (height) {
          if (typeof height === 'number') {
            obj.maxHeight = height + 'px'
          } else {
            obj.maxHeight = height
          }
        }
        return obj
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-dropdown__menu {
        display: block;
        position: relative;
        background-color: $dropdown-bg-color;
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid $border-color;
        box-sizing: border-box;
        border-radius: $border-radius;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>

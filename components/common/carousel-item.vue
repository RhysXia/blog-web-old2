<template lang="pug">
    .c-carousel-item-container(:style="styles")
        slot
</template>

<script>
  import { findComponentUpward } from '../../utils/utils'

  export default {
    name: 'carousel-item',
    data () {
      return {
        parent: null
      }
    },
    computed: {
      styles () {
        let style = {}
        if (this.parent) {
          style = {
            height: this.parent.rHeight + 'px',
            width: this.parent.rWidth + 'px'
          }
        }
        return style
      }
    },
    mounted () {
      this.parent = findComponentUpward(this, 'carousel')
      if (this.parent) {
        this.parent.resetChildren()
      }
    },
    beforeDestroy () {
      if (this.parent) {
        this.parent.resetChildren()
      }
    }
  }
</script>

<style lang="scss" scoped>
    .c-carousel-item-container {
        float: left;
    }
</style>

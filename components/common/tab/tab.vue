<template lang="pug">
    .c-tab(v-show="isShow")
        slot
</template>

<script>
  import { findComponentUpward } from '~/utils/utils'

  export default {
    name: 'c-tab',
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        index: -1,
        parent: null
      }
    },
    computed: {
      isShow () {
        if (this.parent) {
          return this.index === this.parent.activeIndex
        }
        return false
      }
    },
    created () {
      this.parent = findComponentUpward(this, 'c-tab-group')
      if (this.parent) {
        this.parent.updateChildren()
      }
    },
    beforeDestroy () {
      if (this.parent) {
        this.parent.updateChildren()
      }
    }
  }
</script>

<style>

</style>

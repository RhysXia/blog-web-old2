<template lang="pug">
    ul.c-dropdown-menu-container
        slot
</template>

<script>
  import { findComponentUpward } from '../../../utils/utils'

  export default {
    name: 'dropdown-menu',
    data () {
      return {}
    },
    methods: {},
    created () {
      const parent = findComponentUpward(this, 'dropdown')
      this.parent = parent
    }
  }
</script>

<style lang="scss" scoped>
    .c-dropdown-menu-container {

    }
</style>

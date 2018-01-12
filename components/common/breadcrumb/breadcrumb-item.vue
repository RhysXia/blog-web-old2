<template lang="pug">
    span.c-breadcrumb-item-container
        router-link.c-link(v-if="to",:to="to")
            slot
        span.c-link(v-else)
            slot
        span(v-if="separator") {{separator}}
</template>

<script>
  import { findComponentUpward } from '~/utils/utils'

  export default {
    name: 'c-breadcrumb-item',
    props: {
      to: {
        type: [Object, String]
      }
    },
    data () {
      return {
        separator: '',
        parent: null
      }
    },
    created () {
      this.parent = findComponentUpward(this, 'c-breadcrumb')
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

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-breadcrumb-item-container {

    }
</style>

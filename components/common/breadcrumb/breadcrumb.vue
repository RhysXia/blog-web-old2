<template lang="pug">
    .c-breadcrumb
        slot
</template>

<script>
  import { findComponentsDownward } from '~/utils/utils'

  export default {
    name: 'c-breadcrumb',
    props: {
      separator: {
        type: String,
        default: '/'
      }
    },
    data () {
      return {
        children: []
      }
    },
    watch: {
      children (val) {
        for (let i = 0; i < val.length - 1; i++) {
          val[i].separator = this.separator
        }
      }
    },
    methods: {
      updateChildren () {
        this.children = findComponentsDownward(this, 'c-breadcrumb-item', 1)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

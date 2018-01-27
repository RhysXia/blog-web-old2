<template lang="pug">
    .c-checkbox-group
        slot
</template>

<script>
  import { findComponentsDownward } from '~/utils/utils'

  export default {
    name: 'c-checkbox-group',
    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    },
    data () {
      return {
        val: this.value,
        children: []
      }
    },
    watch: {
      value (val) {
        this.val = val
      },
      val (val) {
        this.$emit('input', val)
      }
    },
    methods: {
      updateChildren () {
        this.children = findComponentsDownward(this, 'c-checkbox')
        this.children.forEach(it => {
          it.parent = this
        })
      }
    },
    created () {
      this.updateChildren()
    },
    updated () {
      this.updateChildren()
    }
  }
</script>

<style scoped>

</style>

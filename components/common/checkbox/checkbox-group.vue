<template lang="pug">
    .c-checkbox-group
        slot
</template>

<script>
  export default {
    name: 'c-checkbox-group',
    provide () {
      return {
        cCheckboxGroup: this
      }
    },
    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    },
    data () {
      return {
        val: this.value
      }
    },
    watch: {
      value (val) {
        this.val = val
      },
      val (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

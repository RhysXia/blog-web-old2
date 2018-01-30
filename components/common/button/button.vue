<template lang="pug">
    button.c-button
</template>
<script>
  export default {
    name: 'c-button',
    props: {
      type: {
        type: String,
        validator (val) {
          return ['primary', 'success', 'warning', 'danger', 'info', 'text'].includes(val)
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      round: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>

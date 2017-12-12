<template lang="pug">
    div(:class="classes",:style="styles")
        slot
</template>
<script>
  const prefixCls = 'c-row-container'
  export default {
    props: {
      align: {
        validator (value) {
          return ['top', 'middle', 'bottom'].indexOf(value) !== -1
        }
      },
      justify: {
        validator (value) {
          return ['start', 'end', 'center', 'space-around', 'space-between'].indexOf(value) !== -1
        }
      },
      gutter: {
        type: [Number, String],
        default: 0
      }
    },
    computed: {
      classes () {
        return {
          prefixCls
        }
      },
      styles () {
        let style = {}
        if (this.gutter !== 0) {
          style = {
            marginLeft: this.gutter / -2 + 'px',
            marginRight: this.gutter / -2 + 'px'
          }
        }
        return style
      }
    }
  }
</script>
<style lang="less" scoped>

</style>



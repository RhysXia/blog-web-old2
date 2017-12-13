<template lang="pug">
    div(:class="classes",:style="styles")
        slot
</template>
<script>
  import { findComponentsDownward, oneOf } from '../../utils/utils'

  const prefixCls = 'c-row-container'
  export default {
    name: 'Row',
    props: {
      type: {
        validator (value) {
          return oneOf(value, ['flex'])
        }
      },
      align: {
        validator (value) {
          return oneOf(value, ['top', 'middle', 'bottom'])
        }
      },
      justify: {
        validator (value) {
          return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between'])
        }
      },
      gutter: {
        type: Number,
        default: 0
      }
    },
    computed: {
      classes () {
        return [
          {
            [`${prefixCls}`]: !this.type,
            [`${prefixCls}-${this.type}`]: !!this.type,
            [`${prefixCls}-${this.type}-${this.align}`]: !!this.align,
            [`${prefixCls}-${this.type}-${this.justify}`]: !!this.justify,
            [`${this.className}`]: !!this.className
          }
        ]
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
    },
    methods: {
      updateGutter (val) {
        const Cols = findComponentsDownward(this, 'Col')
        if (Cols.length) {
          Cols.forEach((child) => {
            if (val !== 0) {
              child.gutter = val
            }
          })
        }
      }
    },
    watch: {
      gutter (val) {
        this.updateGutter(val)
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .#{$grid-row-prefixCls} {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .#{$grid-row-prefixCls}-flex {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        &:before,
        &:after {
            display: flex;
        }
        // x轴原点
        &-start {
            justify-content: flex-start;
        }
        // x轴居中
        &-center {
            justify-content: center;
        }
        // x轴反方向
        &-end {
            justify-content: flex-end;
        }
        // x轴平分
        &-space-between {
            justify-content: space-between;
        }
        // x轴有间隔地平分
        &-space-around {
            justify-content: space-around;
        }
        // 顶部对齐
        &-top {
            align-items: flex-start;
        }
        // 居中对齐
        &-middle {
            align-items: center;
        }
        // 底部对齐
        &-bottom {
            align-items: flex-end;
        }
    }
</style>

<template lang="pug">
    .c-carousel-container(:style="styles")
        .c-carousel-wrapper(:style="wrapperStyles")
            slot
</template>

<script>
  import { findComponentsDownward } from '../../utils/utils'

  export default {
    name: 'carousel',
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data () {
      return {
        // 真实宽高
        rWidth: 0,
        rHeight: 0,
        children: [],
        index: 0
      }
    },
    computed: {
      childNum () {
        return this.children.length
      },
      styles () {
        let style = {}
        style = {
          width: this.width,
          height: this.height
        }
        return style
      },
      wrapperStyles () {
        let style = {
          width: this.rWidth * this.childNum + 'px',
          height: this.rHeight + 'px'
        }
        style.transform = `translateX(${-this.index * this.rWidth}px)`
        return style
      }
    },
    methods: {
      resetChildren () {
        this.children = findComponentsDownward(this, 'carousel-item', 1)
      },
      resetSize () {
        this.rWidth = this.$el.offsetWidth
        this.rHeight = this.$el.offsetHeight
      },
      roll () {
        if (this.childNum <= 0) {
          return
        }
        setInterval(() => {
          if (this.index === this.childNum - 1) {
            this.$children.push(this.children[0])
            this.index++
          } else {
            this.index++
          }
        }, 2000)
      }
    },
    mounted () {
      this.resetSize()
      this.roll()
    }
  }
</script>

<style lang="scss" scoped>
    .c-carousel-container {
        position: relative;
        overflow: hidden;
        .c-carousel-wrapper {
            transition: transform 0.5s ease;
        }
    }
</style>

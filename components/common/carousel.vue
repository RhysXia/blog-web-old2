<template lang="pug">
    .c-carousel-container(:style="styles")
        .content-wrapper(ref="contentWrapper")
            .item-wrapper(:class="{'is-animating':index===0||activated}",:style="wrapperStyles",ref="wrapper")
                slot
            .item-wrapper(:class="{'is-animating':index===0||!activated}",:style="wrapperStylesCopy",ref="copyWrapper")
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
        index: 0,
        activated: true
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
        if (this.activated) {
          style.transform = `translateX(${-this.index * this.rWidth}px)`
        } else if (this.index === 0) {
          style.transform = `translateX(${-(this.childNum) * this.rWidth}px)`
        } else {
          style.transform = `translateX(${this.rWidth}px)`
        }
        return style
      },
      wrapperStylesCopy () {
        let style = {
          width: this.rWidth * this.childNum + 'px',
          height: this.rHeight + 'px'
        }
        if (!this.activated) {
          style.transform = `translateX(${-this.index * this.rWidth}px)`
        } else if (this.index === 0) {
          style.transform = `translateX(${-(this.childNum) * this.rWidth}px)`
        } else {
          style.transform = `translateX(${this.rWidth}px)`
        }
        return style
      }
    },
    methods: {
      resetChildren () {
        this.$nextTick(() => {
          this.children = findComponentsDownward(this, 'carousel-item', 1)
          this.$refs.copyWrapper.innerHTML = this.$refs.wrapper.innerHTML
        })
      },
      init () {
        this.rWidth = this.$el.offsetWidth
        this.rHeight = this.$el.offsetHeight
      },
      rollOneTime () {
        if (this.childNum <= 1) {
          return
        }
        // 如果已经滚动到末尾
        if (this.index === this.childNum - 1) {
          // 将第一组元素放到末尾
          this.activated = !this.activated
          this.index = 0
          return
        }
        this.index++
      }
    },
    mounted () {
      this.init()
      this.$nextTick(() => {
        setInterval(this.rollOneTime, 1000)
      })
    }
  }
</script>

<style lang="scss" scoped>
    .c-carousel-container {
        position: relative;
        .content-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            .item-wrapper {
                position: absolute;
                left: 0;
                top: 0;
            }
            .is-animating {
                transition: transform 0.5s ease;
            }
        }

    }
</style>

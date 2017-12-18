<template lang="pug">
    .c-carousel-container(:style="styles",@mouseenter.stop="mouseenter",@mouseleave.stop="mouseleave")
        .c-content-wrapper
            slot
            i.c-direction.fa.fa-angle-left(@click="moveTo(activeIndex-1)")
            i.c-direction.fa.fa-angle-right(@click="moveTo(activeIndex+1)")
        .c-index-wrapper(v-if="childNum>0")
            .c-index(v-for="index in childNum",:key="index",@click="moveTo(index-1)")
                .c-index-item(:class="{'is-active':index-1===activeIndex}")
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
      },
      interval: {
        type: Number,
        default: 2000
      }
    },
    data () {
      return {
        // 真实宽高
        rWidth: 0,
        rHeight: 0,
        children: [],
        activeIndex: 0,
        timer: null
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
      }
    },
    methods: {
      moveTo (index) {
        if (this.childNum <= 0) {
          return
        }
        //将所有children的动画关闭
        this.children.forEach(child => {
          child.isAnimated = false
        })
        index = index < 0 ? this.childNum - 1 : index > this.childNum - 1 ? 0 : index
        if ((index === 0 && this.activeIndex === this.childNum - 1) || (index === this.childNum - 1 && this.activeIndex === 0)) {
          this.children[0].isAnimated = true
          this.children[this.childNum - 1].isAnimated = true
        } else {
          const max = index > this.activeIndex ? index : this.activeIndex
          const min = index > this.activeIndex ? this.activeIndex : index
          for (let i = min; i <= max; i++) {
            this.children[i].isAnimated = true
          }
        }
        this.activeIndex = index
      },
      mouseenter () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
      },
      mouseleave () {
        this.timer = setInterval(this.rollOneTime, this.interval)
      },
      resetChildren () {
        this.$nextTick(() => {
          this.children = findComponentsDownward(this, 'carousel-item', 1)
          for (let i = 0; i < this.children.length; i++) {
            this.children[i].index = i
          }
        })
      },
      init () {
        this.rWidth = this.$el.offsetWidth
        this.rHeight = this.$el.offsetHeight
      },
      rollOneTime () {
        this.moveTo(this.activeIndex + 1)
      }
    },
    mounted () {
      this.init()
      window.onresize = this.init
      this.$nextTick(() => {
        this.timer = setInterval(this.rollOneTime, this.interval)
      })
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-carousel-container {
        position: relative;
        .c-content-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            display: flex;
            .c-direction {
                position: absolute;
                z-index: 1001;
                display: flex;
                align-self: center;
                font-size: 40px;
                color: $color-text;
                opacity: 0.5;
                cursor: pointer;
                &:hover {
                    opacity: 0.8;
                }
                &.fa-angle-left {
                    left: 0.5rem;
                }
                &.fa-angle-right {
                    right: 0.5rem;
                }
            }
        }
        .c-index-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 10%;
            left: 50%;
            z-index: 1000;
            cursor: pointer;
            .c-index {
                padding: 5px;
                .c-index-item {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background-color: $color-border-base;
                    opacity: 0.3;
                    &.is-active {
                        opacity: 1;
                    }
                }
            }

        }
    }
</style>

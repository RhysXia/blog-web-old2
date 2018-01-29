<template lang="pug">
    .c-carousel(@mouseenter.stop="mouseEnter",@mouseleave.stop="mouseLeave")
        .c-carousel__content--wrapper
            slot
        i.c-carousel__direction.fa.fa-angle-left(@click="moveTo(activeIndex-1)")
        i.c-carousel__direction.fa.fa-angle-right(@click="moveTo(activeIndex+1)")
        ul.c-carousel__index--wrapper(v-if="childNum>0")
            li.c-carousel__index(v-for="index in childNum",:key="index",@click="moveTo(index-1)")
                .c-carousel__index__item(:class="{'c-carousel__index__item--active':index-1===activeIndex}")
</template>
<script>

  export default {
    name: 'c-carousel',
    props: {
      interval: {
        type: Number,
        default: 3000
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
      }
    },
    watch: {
      children (val) {
        val.forEach((it, index) => {
          it.index = index
        })
      }
    },
    methods: {
      moveTo (index) {
        if (this.childNum <= 0) {
          return
        }
        // 将所有children的动画关闭
        this.children.forEach(child => {
          child.isAnimated = false
        })
        index = index < 0 ? this.childNum - 1 : index > this.childNum - 1 ? 0 : index
        if ((index === 0 && this.activeIndex === this.childNum - 1) ||
          (index === this.childNum - 1 && this.activeIndex === 0)) {
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
      mouseEnter () {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      },
      mouseLeave () {
        this.timer = setInterval(this.rollOneTime, this.interval)
      },
      init () {
        this.children = this.$children
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
    },
    updated () {
      this.init()
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-carousel {
        position: relative;
        width: 100%;
        height: 100%;
        .c-carousel__content--wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .c-carousel__direction {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 40px;
            color: $carousel-direction-color;
            opacity: 0.5;
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
            &.fa-angle-left {
                left: 0.5em;
            }
            &.fa-angle-right {
                right: 0.5em;
            }
        }
        .c-carousel__index--wrapper {
            display: block;
            position: absolute;
            bottom: 1em;
            cursor: pointer;
            left: 50%;
            transform: translateX(-50%);
            .c-carousel__index {
                display: inline-block;
                padding: 5px;
                .c-carousel__index__item {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background-color: $carousel-direction-color;
                    opacity: 0.3;
                    &.c-carousel__index__item--active {
                        opacity: 1;
                    }
                }
                &:hover {
                    .c-carousel__index__item {
                        opacity: 1;
                    }
                }
            }

        }
    }
</style>

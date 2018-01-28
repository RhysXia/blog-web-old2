<template lang="pug">
    transition(name="c-back-top--slide")
        .c-back-top(v-show="isShow",:style="styles",@click="click")
            slot
                i.fa.fa-arrow-circle-up
</template>

<script>
  function scrollTop (el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 1000 / 60)
        }
      )
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    function scroll (start, end, step) {
      if (start === end) return

      let d = (start + step > end) ? end : start + step
      if (start > end) {
        d = (start - step < end) ? end : start - step
      }

      if (el === window) {
        window.scrollTo(d, d)
      } else {
        el.scrollTop = d
      }
      window.requestAnimationFrame(() => scroll(d, end, step))
    }

    scroll(from, to, step)
  }

  export default {
    name: 'c-back-top',
    props: {
      left: {
        type: Number
      },
      right: {
        type: Number
      },
      top: {
        type: Number
      },
      bottom: {
        type: Number
      },
      // 滚动所需时间
      duration: {
        type: Number,
        default: 1000
      }
    },
    data () {
      return {
        scrollTop: 0,
        clientHeight: 0
      }
    },
    computed: {
      isShow () {
        return this.scrollTop > this.clientHeight
      },
      styles () {
        const style = {}
        if (this.left) {
          style.left = this.left + 'px'
        }
        if (this.right) {
          style.right = this.right + 'px'
        }
        if (this.top) {
          style.top = this.top + 'px'
        }
        if (this.bottom) {
          style.bottom = this.bottom + 'px'
        }
        return style
      }
    },
    methods: {
      updatePos () {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      },
      click () {
        scrollTop(window, this.scrollTop, 0, this.duration)
      }
    },
    mounted () {
      this.updatePos()
      window.addEventListener('resize', this.updatePos)
      window.addEventListener('scroll', this.updatePos)
    },
    updatePos () {
      this.updatePos()
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.updatePos)
      window.removeEventListener('scroll', this.updatePos)
      // 防止定时器还没结束就销毁了页面
      clearInterval(this._timer)
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-back-top {
        position: fixed;
        cursor: pointer;
        display: inline-block;
        i {
            font-size: 3em;
            color: $color-success;
        }
    }

    .c-back-top--slide-enter-active,
    .c-back-top--slide-leave-active {
        transform-origin: 0 0;
        transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    }

    .c-back-top--slide-enter,
    .c-back-top--slide-leave-to {
        opacity: 0;
        transform: scaleX(0.5);
    }

    .c-back-top--slide-leave,
    .c-back-top--slide-enter-to {
        opacity: 1;
        transform: scaleX(1);
    }
</style>

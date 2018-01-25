<template lang="pug">
    transition(name="c-back-top--animation")
        .c-back-top(v-show="isShow",:style="styles",@click="click")
            i.fa.fa-arrow-circle-up
</template>

<script>
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
      scrollTime: {
        type: Number,
        default: 500
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
        let scrollTop = this.scrollTop
        let time = this.scrollTime / 10
        const speed = scrollTop / time
        this._timer = setInterval(() => {
          scrollTop -= speed
          if (scrollTop <= 0) {
            clearInterval(this._timer)
          }
          window.scrollTo(0, scrollTop)
        }, 10)
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

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    @include slide(c-back-top--animation, left)
    .c-back-top {
        z-index: $z-index-l;
        position: fixed;
        cursor: pointer;
        display: inline-block;
        i {
            font-size: 3em;
            color: $color-success;
        }
    }
</style>

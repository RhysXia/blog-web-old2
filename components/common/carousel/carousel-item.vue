<template lang="pug">
    .c-carousel__item(:style="styles")
        slot
</template>

<script>

  export default {
    name: 'c-carousel-item',
    data () {
      return {
        index: 0,
        isAnimated: false
      }
    },
    computed: {
      styles () {
        const styles = {}
        const parent = this.$parent
        styles.height = parent.rHeight + 'px'
        styles.width = parent.rWidth + 'px'
        const isLast = this.index === parent.childNum - 1
        const isFirst = this.index === 0
        if (parent.childNum <= 1) {
          styles.transform = `translateX(0px)`
        } else if (this.activeIndex === 0 && isLast) {
          styles.transform = `translateX(-${parent.rWidth}px)`
        } else if (this.activeIndex === parent.childNum - 1 && isFirst) {
          styles.transform = `translateX(${parent.rWidth}px)`
        } else {
          styles.transform = `translateX(${(this.index - this.activeIndex) * parent.rWidth}px)`
        }
        if (this.isAnimated) {
          styles.transition = `transform 0.4s ease`
        }
        return styles
      },
      activeIndex () {
        return this.$parent.activeIndex
      }
    }
  }
</script>

<style lang="scss">
    .c-carousel__item {
        // 必须设置position，否则z-index无效
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

<template lang="pug">
    .c-dropdown(v-clickoutside="handleClose",@mouseenter.stop="mouseenter",@mouseleave.stop="mouseleave")
        .c-dropdown__ref(@click="refClick")
            slot
        transition(:name="'c-dropdown--slide-'+position")
            .c-dropdown(v-show="visible",:class="'c-dropdown--'+position")
                slot(name="list")
</template>

<script>
  import clickoutside from '~/utils/directive/clickoutside'

  export default {
    name: 'c-dropdown',
    directives: {
      clickoutside
    },
    props: {
      // bottom bottom-start bottom-end
      // top top-start top-end
      position: {
        type: String,
        default: 'bottom',
        validator: val => {
          return [
            'top', 'top-start', 'top-end',
            'left', 'left-start', 'left-end',
            'right', 'right-start', 'right-end',
            'bottom', 'bottom-start', 'bottom-end'
          ].includes(val)
        }
      },
      trigger: {
        // custom表示手动控制
        validator (val) {
          return ['click', 'hover', 'custom'].includes(val)
        },
        default: 'hover'
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        visible: this.value
      }
    },
    watch: {
      visible (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.visible = val
      }
    },
    methods: {
      handleClose () {
        this.visible = false
      },
      refClick () {
        if (this.trigger === '') {
          return
        }
        this.visible = true
      },
      mouseenter () {
        if (this.trigger === 'hover') {
          this.visible = true
        }
      },
      mouseleave () {
        if (this.trigger === 'hover') {
          this.visible = false
        }
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    @mixin slide($className,$direction:bottom,$duration:0.2s) {
        .#{$className}-#{$direction}-enter-active,
        .#{$className}-#{$direction}-leave-active {
            transition: transform #{$duration} ease-in-out, opacity #{$duration} ease-in-out;
            @if ($direction == top or $direction == top-start or $direction == top-end or $direction == left-end or $direction == right-end) {
                transform-origin: 0 100%;
            } @else {
                transform-origin: 0 0;
            }
        }
        .#{$className}-#{$direction}-enter,
        .#{$className}-#{$direction}-leave-to {
            opacity: 0;
            @if ($direction == bottom or $direction == top) {
                transform: translateX(-50%) scaleY(0.5);
            } @else if ($direction == left or $direction == right) {
                transform: translateY(-50%) scaleY(0.5);
            } @else {
                transform: scaleY(0.5);
            }
        }
        .#{$className}-#{$direction}-leave,
        .#{$className}-#{$direction}-enter-to {
            opacity: 1;
            @if ($direction == bottom or $direction == top) {
                transform: translateX(-50%) scaleY(1);
            } @else if ($direction == left or $direction == right) {
                transform: translateY(-50%) scaleY(1);
            } @else {
                transform: scaleY(1);
            }
        }
    }

    @mixin slide-all($className,$directions,$duration:0.2s) {
        @each $direction in $directions {
            @include slide($className, $direction, $duration);
        }
    }

    .c-dropdown {
        display: inline-block;
        position: relative;
        .c-dropdown__ref {
            position: relative;
        }
        .c-dropdown {
            background-color: transparent;
            position: absolute;
            z-index: 1;
            border-radius: $border-radius-base;
        }

        .c-dropdown--bottom {
            padding-top: 0.5em;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
        }

        .c-dropdown--bottom-start {
            padding-top: 0.5em;
            top: 100%;
            left: 0;
        }

        .c-dropdown--bottom-end {
            padding-top: 0.5em;
            top: 100%;
            right: 0;
        }
        .c-dropdown--top {
            padding-bottom: 0.5em;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
        }

        .c-dropdown--top-start {
            padding-bottom: 0.5em;
            bottom: 100%;
            left: 0;
        }

        .c-dropdown--top-end {
            padding-bottom: 0.5em;
            bottom: 100%;
            right: 0;
        }
        .c-dropdown--left {
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            padding-right: 0.5em;
        }

        .c-dropdown--left-start {
            right: 100%;
            top: 0;
            padding-right: 0.5em;
        }
        .c-dropdown--left-end {
            right: 100%;
            bottom: 0;
            padding-right: 0.5em;
        }
        .c-dropdown--right {
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            padding-left: 0.5em;
        }
        .c-dropdown--right-start {
            left: 100%;
            top: 0;
            padding-left: 0.5em;
        }
        .c-dropdown--right-end {
            left: 100%;
            bottom: 0;
            padding-left: 0.5em;
        }

        @include slide-all(c-dropdown--slide, (top, top-start, top-end, left, left-start, left-end, right, right-start, right-end, bottom, bottom-start, bottom-end), 0.2s)

    }


</style>

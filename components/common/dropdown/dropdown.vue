<template lang="pug">
    .c-dropdown(v-clickoutside="handleClose",@mouseenter.stop="mouseenter",@mouseleave.stop="mouseleave")
        .c-dropdown__ref(@click="refClick")
            slot
        transition(:name="transitionName")
            .c-dropdown__list(v-show="visible",:class="'c-dropdown__list--'+position")
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
      position: {
        type: String,
        default: 'bottom'
      },
      trigger: {
        // none表示不触发
        validator (val) {
          return ['click', 'hover', 'none'].includes(val)
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
    computed: {
      transitionName () {
        if (this.position === 'top') {
          return 'c-dropdown--slide-top'
        }
        return 'c-dropdown--slide-bottom'
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
        if (this.trigger === 'none') {
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

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-dropdown {
        position: relative;
        cursor: pointer;
        .c-dropdown__ref {
            position: relative;
            background-color: transparent;
        }
        .c-dropdown__list {
            position: absolute;
            z-index: $z-index-xl;
            border: 1px solid $color-border-base;
            border-radius: 0.3em;
            background-color: $color-background;
        }
        .c-dropdown__list--bottom {
            top: 100%;
            left: 0;
            min-width: 100%;
            margin-top: 0.15em;
        }
        .c-dropdown__list--top {
            bottom: 100%;
            left: 0;
            min-width: 100%;
            margin-bottom: 0.15em;
        }
        .c-dropdown__list--left {
            right: 100%;
            top: 0;
            min-height: 100%;
        }
        .c-dropdown__list--right {
            left: 100%;
            top: 0;
            min-height: 100%;
        }
        @include slide(c-dropdown--slide-bottom, bottom);
        @include slide(c-dropdown--slide-top, top);
    }
</style>

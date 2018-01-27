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

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-dropdown {
        display: inline-block;
        .c-dropdown__ref{
            position: relative;
        }
        .c-dropdown__list{
            margin: 0.5em 0;
            padding: 0.5em 0;
            background-color: $body-background;
        }
    }
</style>

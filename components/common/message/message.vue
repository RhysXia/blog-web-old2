<template lang="pug">
    transition(name="c-message--fade",@after-leave="afterLeave")
        .c-message(v-show="visible",:class="'c-message--'+type",@mouseenter="clearTimer",@mouseleave="startTimer")
            i.c-message__icon.iconfont(:class="'icon-'+type")
            slot
                p.c-message__content(v-if="asHTML",v-html="content")
                p.c-message__content(v-else) {{content}}
            i.c-message__close(v-if="showClose",@click="close")
</template>

<script>
  export default {
    name: 'c-message',
    props: {
      content: {
        type: String
      },
      duration: {
        type: Number,
        default: 3000
      },
      type: {
        default: 'info',
        validator (value) {
          return ['info', 'success', 'warning', 'error'].includes(value)
        }
      },
      showClose: {
        type: Boolean,
        default: false
      },
      onClose: {
        type: Function
      },
      // 内容作为html
      asHTML: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        visible: false,
        timer: null
      }
    },
    methods: {
      close () {
        this.visible = false
      },
      afterLeave () {
        if (this.visible) {
          return
        }
        if (typeof this.onClose === 'function') {
          this.onClose()
        }
      },
      startTimer () {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            this.visible = false
          }, this.duration)
        }
      },
      clearTimer () {
        clearTimeout(this.timer)
      }
    },
    mounted () {
      this.startTimer()
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";
    @import "./assets/iconfont.css";

    .c-message {
        min-width: 20em;
        box-sizing: border-box;
        border-radius: $border-radius-small;
        border: 1px solid $border-color-base;
        position: fixed;
        left: 50%;
        top: 2em;
        transform: translateX(-50%);

    }

    .c-message--info {
        border-color: $color-primary;
        color: $color-primary-active;
        background-color: $color-primary-light;
    }

    .c-message--error {
        border-color: $color-danger;
        color: $color-danger-active;
        background-color: $color-danger-light;
    }

    .c-message--info {
        color: $color-success;
        border-color: $color-success-active;
        background-color: $color-success-light;
    }

    .c-message--success {
        color: $color-success;
        border-color: $color-success-active;
        background-color: $color-success-light;
    }

    .c-message--warning {
        color: $color-warn;
        border-color: $color-white-active;
        background-color: $color-warn-light;
    }

    .c-message--fade-enter-active,
    .c-message--fade-leave-active {
        transition: top 0.4s ease-in-out, opacity 0.4s ease-in-out;
    }

    .c-message--fade-enter-to,
    .c-message--fade-leave {
        top: 2em;
        opacity: 1;
    }

    .c-message--fade-enter,
    .c-message--fade-leave-to {
        top: 0;
        opacity: 0;
    }
</style>

<template lang="pug">
    transition(name="c-message--fade",@after-leave="afterLeave")
        .c-message(v-show="visible",:class="'c-message--'+type",@mouseenter="clearTimer",@mouseleave="startTimer")
            i.c-message__icon.iconfont(:class="'icon-'+type")
            slot
                p.c-message__content(v-if="asHTML",v-html="content")
                p.c-message__content(v-else) {{content}}
            i.c-message__close.iconfont.icon-close(v-if="showClose",@click="close")
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
        border: 1px solid;
        position: fixed;
        left: 50%;
        top: 2em;
        transform: translateX(-50%);
        overflow: hidden;
        padding: 0.25em;
        display: flex;
        align-items: center;
        .c-message__content {
            margin: 0;
            padding-left: 1em;
        }
        .c-message__close {
            position: absolute;
            top: 50%;
            right: 1em;
            transform: translateY(-50%);
            cursor: pointer;
            color: $message-close-color;
            &:hover {
                color: $message-close-hover-color;
            }
        }
    }

    .c-message--info {
        background-color: $message-info-bg;
        border-color: $message-info-border;
        color: $message-info-color;
    }

    .c-message--success {
        color: $message-success-color;
        border-color: $message-success-border;
        background-color: $message-success-bg;
    }

    .c-message--error {
        border-color: $message-error-border;
        color: $message-error-color;
        background-color: $message-error-bg;
    }

    .c-message--warning {
        color: $message-warning-color;
        border-color: $message-warning-border;
        background-color: $message-warning-bg;
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

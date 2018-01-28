<template lang="pug">
    transition(name="c-message--animation",@after-leave="afterLeave")
        .c-message(v-show="visible",:class="'c-message--'+type")
            i.c-message__icon.iconfont(:class="'icon-'+type")
            .c-message__content {{content}}
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
        validator (value) {
          return ['info', 'success', 'warning', 'error'].includes(value)
        }
      },
      onClose: {
        type: Function
      }
    },
    data () {
      return {
        visible: false,
        timer: null
      }
    },
    methods: {
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
      }
    },
    mounted () {
      this.startTimer()
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "./assets/iconfont.css";

    .c-message {
        position: fixed;
        top: 2em;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.4em 1em;
        border-radius: 0.2em;
        border: 1px solid;
        .c-message__icon {
            display: inline-block;
            margin-right: 0.5em;
            font-size: 1.5em;
            &:before {
            }
        }
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

    .c-message-tran-enter-active,
    .c-message-tran-leave-active {
        transition: top 0.4s ease-in-out, opacity 0.4s ease-in-out;
    }

    .c-message--animation-enter-to,
    .c-message--animation-leave {
        top: 2em;
        opacity: 1;
    }

    .c-message--animation-enter,
    .c-message--animation-leave-to {
        top: 0;
        opacity: 0;
    }
</style>

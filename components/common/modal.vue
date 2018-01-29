<template lang="pug">
    transition(name="c-modal--fade")
        .c-modal(v-if="val",@click='outClick')
            .c-modal__wrapper(@click.stop,:style="{width:width}")
                .c-modal__header
                    slot(name="header")
                        span.c-modal__title {{title}}
                    span.c-modal__close(@click="val=false")
                        i.fa.fa-close
                .c-modal__body
                    slot
                .c-modal__footer
                    slot(name="footer")
                        .c-modal__button-wrapper
                            button.c-modal__button.primary(@click="confirm") 确定
                            button.c-modal__button(@click="cancel") 取消
</template>
<script>

  export default {
    name: 'c-modal',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '对话框'
      },
      width: {
        type: String,
        default: '40%'
      }
    },
    data () {
      return {
        bodyOverflow: null,
        val: this.value
      }
    },
    watch: {
      val (v) {
        if (v) {
          this.stopScroll()
        } else {
          this.canScroll()
        }
        this.$emit('input', v)
      },
      value (val) {
        this.val = val
      }
    },
    methods: {
      confirm () {
        this.$emit('confirm')
        this.val = false
      },
      cancel () {
        this.$emit('cancel')
        this.val = false
      },
      outClick () {
        this.val = false
      },
      stopScroll () {
        const el = document.documentElement || document.body
        el.style.overflow = 'hidden'
      },
      canScroll () {
        const el = document.documentElement || document.body
        el.style.overflow = this.bodyOverflow
      }
    },
    mounted () {
      const el = document.documentElement || document.body
      this.bodyOverflow = el.style.overflow
    },
    beforeDestroy () {
      this.canScroll()
    }
  }
</script>
<style lang="scss">
    @import "~assets/scss/variables";

    .c-modal--fade-enter-active,
    .c-modal--fade-leave-active {
        transition: transform 0.4s ease-in-out;
    }

    .c-modal--fade-enter,
    .c-modal--fade-leave-to {
        transform: translateY(-100%);
    }

    .c-modal--fade-enter-to,
    .c-modal--fade-leave {
        transform: translateY(0);
    }

    .c-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: $modal-shadow;
        .c-modal__wrapper {
            background-color: $modal-bg;
            border: 1px solid $border-color-base;
            border-radius: $border-color-base;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            > * {
                padding: 0.5em;
            }
            .c-modal__header {
                position: relative;
                border-bottom: 1px solid $border-color-base;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                .c-modal__title {
                    font-weight: bold;
                }
                .c-modal__close {
                    display: block;
                    cursor: pointer;
                    padding: 0.5em;
                    &:hover {
                        color: $primary-color;
                    }
                }
            }
            .c-modal__body {

            }
            .c-modal__footer {
                border-top: 1px solid $border-color-base;
                .c-modal__button-wrapper {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    .primary {
                        margin-right: 0.5em;
                    }
                }
            }
        }
    }
</style>

<template lang="pug">
    .c-modal(tabindex="-1",v-if="val",@click="outClick",@keyup.esc="escPress",:class="classes")
        .c-modal--wrapper(@click.stop,:style="styles")
            span.c-modal__close(@click="close")
                i.fa.fa-close
            .c-modal__header
                slot(name="header")
                    h1.c-modal__title {{title}}
            .c-modal__body
                slot
            .c-modal__footer
                slot(name="footer")
                    .c-modal__button
                        c-button(@click="$emit('on-confirm')",type="primary") 确定
                        c-button(@click="$emit('on-cancel')") 取消
</template>
<script>
  import CButton from './button'

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
      },
      top: {
        type: String,
        default: '10%'
      },
      // 禁用滚动条
      lockScroll: {
        type: Boolean,
        default: true
      },
      closeOnClickMask: {
        type: Boolean,
        default: true
      },
      closeOnPressESC: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        val: this.value,
        bodyOverflow: null
      }
    },
    watch: {
      val (v) {
        if (v) {
          this.$nextTick(() => {
            this.$el.focus()
          })
        }
        this.$emit('input', v)
      },
      value (val) {
        this.val = val
      }
    },
    computed: {
      classes () {
        const cls = []

        return cls
      },
      styles () {
        let width = this.width
        if (typeof width === 'number') {
          width = width + 'px'
        }
        return {
          width,
          margin: `${this.top} auto auto`
        }
      }
    },
    methods: {
      close () {
        this.val = false
      },
      outClick () {
        if (this.closeOnClickMask) {
          this.val = false
        }
      },
      escPress () {
        if (this.closeOnPressESC) {
          this.val = false
        }
      }
    },
    mounted () {
      if (this.val) {
        this.$nextTick(() => {
          this.$el.focus()
        })
      }
      this.bodyOverflow = document.body.style.overflow
      if (this.lockScroll) {
        document.body.style.overflow = 'hidden'
      }
    },
    update () {
      if (this.lockScroll) {
        document.body.style.overflow = 'hidden'
      }
    },
    beforeDestroy () {
      document.body.style.overflow = this.bodyOverflow
    },
    components: {
      CButton
    }
  }
</script>
<style lang="scss">
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-modal {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        border: 0;
        width: 100%;
        height: 100%;
        background-color: $modal-mask-bg-color;
        overflow: auto;
        .c-modal--wrapper {
            position: relative;
            background-color: $modal-bg-color;
            border-radius: $border-radius;
            box-shadow: $modal-box-shadow;

            .c-modal__close {
                position: absolute;
                right: 0.5em;
                top: 0.5em;
                padding: 0.5em;
                cursor: pointer;
                color: $modal-close-color;
                transition: color 0.2s ease-in-out;
                &:hover {
                    color: $modal-close-color--hover;
                }
            }

            .c-modal__header {
                border-bottom: 1px solid $border-color;
                padding: 1em;
                .c-modal__title {
                    margin: 0;
                    font-size: 1.2em;
                    font-weight: bold;
                }
            }
            .c-modal__body {
                padding: 1em;
            }
            .c-modal__footer {
                border-top: 1px solid $border-color;
                padding: 1em;
                .c-modal__button {
                    @include clearfix;
                    .c-button {
                        float: right;
                        margin-left: 1em;
                    }

                }
            }
        }
    }

</style>

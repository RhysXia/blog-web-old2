<template lang="pug">
    button.c-button(@click="click",:type="nativeType",:class="classes")
        slot
</template>
<script>
  export default {
    name: 'c-button',
    props: {
      type: {
        default: 'default',
        validator (val) {
          return ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text'].includes(val)
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      round: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      },
      nativeType: {
        default: 'button',
        validator (val) {
          return ['button', 'submit', 'reset'].includes(val)
        }
      }
    },
    computed: {
      classes () {
        return {
          [`c-button--${this.type}`]: true,
          'c-button--round': this.round,
          'c-button--plain': this.plain,
          'c-button--disabled': this.disabled
        }
      }
    },
    methods: {
      click (e) {
        if (!this.disabled) {
          this.$emit('click', e)
        }
      }
    }
  }
</script>
<style lang="scss">
    @import "~assets/scss/variables";

    .c-button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: 0.2s ease-in-out;
        color: $button-color;
        &::-moz-focus-inner {
            border: 0;
        }
        border-radius: $button-radius;
        padding: 0.4em 0.6em;
        border: 1px solid;
    }

    .c-button--round {
        border-radius: 1em;
    }

    .c-button--plain {
        background-color: $button-bg-color !important;
        &:hover {
            background-color: $button-bg-color !important;
        }
    }

    .c-button--disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    .c-button--default {
        background-color: $button-bg-color--default;
        color: $button-color--default;
        border-color: $button-border-color--default;
        &:hover {
            background-color: $button-bg-color--default--hover;
            color: $button-color--default--hover;
            border-color: $button-border-color--default--hover;
        }
        &.c-button--disabled{
            &:hover{
                background-color: $button-bg-color--default;
                color: $button-color--default;
                border-color: $button-border-color--default;
            }
        }
    }

    .c-button--primary {
        background-color: $button-bg-color--primary;
        border-color: $button-border-color--primary;
        &:hover {
            background-color: $button-bg-color--primary--hover;
            border-color: $button-border-color--primary--hover;
        }
        &.c-button--plain {
            color: $button-border-color--primary;
            &:hover {
                color: $button-border-color--primary--hover;
            }
        }

        &.c-button--disabled{
            &:hover{
                background-color: $button-bg-color--primary;
                border-color: $button-border-color--primary;
            }
            &.c-button--plain {
                &:hover {
                    color: $button-border-color--primary;
                }
            }
        }
    }

    .c-button--success {
        background-color: $button-bg-color--success;
        border-color: $button-border-color--success;
        &:hover {
            background-color: $button-bg-color--success--hover;
            border-color: $button-border-color--success--hover;
        }
        &.c-button--plain {
            color: $button-border-color--success;
            &:hover {
                color: $button-border-color--success--hover;
            }
        }
        &.c-button--disabled{
            &:hover{
                background-color: $button-bg-color--success;
                border-color: $button-border-color--success;
            }
            &.c-button--plain {
                &:hover {
                    color: $button-border-color--success;
                }
            }
        }
    }

    .c-button--error {
        background-color: $button-bg-color--error;
        border-color: $button-border-color--error;
        &:hover {
            background-color: $button-bg-color--error--hover;
            border-color: $button-border-color--error--hover;
        }
        &.c-button--plain {
            color: $button-border-color--error;
            &:hover {
                color: $button-border-color--error--hover;
            }
        }

        .c-button--success {
            background-color: $button-bg-color--success;
            border-color: $button-border-color--success;
            &:hover {
                background-color: $button-bg-color--success--hover;
                border-color: $button-border-color--success--hover;
            }
            &.c-button--plain {
                color: $button-border-color--success;
                &:hover {
                    color: $button-border-color--success--hover;
                }
            }
            &.c-button--disabled{
                &:hover{
                    background-color: $button-bg-color--success;
                    border-color: $button-border-color--success;
                }
                &.c-button--plain {
                    &:hover {
                        color: $button-border-color--success;
                    }
                }
            }
        }
    }

    .c-button--warning {
        background-color: $button-bg-color--warning;
        border-color: $button-border-color--warning;
        &:hover {
            background-color: $button-bg-color--warning--hover;
            border-color: $button-border-color--warning--hover;
        }
        &.c-button--plain {
            color: $button-border-color--warning;
            &:hover {
                color: $button-border-color--warning--hover;
            }
        }
        &.c-button--disabled{
            &:hover{
                background-color: $button-bg-color--warning;
                border-color: $button-border-color--warning;
            }
            &.c-button--plain {
                &:hover {
                    color: $button-border-color--warning;
                }
            }
        }
    }

    .c-button--info {
        background-color: $button-bg-color--info;
        border-color: $button-border-color--info;
        &:hover {
            background-color: $button-bg-color--info--hover;
            border-color: $button-border-color--info--hover;
        }
        &.c-button--plain {
            color: $button-border-color--info;
            &:hover {
                color: $button-border-color--info--hover;
            }
        }
        &.c-button--disabled{
            &:hover{
                background-color: $button-bg-color--info;
                border-color: $button-border-color--info;
            }
            &.c-button--plain {
                &:hover {
                    color: $button-border-color--info;
                }
            }
        }
    }
</style>

<template lang="pug">
    .c-input(:class="classes")
        .c-input__wrapper(v-if="type==='textarea'")
            textarea.c-input__textarea(@focus="focusHandler",:style="{minHeight:minHeight +'px',overflow:'hidden'}",@blur="blurHandler",v-if="autoSize",v-autoheight="autoSize",v-model="content",:placeholder="placeholder",:disabled="disabled",:readonly="readonly")
            textarea.c-input__textarea(@focus="focusHandler",:style="{minHeight:minHeight +'px'}",@blur="blurHandler",v-else,v-model="content",:placeholder="placeholder",:disabled="disabled",:readonly="readonly")
        template(v-else)
            span.c-input__prepend(v-if="$slots.prepend")
                slot(name="prepend")
            .c-input__wrapper
                input.c-input__input(@focus="focusHandler",@blur="blurHandler",:type="type",:disabled="disabled",:readonly="readonly",v-model="content",:placeholder="placeholder")
                span.c-input__close(@click="content=''",v-if="clearable && !readonly && !disabled && content")
                    i.fa.fa-close
            span.c-input__append(v-if="$slots.append")
                slot(name="append")
</template>
<script>
  import autoheight from '~/utils/directive/auto-height'

  export default {
    name: 'c-input',
    directives: {
      autoheight
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      type: {
        default: 'text',
        validator (val) {
          return ['text', 'textarea', 'password', 'url', 'email', 'data'].includes(val)
        }
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      minHeight: {
        type: Number,
        default: 50
      },
      // 自适应高度，针对textarea，
      // object：{max:100,min:10} // px
      autoSize: {
        type: [Boolean, Object],
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        content: this.value,
        isFocus: false
      }
    },
    watch: {
      content (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.content = val
      }
    },
    computed: {
      classes () {
        return {
          'c-input--focus': this.isFocus && !this.readonly,
          'c-input--readonly': this.readonly,
          'c-input--disabled': this.disabled
        }
      }
    },
    methods: {
      focusHandler (e) {
        this.isFocus = true
        this.$emit('focus', e)
      },
      blurHandler (e) {
        this.isFocus = false
        this.$emit('blur', e)
      },
      focus () {
        const input = (this.$el.getElementsByTagName('input') || this.$el.getElementsByTagName('textarea'))[0]
        input.focus()
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-input {
        position: relative;
        display: inline-table;
        vertical-align: middle;
        background-color: $input-bg-color;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        width: 100%;
        .c-input__prepend,
        .c-input__append {
            display: table-cell;
            vertical-align: middle;
            width: 1px;
            background-color: $input-append-bg-color;
            color: $input-append-color;
            position: relative;
            white-space: nowrap;
            padding: 0 0.5em;
            border: 1px solid $input-border-color;
        }
        .c-input__prepend {
            border-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        .c-input__append {
            border-left: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0
        }
        .c-input__wrapper {
            position: relative;
            box-sizing: border-box;
            display: table-cell;
            vertical-align: middle;
            border: 1px solid $border-color;
            transition: border-color 0.2s ease-in-out;
            .c-input__input,
            .c-input__textarea {
                position: relative;
                width: 100%;
                box-sizing: border-box;
                appearance: none;
                outline: 0;
                background-color: transparent;
                margin: 0;
                border: none;
            }
            .c-input__input {
                height: 2em;
                padding: 0 0.5em;
            }
            .c-input__textarea {
                resize: none;
                padding: 0.5em;
                transition: height 0.2s ease;
            }
            .c-input__close {
                position: absolute;
                display: none;
                cursor: pointer;
                padding: 0 0.25em;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                color: $input-border-color;
                &:hover {
                    color: $input-border-color--hover
                }
            }

            &:hover {
                border-color: $input-border-color--hover;
                .c-input__close {
                    display: inline-block;
                }
            }
        }
        > *:first-child {
            border-top-left-radius: $border-radius--small;
            border-bottom-left-radius: $border-radius--small;
        }
        > *:last-child {
            border-top-right-radius: $border-radius--small;
            border-bottom-right-radius: $border-radius--small;
        }

    }

    .c-input--focus {
        .c-input__wrapper {
            border-color: $input-border-color--active !important;
            .c-input__close {
                display: inline-block;
            }
        }
    }

    .c-input--disabled,
    .c-input--readonly {
        .c-input__wrapper {
            &:hover {
                border-color: $input-border-color;
            }
        }
    }

    .c-input--disabled {
        color: $input-color--disabled;
        background-color: $input-bg-color--disabled;
        .c-input__wrapper {
            .c-input__input {
                cursor: not-allowed;
            }
        }
    }

</style>

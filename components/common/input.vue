<template lang="pug">
    .c-input(:class="classes")
        template(v-if="type==='textarea'")
            textarea.c-input__textarea(@focus="focus",:style="{minHeight:minHeight +'px',overflow:'hidden'}",@blur="blur",v-if="autoSize",v-autoheight="autoSize",v-model="content",:placeholder="placeholder",:readonly="readonly")
            textarea.c-input__textarea(@focus="focus",:style="{minHeight:minHeight +'px'}",@blur="blur",v-else,v-model="content",:placeholder="placeholder",:readonly="readonly")
        template(v-else)
            span.c-input__prepend(v-if="$slots.prepend")
                slot(name="prepend")
            .c-input__wrapper
                input.c-input__input(@focus="focus",@blur="blur",:type="type",:readonly="readonly",v-model="content",:placeholder="placeholder")
                span.c-input__close(@click="content=''",v-if="clearable && content")
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
        isActive: false,
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
          'c-input--readonly': this.readonly,
          'c-input--focus': this.isFocus,
          'c-input--active': this.isActive
        }
      }
    },
    methods: {
      focus () {
        this.isFocus = true
      },
      blur () {
        this.isFocus = false
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-input {
        position: relative;
        display: inline-table;
        align-items: center;
        flex-direction: row;
        background-color: $input-bg;
        border-collapse: separate;
        width: 100%;
        .c-input__prepend,
        .c-input__append {
            display: table-cell;
            vertical-align: middle;
            background-color: $input-append-bg;
            color: $input-append-color;
            position: relative;
            white-space: nowrap;
            width: 1px;
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
            border: 1px solid $border-color-base;
            transition: border-color 0.2s ease-in-out;
            width: 100%;
            .c-input__input {
                width: 100%;
                box-sizing: border-box;
                appearance: none;
                height: 2em;
                outline: 0;
                background-color: transparent;
                padding: 0 0.5em;
                border: none;
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
                    color: $input-border-color-hover
                }
            }
            &:hover {
                border-color: $input-border-color-hover;
                .c-input__close {
                    display: inline-block;
                }
            }
        }
        > *:first-child {
            border-top-left-radius: $border-radius-small;
            border-bottom-left-radius: $border-radius-small;
        }
        > *:last-child {
            border-top-right-radius: $border-radius-small;
            border-bottom-right-radius: $border-radius-small;
        }

        .c-input__textarea {
            border: 1px solid $input-border-color;
            outline: none;
            box-sizing: border-box;
            width: 100%;
            resize: none;
            transition: border-color 0.2s ease-in-out,height 0.2s ease;
            padding: 0.5em;
            &:hover {
                border-color: $input-border-color-hover;
            }
        }
    }

    .c-input--focus {
        .c-input__textarea,
        .c-input__wrapper {
            border-color: $input-border-color-active !important;
            .c-input__close {
                display: inline-block;
            }
        }
    }

</style>

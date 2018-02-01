<template lang="pug">
    span.c-checkbox(:class="classes")
        span.c-checkbox__inner
        input.c-checkbox__input(@focus="focusHandler",@blur="blurHandler",v-if="isGroup",:disabled="disabled",type="checkbox",:value="value",v-model="cCheckboxGroup.val")
        input.c-checkbox__input(@focus="focusHandler",@blur="blurHandler",v-else,:disabled="disabled",type="checkbox",:true-value="trueValue",:false-value="falseValue",v-model="val")
        span.c-checkbox__label
            slot
                span {{label}}
</template>
<script>
  export default {
    name: 'c-checkbox',
    inject: {
      cCheckboxGroup: {
        default: null
      }
    },
    props: {
      trueValue: {
        default: true
      },
      falseValue: {
        default: false
      },
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      label: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        val: this.value,
        isFocus: false
      }
    },
    computed: {
      isGroup () {
        return this.cCheckboxGroup !== null
      },
      classes () {
        return {
          'c-checkbox--checked': this.isChecked,
          'c-checkbox--disabled': this.disabled,
          'c-checkbox--focused': this.isFocus && !this.disabled
        }
      },
      isChecked () {
        if (this.isGroup) {
          return this.cCheckboxGroup.val.includes(this.value)
        }
        return this.val === this.trueValue
      }
    },
    watch: {
      val (value) {
        if (!this.cCheckboxGroup) {
          this.$emit('input', value)
        }
      },
      value (val) {
        this.val = val
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
      }
    }
  }
</script>
<style lang="scss">
    @import "~assets/scss/variables";

    .c-checkbox {
        position: relative;
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
        .c-checkbox__inner {
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            position: relative;
            top: 0;
            left: 0;
            border: 1px solid $checkbox-border-color;
            border-radius: $border-radius--small;
            background-color: $checkbox-bg-color;
            transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            &:after {
                content: '';
                display: table;
                width: 0.4em;
                height: 0.8em;
                position: absolute;
                top: 0.15em;
                left: 0.4em;
                box-sizing: border-box;
                border: 0.15em solid $checkbox-bg-color;
                border-top: 0;
                border-left: 0;
                transform: rotate(45deg) scale(0);
                transition: all 0.2s ease-in-out;
            }
        }
        .c-checkbox__input {
            position: absolute;
            cursor: pointer;
            right: 0;
            bottom: 0;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 1;
        }
        .c-checkbox__label {
            margin-left: 0.5em;
        }
        &:not(.c-checkbox--disabled ) {
            &:hover {
                .c-checkbox__inner {
                    border-color: $checkbox-border-color--hover;
                }
            }
        }
    }

    .c-checkbox--checked {
        .c-checkbox__inner {
            background-color: $checkbox-bg-color--checked;
            &:after {
                transform: rotate(45deg) scale(1);
            }
        }
    }

    .c-checkbox--focused {
        .c-checkbox__inner {
            border-color: $checkbox-border-color--focus;
        }
    }

    .c-checkbox--disabled {
        .c-checkbox__inner {
            background-color: $checkbox-bg-color--disabled;
            &:after {
                animation-name: none;
            }
        }
        .c-checkbox__input {
            cursor: not-allowed;
        }
        .c-checkbox__label {
            color: $checkbox-color--disabled;
        }
    }
</style>

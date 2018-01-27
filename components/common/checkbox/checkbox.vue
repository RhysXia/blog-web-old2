<template lang="pug">
    span.c-checkbox(:class="classes",@click="click")
        span.c-checkbox__inner
        input.c-checkbox__input(type="checkbox",:value="isChecked")
        span.c-checkbox__label
            slot
                span {{label}}
</template>
<script>
  export default {
    name: 'c-checkbox',
    props: {
      // 单独使用时只能传boolean值
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
        parent: null
      }
    },
    computed: {
      isChecked () {
        if (this.parent) {
          return this.parent.val.includes(this.val)
        }
        if (typeof this.val === 'boolean') {
          return this.val
        }
        return false
      },
      classes () {
        return {
          'c-checkbox--checked': this.isChecked,
          'c-checkbox--disabled': this.disabled
        }
      }
    },
    watch: {
      val (value) {
        this.$emit('input', value)
      },
      value (val) {
        this.val = val
      }
    },
    methods: {
      click () {
        if (this.disabled) {
          return
        }
        if (!this.parent) {
          this.val = !this.isChecked
          return
        }
        if (this.isChecked) {
          this.parent.val = this.parent.val.filter(it => {
            return it !== this.val
          })
        } else {
          this.parent.val.push(this.val)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-checkbox {
        position: relative;
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
        cursor: pointer;
        .c-checkbox__inner {
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            position: relative;
            top: 0;
            left: 0;
            border: 1px solid $border-color-base;
            border-radius: $border-radius-small;
            background-color: $checkbox-bg;
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
                border: 0.15em solid $checkbox-bg;
                border-top: 0;
                border-left: 0;
                transform: rotate(45deg) scale(0);
                transition: all 0.2s ease-in-out;
            }
        }
        .c-checkbox__input {
            position: absolute;
            width: 0;
            height: 0;
            top: 0;
            left: 0;
        }
        .c-checkbox__label {
            margin-left: 0.5em;
        }
    }

    .c-checkbox--checked {
        .c-checkbox__inner {
            border-color: $checkbox-bg;
            background-color: $checkbox-checked;
            &:after {
                transform: rotate(45deg) scale(1);
            }
        }
    }

    .c-checkbox--disabled {
        cursor: not-allowed;
        .c-checkbox__inner {
            background-color: $checkbox-disabled;
            border-color: $border-color-base;
            &:after {
                animation-name: none;
            }
        }
        .c-checkbox__label {
            color: $checkbox-disabled;
        }
    }
</style>

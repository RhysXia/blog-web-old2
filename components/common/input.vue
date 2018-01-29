<template lang="pug">
    .c-input
        textarea(v-if="type=='textarea'",v-model="content",:placeholder="placeholder",:readonly="readonly")
        input.c-input__input(v-else,ref="input",:type="type",:readonly="readonly",v-model="content",:placeholder="placeholder")
        slot(name="append")
</template>
<script>

  export default {
    name: 'c-input',
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
        active: false
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
    methods: {
      focus () {
        this.$refs.input.focus()
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-input {
        display: flex;
        flex-direction: row;
        align-items: center;
        .c-input__input {
            box-sizing: border-box;
            border: 1px solid $color-border-base;
            border-radius: 0.2em;
            background-color: $color-background;
            transition: border-color 0.4s ease;
            padding: 0.3em 0.6em;
            display: flex;
            flex: auto;
            outline: none;
            font-size: inherit;
            &:not([readonly]):focus {
                border-color: $color-primary;

            }
        }
    }

</style>

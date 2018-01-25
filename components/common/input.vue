<template lang="pug">
    .c-input
        input.c-input__input(ref="input",v-if="type==='password'",:readonly="readonly",v-model="content",type="password",:placeholder="placeholder")
        input.c-input__input(ref="input",v-else,v-model="content",:readonly="readonly",type = "text",:placeholder="placeholder")
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
        type: String,
        default: 'text'
      },
      readonly: {
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

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-input{
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

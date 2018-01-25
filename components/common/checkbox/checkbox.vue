<template lang="pug">
    .c-checkbox(:class="{'c-checkbox--checked':value}")
        span.c-checkbox__wrapper
            input.c-checkbox__input(type="checkbox",v-model="val")
        span.c-checkbox__label(@click="val=!val") {{label}}
</template>
<script>
  export default {
    name: 'c-checkbox',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        val: this.value
      }
    },
    watch: {
      val (value) {
        this.$emit('input', value)
      },
      value (val) {
        this.val = val
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-checkbox {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        .c-checkbox__wrapper {
            height: 1em;
            margin-right: 0.5em;
            .c-checkbox__input {
                outline: none;
                border: none;
                height: 1em;
                width: 1em;
            }
        }

        .c-checkbox__label {
        }
    }
    .c-checkbox--checked {
        color: $color-primary;
        .checkbox {
        }
    }
</style>

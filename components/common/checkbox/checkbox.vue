<template lang="pug">
    .c-checkbox-container(:class="{'is-checked':value}")
        span.checkbox
            input.checkbox-input(type="checkbox",v-model="val")
        span.label(@click="val=!val") {{label}}
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

    .c-checkbox-container {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        .checkbox {
            height: 1em;
            margin-right: 0.5em;
            .checkbox-input {
                outline: none;
                border: none;
                height: 1em;
                width: 1em;
            }
        }
        &.is-checked {
            color: $color-primary;
            .checkbox {
            }
        }
        .label {
        }
    }
</style>
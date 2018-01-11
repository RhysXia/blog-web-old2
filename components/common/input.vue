<template lang="pug">
    .c-input-container(:class="containerClass",@click="click",v-clickoutside="outClick")
        input.input(ref="input",v-if="type==='password'",:readonly="readonly",v-model="content",type="password",:placeholder="placeholder")
        input.input(ref="input",v-else,v-model="content",:readonly="readonly",type = "text",:placeholder="placeholder")
        slot(name="append")
</template>
<script>
  import clickoutside from '~/utils/directive/clickoutside'

  export default {
    name: 'c-input',
    directives: {
      clickoutside
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
        active: false,
        outClickDisabled: false
      }
    },
    computed: {
      containerClass () {
        return {
          'c-input-container-active': this.active
        }
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
      outClick () {
        if (!this.outClickDisabled) {
          this.active = false
        }
      },
      focus () {
        this.$refs.input.focus()
        this.outClickDisabled = true
        this.active = true
        // outClick响应比较慢
        setTimeout(() => {
          this.outClickDisabled = false
        }, 500)
      },
      click () {
        if (!this.readonly) {
          this.active = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-input-container {
        box-sizing: border-box;
        border: 1px solid $color-border-base;
        border-radius: 0.2em;
        background-color: $color-background;
        transition: border-color 0.4s ease;
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow: hidden;
        position: relative;
        .input {
            height: 100%;
            margin: 0.25em 0.5em;
            display: flex;
            flex: 1 1 auto;
            border: none;
            outline: none;
            background-color: transparent;
            font-size: inherit;
        }
    }

    .c-input-container-active {
        border-color: $color-primary;
    }
</style>
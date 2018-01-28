<template lang="pug">
    li.c-dropdown__item(@click="click",:class="disabled?'c-dropdown__item--disabled':''")
        slot
</template>

<script>
  import { findComponentUpward } from '~/utils/utils'

  export default {
    name: 'c-dropdown-item',
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        parent: null
      }
    },
    methods: {
      click () {
        if (this.disabled) {
          return
        }
        this.$emit('click')
        if (this.parent) {
          this.parent.visible = false
        }
      }
    },
    created () {
      this.parent = findComponentUpward(this, 'c-dropdown')
    },
    beforeUpdate () {
      this.parent = findComponentUpward(this, 'c-dropdown')
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-dropdown__item {
        white-space: nowrap;
        padding: 0.5em 1em;
        cursor: pointer;
        margin: 0;
        &:hover{
            background-color: $dropdown-hover-bg;
            color: $dropdown-hover-color;
        }
    }

    .c-dropdown__item--disabled {
        color: $dropdown-disabled-color;
        cursor: default;
    }
</style>

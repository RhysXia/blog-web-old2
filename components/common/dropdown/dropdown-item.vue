<template lang="pug">
    li.c-dropdown__item(@click="click",:class="disabled?'c-dropdown__item--disabled':''")
        slot
</template>

<script>

  export default {
    name: 'c-dropdown-item',
    inject: ['cDropdown'],
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      click () {
        if (this.disabled) {
          return
        }
        if (this.cDropdown.closeOnClick) {
          this.cDropdown.visible = false
        }
        this.$emit('click')
      }
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
        &:hover {
            background-color: $dropdown-bg-color--hover;
            color: $dropdown-color--hover;
        }
    }

    .c-dropdown__item--disabled {
        color: $dropdown-color--disabled;
        cursor: not-allowed;
        &:hover{
            color: $dropdown-color--disabled;
            background-color: $dropdown-bg-color;
        }
    }
</style>

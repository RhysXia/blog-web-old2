<template lang="pug">
    span.c-button-group(:class="classes")
        slot
</template>

<script>
  export default {
    name: 'c-button-group',
    props: {
      vertical: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        if (this.vertical) {
          return 'c-button-group--vertical'
        }
        return 'c-button-group--horizontal'
      }
    }
  }
</script>

<style lang="scss">
    .c-button-group {
        display: inline-block;
    }
    .c-button-group--horizontal{
        .c-button:not(:first-child) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: none;
        }
        .c-button:not(:last-child) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: none;
        }
    }

    .c-button-group--vertical{
        .c-button{
            display: block;
        }
        .c-button:not(:first-child) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: none;
        }
        .c-button:not(:last-child) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: none;
        }
    }
</style>

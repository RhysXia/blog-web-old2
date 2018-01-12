<template lang="pug">
    .c-panel-container
        slot(name="title")
            h4.title {{title}}
        slot
</template>

<script>
  export default {
    name: 'c-panel',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-panel-container {
        background-color: $color-background;
        padding: 0.5em;
        .title {
            padding-bottom: 0.5em;
            border-bottom: 1px solid $color-border-base;
            margin: 0;
        }
    }
</style>

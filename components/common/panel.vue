<template lang="pug">
    .c-panel
        .c-panel__header
            slot(name="header")
                h4.c-panel__header--title {{title}}
        .c-panel__body
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

<style lang="scss">
    @import "~assets/scss/variables";

    .c-panel {
        background-color: $panel-bg-color;
        padding: 0.5em;
        .c-panel__header{
            .c-panel__header--title{
                padding-bottom: 0.5em;
                border-bottom: 1px solid $border-color;
                margin: 0;
            }
        }
        .c-panel__body{
            margin-top: 0.5em;
        }
    }
</style>

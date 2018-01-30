<template lang="pug">
    .c-panel(:class="classes")
        .c-panel__header(v-if="$slots.header || title")
            slot(name="header")
                h1.c-panel__header--title {{title}}
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
      },
      hoverShadow: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      classes () {
        return {
          'c-panel--shadow-hover': this.hoverShadow
        }
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-panel {
        background-color: $panel-bg-color;
        border: 1px solid $border-color;
        box-sizing: border-box;
        border-radius: $border-radius;
        .c-panel__header {
            padding: 1em;
            border-bottom: 1px solid $border-color;
            .c-panel__header--title {
                margin: 0;
                padding: 0;
                font-size: 1.1em;
                font-weight: bold;
            }
        }
        .c-panel__body {
            padding: 1em;
        }
    }

    .c-panel--shadow-hover{
        transition: box-shadow 0.4s ease-in-out;
        &:hover{
            box-shadow: $panel-box-shadow--hover;
        }
    }
</style>

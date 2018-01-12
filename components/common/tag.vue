<template lang="pug">
    .c-tag-container(:class="classes")
        span {{name}}
        span.close(v-if="closeable",@click="$emit('close')")
            i.fa.fa-close
</template>

<script>
  export default {
    name: 'c-tag',
    props: {
      name: {
        type: String,
        default: ''
      },
      // primary error
      type: {
        type: String,
        default: 'default'
      },
      closeable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        if (this.type === 'primary') {
          return [
            'c-tag-primary'
          ]
        }
        return []
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-tag-container {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        border: 1px solid $color-border-base;
        padding: 0.1em 0.5em;
        border-radius: 0.2em;
        .close {
            margin-left: 0.5em;
            transition: color 0.4s ease-in-out;
        }
    }

    .c-tag-primary {
        border-color: $color-primary-light;
        color: $color-primary;
        &:hover {
            .close {
                color: $color-primary-active;
            }
        }
    }
</style>
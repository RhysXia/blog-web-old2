<template lang="pug">
    .c-tag(:class="classes")
        span {{name}}
        span.c-tag__close(v-if="closeable",@click="$emit('close')")
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
            'c-tag--primary'
          ]
        }
        return []
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-tag {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        border: 1px solid $border-color;
        padding: 0.1em 0.5em;
        border-radius: 0.2em;
        .c-tag__close {
            margin-left: 0.5em;
            transition: color 0.4s ease-in-out;
        }
    }

    .c-tag--primary {
        border-color: $tag-border-color--primary;
        color: $tag-color--primary;
        &:hover {
            .close {
                color: $tag-color--primary;
            }
        }
    }
</style>

<template lang="pug">
    span.c-tag(:class="classes")
        slot {{name}}
        i.c-tag__close.fa.fa-close(v-if="closeable",@click="$emit('close')")
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
        default: 'info',
        validator (val) {
          return ['primary', 'success', 'warning', 'danger', 'info'].includes(val)
        }
      },
      closeable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [`c-tag--${this.type}`]
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-tag {
        display: inline-block;
        height: 1.8em;
        line-height: 1.8em;
        vertical-align: middle;
        padding: 0 0.4em;
        border: 1px solid;
        box-sizing: border-box;
        white-space: nowrap;
        border-radius: $border-radius--small;
        .c-tag__close {
            position: relative;
            right: -0.3em;
            border-radius: 50%;
            height: 1.1em;
            width: 1.1em;
            line-height: 1.1em;
            text-align: center;
            cursor: pointer;
        }
    }

    .c-tag--info {
        color: $tag-color--info;
        background-color: $tag-bg-color--info;
        border-color: $tag-border-color--info;
        .c-tag__close:hover {
            color: $tag-bg-color;
            background-color: $tag-color--info;
        }
    }

    .c-tag--success {
        color: $tag-color--success;
        background-color: $tag-bg-color--success;
        border-color: $tag-border-color--success;
        .c-tag__close:hover {
            color: $tag-bg-color;
            background-color: $tag-color--success;
        }
    }

    .c-tag--primary {
        color: $tag-color--primary;
        background-color: $tag-bg-color--primary;
        border-color: $tag-border-color--primary;
        .c-tag__close:hover {
            color: $tag-bg-color;
            background-color: $tag-color--primary;
        }
    }

    .c-tag--warning {
        color: $tag-color--warning;
        background-color: $tag-bg-color--warning;
        border-color: $tag-border-color--warning;
        .c-tag__close:hover {
            color: $tag-bg-color;
            background-color: $tag-color--warning;
        }
    }

    .c-tag--error {
        color: $tag-color--error;
        background-color: $tag-bg-color--error;
        border-color: $tag-border-color--error;
        .c-tag__close:hover {
            color: $tag-bg-color;
            background-color: $tag-color--error;
        }
    }

</style>

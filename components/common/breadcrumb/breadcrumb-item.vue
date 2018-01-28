<template lang="pug">
    span.c-breadcrumb__item
        router-link.c-breadcrumb__item--link(v-if="to",:to="to")
            slot
        span.c-breadcrumb__item--link(v-else)
            slot
        span.c-breadcrumb__item--separator(v-if="$slots.separator")
            slot(name="separator")
        span.c-breadcrumb__item--separator(v-else-if="separator") {{separator}}
</template>

<script>

  export default {
    name: 'c-breadcrumb-item',
    props: {
      to: {
        type: [Object, String]
      }
    },
    data () {
      return {
        separator: ''
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-breadcrumb__item {
        .c-breadcrumb__item--link {
            text-decoration: none;
            color: $breadcrumb-color;
            transition: color 0.2s ease-in-out;
            cursor: pointer;
            &:hover {
                color: $breadcrumb-hover;
            }
        }
        .c-breadcrumb__item--separator{
            margin: 0 0.5em;
            color: $breadcrumb-separator-color;
        }
    }
</style>

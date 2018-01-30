<template lang="pug">
    .c-breadcrumb
        slot
</template>

<script>

  export default {
    name: 'c-breadcrumb',
    props: {
      separator: {
        type: String,
        default: '/'
      }
    },
    provide () {
      return {
        cBreadcrumb: this
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-breadcrumb {
        .c-breadcrumb__item:last-child {
            .c-breadcrumb__item--separator {
                display: none;
            }
        }
    }

</style>

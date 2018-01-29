<template lang="pug">
    ul.c-dropdown__menu
        slot
</template>

<script>

  export default {
    name: 'c-dropdown-menu'
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-dropdown__menu {
        background-color: $dropdown-bg;
        list-style: none;
        margin: 0;
        padding: 0;
    }
</style>

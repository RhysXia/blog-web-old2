<template lang="pug">
    ul.c-dropdown__menu
        slot
</template>

<script>

  export default {
    name: 'c-dropdown-menu'
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-dropdown__menu {
        background-color: $dropdown-bg;
    }
</style>

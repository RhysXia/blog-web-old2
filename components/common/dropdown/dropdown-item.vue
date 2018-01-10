<template lang="pug">
    li.c-dropdown-item-container
        slot
</template>

<script>
  export default {
    name: 'c-dropdown-item'
  }
</script>

<style lang="scss" scoped>
    .c-dropdown-item-container {
        word-break: keep-all;
    }
</style>

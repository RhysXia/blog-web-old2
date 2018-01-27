<template lang="pug">
    li.c-dropdown__item
        slot
</template>

<script>
  export default {
    name: 'c-dropdown-item'
  }
</script>

<style lang="scss" scoped>
    .c-dropdown__item {
        white-space: nowrap;
    }
</style>

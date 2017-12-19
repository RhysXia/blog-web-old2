<template lang="pug">
    .c-dropdown-item-container
        slot
</template>

<script>
  export default {
    name: 'dropdown-item'
  }
</script>

<style lang="scss" scoped>
    .c-dropdown-item-container{
        word-break: keep-all;
        margin-bottom: 0.5rem;
        &:last-child{
            margin-bottom: 0;
        }
    }
</style>

<template>

</template>

<script>
  export default {
    name: 'setting',
    validate ({store}) {
      return store.getters.isLogin
    }
  }
</script>

<style scoped>

</style>

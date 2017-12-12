<template lang="pug">
    .layout
        c-header
        nuxt
        c-footer
</template>

<script>
  import CHeader from '~/components/layout/header'
  import CFooter from '~/components/layout/footer'

  export default {
    components: {
      CHeader,
      CFooter
    }
  }
</script>

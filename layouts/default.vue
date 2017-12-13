<template lang="pug">
    .layout
        c-header
        c-row(type="flex",align="top",justify="center")
            c-col(:span="20")
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

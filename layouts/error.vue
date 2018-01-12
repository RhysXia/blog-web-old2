<template lang="pug">
    .error-container
        component(:is="component",:error="error")
</template>
<script>
  export default {
    name: 'nuxt-error',
    props: ['error'],
    head () {
      return {
        title: this.error.message || 'An error occured'
      }
    },
    data () {
      return {
        errorPages: [
          404
        ]
      }
    },
    computed: {
      code () {
        return this.error.statusCode
      },
      component () {
        if (this.errorPages.includes(this.code)) {
          return () => import(`~/components/error/${this.code}`)
        } else {
          return () => import('~/components/error/common')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .error-container {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: $color-white;
        z-index: $z-index-max;
    }
</style>

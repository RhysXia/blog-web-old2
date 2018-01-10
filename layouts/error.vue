<template lang="pug">
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
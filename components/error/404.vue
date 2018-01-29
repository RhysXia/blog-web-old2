<template lang="pug">
    .error-wrapper
        h1.error-code {{ error.statusCode }}
        .error-wrapper-message
            h2.error-message {{ error.message }}
        nuxt-link.error-link(to="/") 返回首页

</template>
<script>
  export default {
    props: ['error'],
    head () {
      return {
        title: this.error.message || 'An error occured'
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/application";


    .error-wrapper {
        position: absolute;
        display: inline-block;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -70%);
        text-align: center;
        .error-code {
            font-size: 5rem;
            border-bottom: 1px solid $color-border-base;
            margin: 0;
        }
        .error-wrapper-message {
            .error-message {
                font-size: 2rem;
            }
        }
    }

</style>
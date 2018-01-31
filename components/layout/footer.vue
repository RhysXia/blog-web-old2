<template lang="pug">
    .c-footer-container
        span &copy;Rhys Xia 2017. All rights reserved. 皖ICP备17009214号

</template>
<script>
  export default {
    name: 'c-footer'
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/application";


    .c-footer-container {
        background-color: $bg-color;
        height: $footer-height;
        line-height: $footer-height;
        text-align: center;
    }
</style>

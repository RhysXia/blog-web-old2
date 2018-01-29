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


    $height-footer: 55px;
    .c-footer-container {
        background-color: $color-background;
        height: $height-footer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

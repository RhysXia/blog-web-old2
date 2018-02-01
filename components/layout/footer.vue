<template lang="pug">
    footer.c-footer
        span &copy;Rhys Xia 2017. All rights reserved. 皖ICP备17009214号

</template>
<script>
  export default {
    name: 'c-footer'
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/application";

    .c-footer {
        background-color: $bg-color;
        height: $footer-height;
        line-height: $footer-height;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        clear: both;
        margin: 0;

    }
</style>

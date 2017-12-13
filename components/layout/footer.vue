<template lang="pug">
    c-row.c-footer-container(type="flex",align="middle",justify="center")
        c-col
            span &copy;Ryths Xia 2017. All rights reserved. 皖ICP备17009214号

</template>
<script>
  export default {
    name: 'footer'
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    $height-footer: 55px;
    .c-footer-container {
        background-color: $color-background;
        height: $height-footer;
    }
</style>

<template lang="pug">
    footer.footer-container
        .footer-content
            p.info ©2017 Ryths Xia  皖ICP备17009214号

</template>
<style lang="stylus" scoped>
    @import "~assets/stylus/variables.styl"

    .footer-container
        background-color $bg-color
        width 100%
        .footer-content
            width $width
            height 50px
            margin 0 auto
            p
                margin 0
                text-align center
                line-height 50px
                font-size 14px
</style>

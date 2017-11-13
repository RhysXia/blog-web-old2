<template lang="pug">
    div.container(:style="{height:height+'px'}")
        r-header
        .middle
            .left xx

            .main(v-bar)
                nuxt
            .right xx
        r-footer
</template>

<script>
  import RHeader from '~/components/header'
  import RFooter from '~/components/footer'

  export default {
    components: {
      RHeader,
      RFooter
    },
    data () {
      return {
        height: 0
      }
    },
    mounted () {
      // 设置高度，使滚动条生效
      this.height = window.document.body.offsetHeight
      window.onresize = e => {
        this.height = window.document.body.offsetHeight
      }
    }
  }
</script>
<style lang="stylus" scoped>
    .container
        display flex
        flex-direction column
        .middle
            display flex
            flex-direction row
            height 100%
            .main
                height 100%
</style>
<style>
    .vb > .vb-dragger {
        z-index: 5;
        width: 12px;
        right: 0;
    }

    .vb > .vb-dragger > .vb-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0, 0, 0, 0);
        transform: rotate3d(0, 0, 0, 0);
        -webkit-transition: background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
        transition: background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
        background-color: rgba(48, 121, 244, .1);
        margin: 5px 5px 5px 0;
        border-radius: 20px;
        height: calc(100% - 10px);
        display: block;
    }

    .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(48, 121, 244, .3);
    }

    .vb > .vb-dragger:hover > .vb-dragger-styler {
        background-color: rgba(48, 121, 244, .5);
        margin: 0px;
        height: 100%;
    }

    .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(48, 121, 244, .5);
        margin: 0px;
        height: 100%;
    }

    .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(48, 121, 244, .5);
    }
</style>

<template lang="pug">
    div.layout(:style="{height:height+'px'}")
        r-header
        .middle
            ul.left
                li
                    nuxt-link(to="/")
                        i.fa.fa-home
                        | 首页
                li
                    nuxt-link(to="/tags")
                        i.fa.fa-tag
                        | 分类
                li
                    nuxt-link(to="/about")
                        i.fa.fa-user
                        | 关于
            .main(v-bar)
                nuxt
            .right
                .search-wrapper
                    .search
                        input(placeholder="搜索")
                        i.fa.fa-search
                .article-wrapper
                    h3.title
                        i.fa.fa-book
                        | 热门文章
                    ul.list
                        li.item(v-for="(article,index) in hotArticles",:key="index")
                            nuxt-link(:to="'/articles/'+article.id")
                                span.index {{index+1}}
                                | {{article.title}}


        r-footer
</template>

<script>
  import RHeader from '~/components/header'
  import RFooter from '~/components/footer'
  import NuxtLink from '../.nuxt/components/nuxt-link'

  export default {
    components: {
      NuxtLink,
      RHeader,
      RFooter
    },
    data () {
      return {
        height: 0
      }
    },
    computed: {
      hotArticles () {
        return this.$store.state.article.hotArticles
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
    .layout
        display flex
        flex-direction column
        .middle
            margin-top 15px
            display flex
            flex-direction row
            height 100%
            justify-content center
            align-self center
            > *
                margin-right 10px
            &:last-child
                margin-right 0
            .left
                width 150px
                list-style none
                padding 0
                margin-left 0
                li
                    a
                        color inherit
                        display block
                        line-height 40px
                        background-color transparent
                        text-decoration none
                        text-align center
                        border-radius 5px
                        font-size 16px
                        font-weight bold
                    a.nuxt-link-active
                        color #41B883
                        background-color #fff
            .main
                height 100%
                width 500px
            .right
                width 230px
                & > *
                    margin-bottom 10px
                &:last-child
                    margin-bottom 0
                .search-wrapper
                    padding 4px
                    background-color #fff
                    .search
                        height 30px
                        width 100%
                        background-color #eee
                        position relative
                        input
                            font-size 14px
                            display block
                            background-color transparent
                            height inherit
                            outline none
                            border none
                            width calc(100% -30px)
                        i
                            position absolute
                            right 0
                            top 0
                            width 30px
                            height inherit
                            text-align center
                            line-height 30px
                            color #41B883
                            background-color #ddd
                            cursor pointer

                .article-wrapper
                    background-color #fff
                    padding 8px
                    .title
                        font-size 14px
                        margin 0
                        padding 10px 0
                        border-bottom 1px #eee solid
                    .list
                        list-style none
                        padding 0
                        margin-left 0
                        .item
                            a
                                display block
                                padding 5px 0
                                text-decoration none
                                color inherit
                                white-space nowrap
                                text-overflow ellipsis
                                &:hover
                                    color #41B883
                                .index
                                    display inline-block
                                    background-color #eeeeee
                                    width 20px
                                    text-align center
                                    margin-right 10px
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

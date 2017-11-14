<template lang="pug">
    .article
        .header
            h1.title {{article.title}}
            .info
                nuxt-link.user(:to="'/users/'+article.author.id")
                    i.fa.fa-user
                    | {{article.author.nickname}}
                .tags
                    nuxt-link.tag(v-for="(tag,index) in article.tags",:key="index",:to="'/tags/'+tag.id")
                        i.fa.fa-tag
                        | {{tag.name}}
                .createDate
                    i.fa.fa-clock-o
                    | {{article.createDate | formatDate}}

        .content-wrapper
            .poster-wrapper
                img.poster(:src="article.poster")
            .content(v-html="content")
        .footer
            .info
                .read
                    i.fa.fa-book
                    | {{article.readNum}}人阅读
                button.like
                    i.fa.fa-heart
                    | {{article.praiseNum}}人喜欢
</template>
<script>
  import marked from 'marked'
  import Hljs from 'highlight.js/lib/index'

  import 'highlight.js/styles/vs.css'

  marked.setOptions({
    highlight: (code) => {
      return Hljs.highlightAuto(code).value
    }
  })

  export default {
    props: {
      article: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    computed: {
      content () {
        if (this.article.contentType === 'MARKDOWN') {
          return marked(this.article.content)
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
    .article
        background #fff
        padding 20px
        border-radius 5px
        .header
            border-bottom 1px solid #000
            padding 10px 0
            .title
                text-align center
                font-size 20px
            .info
                display flex
                flex-direction row
                margin-top 10px
                > *
                    margin 0 5px
                    i
                        padding 0 5px
        .content-wrapper
            padding 10px 0
            .poster-wrapper
                padding 5px 10px
                background-color #ddd
                overflow hidden
                .poster
                    width 100%
                    height 200px
                    transition transform 0.5s
                    &:hover
                        transform scale(1.1) rotate(-5deg)


        .footer
            .info
                display flex
                flex-direction row
                >*
                    font-size 14px
                    margin-right 10px
                    padding 5px 10px
                    background-color #dbe1ec
                    &.like
                        color #41BEB4
                        border none
                        outline none
                        &:hover
                            background-color #7f828b
                            cursor pointer
                    >i
                        padding-right 5px
</style>
<style lang="stylus">
    /*显示滚动条，防止内容超出*/
    pre
        code[class^=lang-]
            display block
            overflow-x auto
            background-color #dbe1ec
            padding 10px

</style>

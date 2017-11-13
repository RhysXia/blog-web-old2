<template lang="pug">
    .panel
        .articles
            h3.title 热门文章
            ul.list
                li.item(v-for="(article,index) in articles",:key="index")
                    span.index {{index+1}}
                    nuxt-link(to="'/articles/'+article.id")
                        span.article-title {{article.title}}
</template>
<script>
  export default {
    props: {
      articles: {
        type: Array,
        default: () => {
          return []
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
.panel
    width 250px
    .articles
        background-color #fff
        padding 0 10px
        border-radius 5px
        .title
            font-size 14px
            padding 10px 0
            border-bottom 1px solid #eee
            margin 0
        .list
            .item
                padding 5px 0
                .index
                    display inline-block
                    background-color #ccc
                    width 20px
                    text-align center
                    margin-right 10px
                a
                    display inline-block
                    transition all 0.4s
                    &:hover
                        transform translateX(10px)
                        text-decoration underline
                a.nuxt-link-active
                    display block
                    transform translateX(10px)
                    text-decoration underline



</style>

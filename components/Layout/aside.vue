<template lang="pug">
    .aside-container
        .articles
            h3.title 热门文章
            ul.list
                li.item(v-for="(article,index) in articles",:key="index")
                    span.index {{index+1}}
                    nuxt-link(:to="'/articles/'+article.id")
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
    @import "~assets/stylus/variables.styl"

    .aside-container
        width $aside-width
        .articles
            background-color $bg-color
            padding 0 10px
            border-radius 5px
            .title
                font-size $font-size-m
                padding 10px 0
                border-bottom 1px solid $border-color
                margin 0
            .list
                .item
                    padding 5px 0
                    font-size $font-size-m
                    .index
                        display inline-block
                        background-color $bg-dark-active-color
                        width 20px
                        text-align center
                        margin-right 10px
                        line-height 20px
                    a
                        display inline-block
                        transition all 0.4s
                        &:hover
                            transform translateX(10px)
                            text-decoration underline
                    a.nuxt-link-exact-active
                        transform translateX(10px)
                        text-decoration underline


</style>

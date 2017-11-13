<template lang="pug">
    .container
        nuxt-link(:to="'/articles/'+article.id")
            img.poster(:src="article.poster")
        .pannel
            nuxt-link(:to="'/articles/'+article.id")
                .title {{article.title}}
            .summary {{article.summary}}
            .info
                .data
                    Icon(type="ios-clock")
                    span.label {{article.updateDate | formatDate}}
                .read
                    Icon(type="ios-book")
                    span.label {{article.readNum}}
                .praise
                    Icon(type="ios-heart")
                    span.label {{article.praiseNum}}
                .tag(v-if="article.tags != null")
                    Icon(type="ios-pricetag")
                    span.label(v-for="(tag,index) in article.tags",:key="index")
                        nuxt-link(:to="'tags/'+tag.id") {{tag.name}}

</template>

<script>
  import NuxtLink from '../.nuxt/components/nuxt-link'
  export default {
    props: {
      article: {
        type: Object
      }
    },
    components: {
      NuxtLink
    }
  }
</script>
<style lang="stylus" scoped>
    .container
        display flex
        flex-direction row
        background-color #FFF
        padding 0.5rem
        a
            color #000
            text-decoration none
        &:hover
            background-color #ddd
        .poster
            width 8rem
            height 8rem
            transition transform 0.4s
            &:hover
                transform scale(1.1)
        .pannel
            padding-left 1rem
            display flex
            flex-direction column
            .title
                font-weight bold
                transition transform 0.4s
                &:hover
                    text-decoration underline
                    transform translate(5px, 0)
            .summary
                margin auto 0
            .info
                display flex
                flex-direction row
                margin-bottom 0
                > *
                    padding-right 1rem
                .tag
                    text-decoration underline
                .label
                    padding-left 5px
</style>
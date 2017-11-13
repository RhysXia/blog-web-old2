<template lang="pug">
    .container
        nuxt-link(:to="'/articles/'+article.id")
            img.poster(:src="article.poster")
        .pannel
            nuxt-link(:to="'/articles/'+article.id")
                .title {{article.title}}
            .summary {{article.info}}
            .info
                .data
                    i.fa.fa-clock-o
                    span.label {{article.updateDate | formatDate}}
                .read
                    i.fa.fa-book
                    span.label {{article.readNum}}
                .praise
                    i.fa.fa-heart
                    span.label {{article.praiseNum}}
                .tag(v-if="article.tags != null")
                    i.fa.fa-tag
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
            color inherit
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
<template lang="pug">
    .c-aside-container
        c-panel(title="热门文章")
            .content
                p.article-item(v-for="(article,index) in articles",:key="index")
                    span.index {{index+1}}
                    nuxt-link(:to="'/article/'+article.id") {{article.title}}
        c-panel(title="热门标签")
            .content.tag-content
                nuxt-link.tag-item(:to="'/tag/'+tag.id",v-for="(tag,index) in tags",:key="index") {{tag.name}}
</template>
<script>
  import CPanel from '../common/panel'

  export default {
    name: 'aside',
    props: {
      articles: {
        type: Array,
        default: []
      },
      tags: {
        type: Array,
        default: []
      }
    },
    components: {
      CPanel
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-aside-container {
        >*{
            margin-bottom: 1rem;
        }
        &:last-child{
            margin-bottom: 0;
        }
        .content {
            &.tag-content{
              margin-right: -0.5rem;
            }
            .article-item {
                margin: 0.3rem 0;
                padding: 0;
                .index {
                    display: inline-block;
                    background-color: $color-background-dark;
                    width: 1.5rem;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    text-align: center;
                    margin-right: 0.8rem;
                }
            }
            .tag-item{
                display: inline-block;
                background-color: $color-background-dark;
                padding: 0.2rem 0.5rem;
                margin: 0 0.5rem 0.5rem 0;
            }
        }
    }
</style>

<template lang="pug">
    .index-container
        c-carousel(width="100%",height="200px")
            c-carousel-item(v-for="(article,index) in  hotArticles",:key="index")
                img.article-image(:src="article.poster")
</template>
<script>
  import CCarouselItem from '~/components/common/carousel-item'
  import CCarousel from '~/components/common/carousel'

  export default {
    data () {
      return {
        articles: []
      }
    },
    computed: {
      hotArticles () {
        return this.$store.state.hotArticles
      }
    },
    components: {
      CCarousel,
      CCarouselItem
    }
  }
</script>
<style lang="scss" scoped>
    .index-container {
        .article-image {
            width: 100%;
            height: 100%;
        }
    }
</style>

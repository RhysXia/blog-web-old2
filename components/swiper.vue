<template lang="pug">
    div(v-swiper:mySwiper="swiperOption")
        .swiper-wrapper
            .swiper-slide(v-for="(article,index) in articles",:key="index")
                nuxt-link.wrapper(:to="'/articles/'+article.id")
                    img.image(:src="article.poster")
                    span.title {{article.title}}
        .swiper-pagination.swiper-pagination-bullets
</template>
<script>
  import 'swiper/dist/css/swiper.css'

  export default {
    props: {
      articles: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        swiperOption: {
          autoplay: 5000,
          initialSlide: 1,
          loop: true,
          pagination: '.swiper-pagination',
          onSlideChangeEnd: swiper => {
            console.log('onSlideChangeEnd', swiper.realIndex)
          }
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
    .wrapper
        width 100%
        height 100%
        position relative
        display block
        .image
            width 100%
            height 100%
            transition transform 0.5s
            &:hover
                transform scale(1.1) rotate(5deg)
        .title
            position absolute
            display block
            top 10px
            right 10px
            padding 5px 10px
            background-color rgba(0,0,0,0.2)
</style>
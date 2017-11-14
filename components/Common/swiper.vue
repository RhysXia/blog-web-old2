<template lang="pug">
    div(v-swiper:mySwiper="swiperOption")
        .swiper-wrapper
            .swiper-slide(v-for="(item,index) in list",:key="index")
                slot(:item="item")
        .swiper-pagination.swiper-pagination-bullets
</template>
<script>
  import 'swiper/dist/css/swiper.css'

  export default {
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        swiperOption: {
          autoplay: 3000,
          initialSlide: 0,
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

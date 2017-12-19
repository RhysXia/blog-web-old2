<template lang="pug">
    .c-avatar-container(:style="styles")
        img.image(:src="imgUrl",v-if="imgUrl")
        .image.anon(v-else)
</template>

<script>
  export default {
    name: 'avatar',
    props: {
      imgUrl: {
        type: String,
        default: ''
      },
      width: {
        type: [String, Number],
        default: 50
      },
      height: {
        type: [String, Number],
        default: 50
      }
    },
    computed: {
      styles () {
        let width = this.width
        let height = this.height
        if (typeof width === 'number') {
          width = width + 'px'
        }
        if (typeof height === 'number') {
          height = height + 'px'
        }
        return {
          height,
          width
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .c-avatar-container {
        position: relative;
        .image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        .anon {
            background-image: url("./anon.png");
            background-size: cover;
        }
    }
</style>

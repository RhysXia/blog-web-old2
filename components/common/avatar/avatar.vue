<template lang="pug">
    .c-avatar-container(:style="styles")
        img.image(:src="imgUrl",v-if="imgUrl")
        .image.anon(v-else)
</template>

<script>
  export default {
    name: 'c-avatar',
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
      },
      // circle square
      type: {
        type: String,
        default: 'circle'
      }
    },
    computed: {
      styles () {
        let width = this.width
        let height = this.height
        const style = {}
        if (this.type === 'circle') {
          style.borderRadius = '50%'
        }
        if (typeof width === 'number') {
          width = width + 'px'
        }
        if (typeof height === 'number') {
          height = height + 'px'
        }
        style.width = width
        style.height = height
        return style
      }
    }
  }
</script>

<style lang="scss" scoped>
    .c-avatar-container {
        position: relative;
        overflow: hidden;
        .image {
            width: 100%;
            height: 100%;
        }
        .anon {
            background-image: url("./anon.png");
            background-size: cover;
        }
    }
</style>

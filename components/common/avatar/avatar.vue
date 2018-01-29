<template lang="pug">
    .c-avatar(:class="classes",:style="matchParent?{width:'100%',height:'100%'}:{}")
        img.c-avatar__image(:src="src",v-if="src")
        .c-avatar__image.c-avatar__image--anno(v-if="!isSlotShow")
        .c-avatar__content(ref="children",v-if="isSlotShow")
            slot
</template>

<script>
  export default {
    name: 'c-avatar',
    props: {
      // circle square
      shape: {
        type: String,
        default: 'circle'
      },
      // 图片url
      src: {
        type: String,
        default: ''
      },
      matchParent: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      isSlotShow () {
        return !this.src && !!this.$slots.default
      },
      classes () {
        if (this.shape === 'square') {
          return ['c-avatar--square']
        }
        return ['c-avatar--circle']
      }
    },
    methods: {
      updateSlotSize () {
        const children = this.$refs.children
        if (children) {
          const childrenWidth = children.scrollWidth
          const avatarWidth = this.$el.offsetWidth
          let scale = 1
          console.log(childrenWidth, avatarWidth)
          if (avatarWidth < childrenWidth) {
            scale = avatarWidth / childrenWidth
          }
          children.style.transform = `scale(${scale})`
          children.style['ms-transform'] = `scale(${scale})`
          children.style['webkit-transform'] = `scale(${scale})`
          children.style.position = 'absolute'
          children.style.transform = `scale(${scale})`
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.updateSlotSize()
      })
    },
    updated () {
      this.$nextTick(() => {
        this.updateSlotSize()
      })
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: $avatar-size;
        height: $avatar-size;
        overflow: hidden;
        white-space: nowrap;
        background-color: $avatar-bg;
        color: $avatar-color;
        .c-avatar__image {
            width: 100%;
            height: 100%;
        }
        .c-avatar__image--anno {
            background-image: url("./anon.png");
            background-size: cover;
        }
        .c-avatar__content {
        }
    }

    .c-avatar--square {
        border-radius: $border-radius-small;
    }

    .c-avatar--circle {
        border-radius: 50%;
    }
</style>

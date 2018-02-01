<template lang="pug">
    .c-avatar(:class="classes",:style="matchParent?{width:'100%',height:'100%'}:{}")
        img.c-avatar__image(:src="src",v-if="src")
        .c-avatar__image.c-avatar__image--anno(v-else-if="!isSlotShow")
        .c-avatar__content(ref="children",v-else)
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
          children.style.transform = `translate(-50%,-50%) scale(${scale})`
          children.style['ms-transform'] = `translate(-50%,-50%) scale(${scale})`
          children.style['webkit-transform'] = `translate(-50%,-50%) scale(${scale})`
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
        position: relative;
        width: $avatar-size;
        height: $avatar-size;
        overflow: hidden;
        white-space: nowrap;
        background-color: $avatar-bg-color;
        color: $avatar-color;
        .c-avatar__image {
            display: block;
            width: 100%;
            height: 100%;
        }
        .c-avatar__image--anno {
            background-image: url("./anon.png");
            background-size: cover;
        }
        .c-avatar__content {
            position: absolute;
            left: 50%;
            top: 50%;
            padding: 0.2em;
        }
    }

    .c-avatar--square {
        border-radius: $border-radius--small;
    }

    .c-avatar--circle {
        border-radius: 50%;
    }
</style>

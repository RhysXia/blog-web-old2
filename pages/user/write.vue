<template lang="pug">
    c-row.user-write-container
        c-col(:span="16",:offset="4")
            .image(v-if="poster",:src="poster")
            .image.anon(v-else)
                i.fa.fa-camera
</template>

<script>
  export default {
    name: 'user-write',
    data () {
      return {
        poster: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    $height-poster: 12rem;

    .user-write-container {
        .image {
            cursor: pointer;
            background-color: $color-background;
            width: 100%;
            height: $height-poster;

        }
        .anon {
            transition: all 0.4s ease;
            cursor: pointer;
            width: 100%;
            height: $height-poster;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            i {
                position: relative;
                font-size: 5rem;
                color: $color-text-light;
                &:after {
                    transition: all 0.4s ease;
                    content: '';
                    font-size: 1rem;
                    position: absolute;
                    transform: translateY(-100%);
                    top: 100%;
                    left: 0;
                    right: 0;
                    text-align: center;
                    color: $color-text;
                }
            }
            &:hover {
                background-color: color-active($color-background);
                i {
                    color: $color-text;
                    &:after {
                        content: '添加图片';
                        transform: translateY(0%);
                    }
                }

            }
        }
    }
</style>

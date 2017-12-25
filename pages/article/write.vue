<template lang="pug">
    // 写作界面没有必要在服务器端渲染
    no-ssr
        c-row.article-write-container
            c-col(:span="16",:offset="4")
                .image-wrapper(@click="$refs.file.click()")
                    img.image(v-if="poster",:src="poster")
                    .image.anon(v-else)
                        i.fa.fa-camera
                    input.file-upload(ref="file",type="file",@change="upload")

</template>

<script>
  export default {
    name: 'article-write',
    data () {
      return {
        poster: ''
      }
    },
    methods: {
      upload (e) {
        const ele = (e.target || e.srcElement)
        const files = ele.files
        if (files.length > 0) {
          const formData = new FormData()
          formData.append('image', files[0])
          this.$api.article.uploadImage(formData).then(data => {
            this.poster = data.data
          }).catch(() => {})
        }
        ele.value = ''
      }
    },
    computed: {
      isLogin () {
        return this.$store.getters.isLogin
      }
    },
    mounted () {
      // 没有登录则转到错误界面
      if (!this.isLogin) {
        this.$nuxt.error({statusCode: 403, message: '请登陆后重试'})
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    $height-poster: 12rem;

    .article-write-container {
        .image-wrapper {
            position: relative;
            .file-upload {
                width: 0;
                height: 0;
                background-color: transparent;
                border: none;
                outline: none;
                transform: scale(0);
            }
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
                    &:before,
                    &:after {
                        color: $color-text-light;
                    }
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

    }
</style>
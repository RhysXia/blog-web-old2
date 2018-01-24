<template lang="pug">
    // 写作界面没有必要在服务器端渲染
    .c-article-write-container
        .c-article
            c-upload.image-wrapper(:action="article.action",:headers="article.headers",:name="article.name",:onSuccess="article.onSuccess")
                img.image(v-if="value.poster",:src="value.poster")
                .image.anon(v-else)
                    i.fa.fa-camera
            .title-wrapper
                c-input.title(v-model.trim="value.title",type="text",placeholder="请输入标题")
            .info-wrapper
                c-textarea(v-model="value.info",placeholder="请输入概要")
            .editor-wrapper
                c-editor(:textHeight="300",barPosition="top",:fixedTop="70",v-model="value.content",:imageUpload="imageUpload")
        .c-action
</template>
<script>
  import { clone } from '~/utils/utils'
  import CEditor from '~/components/common/editor'
  import CInput from '~/components/common/input'
  import CTextarea from '~/components/common/textarea'
  import CUpload from '~/components/common/upload'
  import { mapState } from 'vuex'
  import CPanel from '../common/panel'

  export default {
    name: 'c-article-write',
    props: {
      value: {
        type: Object,
        required: true
      },
      categories: {
        type: Array,
        required: true
      },
      tags: {
        type: Array,
        required: true
      }
    },
    data () {
      return {}
    },
    computed: {
      ...mapState(['token', 'serverURL']),
      article () {
        const _article = {
          name: 'image',
          action: this.serverURL + '/articles/images',
          headers: {
            Authorization: this.token
          },
          onSuccess: async data => {
            const copy = clone(this.value)
            copy.poster = data
            this.$emit('input', copy)
            this.$message({
              content: '修改成功',
              duration: 2000,
              type: 'success'
            })
          }
        }
        return _article
      }
    },
    methods: {
      async imageUpload (files) {
        if (!files || files.length === 0) {
          return
        }
        const formData = new FormData()
        formData.append('image', files[0])
        const res = await this.$api.article.uploadImage(formData)
        return res.data
      }
    },
    components: {
      CEditor,
      CPanel,
      CInput,
      CTextarea,
      CUpload
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    $height-poster: 15em;

    .c-article-write-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        .c-article, .c-action {
            display: flex;
            flex-direction: column;
        }
        .c-article {
            flex: 3;
            margin-right: 1em;
            > * {
                margin-bottom: 0.5em;
            }
        }
        .c-action {
            flex: 1;
        }
        .image-wrapper {
            position: relative;
            text-align: center;
            border: 1px solid $color-border-base;
            .image {
                cursor: pointer;
                background-color: $color-background;
                /*width: 100%;*/
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
                    &:before,
                    &:after {
                        color: $color-text-light;
                    }
                    &:before {
                        font-size: 5em;
                    }
                    &:after {
                        transition: all 0.4s ease;
                        content: '';
                        font-size: 1em;
                        position: absolute;
                        transform: translateY(-100%);
                        top: 100%;
                        left: 0;
                        right: 0;
                        text-align: center;
                    }
                }
                &:hover {
                    background-color: $color-background-active;
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
        .title-wrapper {
            font-size: 1.1em;
            .title {

            }
        }
        .info-wrapper {
            background-color: $color-background;
        }

    }
</style>

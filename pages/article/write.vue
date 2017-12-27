<template lang="pug">
    // 写作界面没有必要在服务器端渲染
    c-row.article-write-container
        c-col.article-main(:span="16",:offset="4")
            .image-wrapper(@click="$refs.file.click()")
                img.image(v-if="article.poster",:src="article.poster")
                .image.anon(v-else)
                    i.fa.fa-camera
                input.file-upload(ref="file",type="file",@change="upload")
            .title-wrapper
                c-input.title(v-model="article.title",type="text",placeholder="请输入标题")
            .category-wrapper
                c-select(v-model="article.categoryId",placeholder="请选择分类")
                    button.append(slot="append",@click="categoryModal=true") 添加
                    c-option(:value="category.id",:label="category.name",v-for="(category,index) in categories",:key="index")
                c-modal(v-model="categoryModal")

            .tag-wrapper

            .editor-wrapper
                c-editor(:textHeight="300",barPosition="top",:fixedTop="60",v-model="article.content",:imageUpload="imageUpload")
</template>
<script>
    import CEditor from '~/components/common/editor'
    import {Select as CSelect, Option as COption} from '~/components/common/select'
    import CInput from '~/components/common/input'
    import CModal from '~/components/common/modal'

    export default {
        name: 'article-write',
        data() {
            return {
                article: {
                    poster: '',
                    title: '',
                    content: '',
                    categoryId: 0
                },
                categories: [],
                categoryModal: true
            }
        },
        methods: {
            upload(e) {
                const ele = (e.target || e.srcElement)
                const files = ele.files
                if (files.length > 0) {
                    const formData = new FormData()
                    formData.append('image', files[0])
                    this.$api.article.uploadImage(formData).then(data => {
                        this.article.poster = data.data
                    }).catch(() => {
                    })
                }
                ele.value = ''
            },
            imageUpload(files) {
                const formData = new FormData()
                formData.append('image', files[0])
                return this.$api.article.uploadImage(formData).then(data => {
                    const url = data.data
                    return Promise.resolve(url)
                })
            }
        },
        computed: {
            isLogin() {
                return this.$store.getters.isLogin
            }
        },
        beforeMount() {
            // 没有登录则转到错误界面
            if (!this.isLogin) {
                this.$nuxt.error({statusCode: 403, message: '请登陆后重试'})
            }
        },
        mounted() {
            this.$api.category.getAllBySelf({
                pageNum: 1,
                pageSize: 100,
                sorts: 'weight DESC'
            }).then(data => {
                this.categories = data.data
            }).catch(() => {
            })
        },
        components: {
            CEditor,
            CSelect,
            COption,
            CInput,
            CModal
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    $height-poster: 12rem;

    .article-write-container {
        .article-main {
            > * {
                margin-bottom: 0.5rem;
            }
        }
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
            font-size: 1.1rem;
            .title {

            }
        }
        .category-wrapper {
            font-size: 1.1rem;
            .append {
                border-radius: 0;
                padding: 0.3em 0.6em;
                background-color: $color-primary;
                color: $color-text-white;
                box-sizing: border-box;
                &:hover {
                    background-color: $color-primary-active;
                }
            }
        }
    }
</style>

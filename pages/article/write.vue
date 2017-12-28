<template lang="pug">
    // 写作界面没有必要在服务器端渲染
    no-ssr
        c-row.article-write-container(:gutter="16")
            c-col.article-main(:span="18",)
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
                    c-modal(v-model="categoryModal",title="新建分类",@confirm="addCategory")
                        .form
                            .input-wrapper
                                label.label 名称
                                c-input.input(v-model="category.name",placeholder="请输入名称")
                            .input-wrapper
                                label.label 描述
                                c-textarea(v-model="category.description",autoHeight,placeholder="请输入描述信息")
                .tag-wrapper
                    c-select(ref="tagSelect",v-model="article.tagIds",@enter="addTag",@load="load",placeholder="请输入标签",multiple,editable,remote)
                        c-option(:value="tag.id",:label="tag.name",v-for="(tag,index) in tags",:key="index")
                .editor-wrapper
                    c-editor(:textHeight="300",barPosition="top",:fixedTop="70",v-model="article.content",:imageUpload="imageUpload")
            c-col.action(:span="6",v-fixed="70")
                c-panel(title="操作")
                    button(@click="pulish") 发表
                    button 存为草稿

</template>
<script>
    import CEditor from '~/components/common/editor'
    import {Option as COption, Select as CSelect} from '~/components/common/select'
    import CInput from '~/components/common/input'
    import CModal from '~/components/common/modal'
    import CTextarea from '~/components/common/textarea'
    import fixed from '~/utils/directive/fixed'
    import CPanel from '~/components/common/panel'

    export default {
        name: 'article-write',
        directives: {
            fixed
        },
        data() {
            return {
                article: {
                    poster: '',
                    title: '',
                    content: '',
                    categoryId: 0,
                    tagIds: []
                },
                category: {
                    name: '',
                    description: '',
                    weight: 0
                },
                categories: [],
                tags: [],
                categoryModal: false
            }
        },
        methods: {
            pulish() {
                // this.$message({
                //     content: '添加分类成功',
                //     type: 'info',
                //     duration: 1000
                // })
            },
            addTag(name) {
                this.$api.tag.add({name}).then(data => {
                    this.$message({
                        content: '添加标签成功',
                        type: 'info',
                        duration: 1000
                    })
                    const id = data.data.id
                    this.$refs.tagSelect.add({
                        label: name,
                        value: id
                    })
                }).catch(error => {
                    this.$message({
                        content: error.data.message,
                        type: 'error',
                        duration: 1000
                    })
                })
            },
            load(tag) {
                if (this.__timer__) {
                    clearTimeout(this.__timer__)
                }
                this.__timer__ = setTimeout(() => {
                    this.$api.tag.getAll({
                        pageSize: 8,
                        pageNum: 1,
                        name: tag
                    }).then(data => {
                        this.tags = data.data
                    })
                }, 200)
            },
            addCategory() {
                this.$api.category.add(this.category).then(data => {
                    // 更新分类
                    this.getCategories()
                    this.$message({
                        content: '添加分类成功',
                        type: 'info',
                        duration: 2000
                    })
                })
            },
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
            },
            getCategories() {
                this.$api.category.getAllBySelf({
                    pageNum: 1,
                    pageSize: 100,
                    sorts: 'weight DESC,createTime Desc'
                }).then(data => {
                    this.categories = data.data
                }).catch(() => {
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
            this.getCategories()
        },
        components: {
            CEditor,
            CSelect,
            COption,
            CInput,
            CModal,
            CTextarea,
            CPanel
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

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
                padding: 0.4em 0.7em;
                height: 100%;
                background-color: $color-primary;
                color: $color-text-white;
                box-sizing: border-box;
                &:hover {
                    background-color: $color-primary-active;
                }
            }
        }
    }

    .form {
        .input-wrapper {
            margin-bottom: 0.5rem;
            .label {
                font-weight: bold;
            }
            .input {
                width: 100%;
            }
        }
    }

    .action {

        button {
            background-color: $color-primary;
            color: $color-text-white;
            display: block;
            width: 100%;
            margin: 1rem 0;
            &:hover {
                background-color: $color-primary-active;
            }
        }
    }
</style>

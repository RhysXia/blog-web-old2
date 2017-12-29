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
                    c-input.title(v-model.trim="article.title",type="text",placeholder="请输入标题")
                .info-wrapper
                    c-textarea.info(v-model.trim="article.info",placeholder="请输入文章简介",autoHeight)
                .category-wrapper
                    c-select(v-model="article.categoryId",placeholder="请选择分类")
                        button.append(slot="append",@click="categoryModal=true") 添加
                        c-option(:value="category.id",:label="category.name",v-for="(category,index) in categories",:key="index")
                    c-modal(v-model="categoryModal",title="新建分类")
                        .form
                            .input-wrapper
                                label.label 名称
                                c-input.input(v-model="category.name",placeholder="请输入名称")
                            .input-wrapper
                                label.label 描述
                                c-textarea(v-model="category.description",autoHeight,placeholder="请输入描述信息")
                        .button-wrapper(slot='footer')
                            button.confirm(@click="addCategory") 确定
                            button.cancel(@click="categoryModal=false") 取消
                .tag-wrapper
                    c-select(ref="tagSelect",v-model="article.tagIds",@enter="addTag",@load="load",placeholder="请输入标签",multiple,editable,remote)
                        c-option(:value="tag.id",:label="tag.name",v-for="(tag,index) in tags",:key="index")
                .editor-wrapper
                    c-editor(:textHeight="300",barPosition="top",:fixedTop="70",v-model="article.content",:imageUpload="imageUpload")
            c-col.action(:span="6",v-fixed="70")
                c-panel(title="操作")
                    button(@click="publish") 发表
                    button(@click="draft") 存为草稿

</template>
<script>
    import CEditor from '~/components/common/editor'
    import {Option as COption, Select as CSelect} from '~/components/common/select'
    import CInput from '~/components/common/input'
    import CModal from '~/components/common/modal'
    import CTextarea from '~/components/common/textarea'
    import fixed from '~/utils/directive/fixed'
    import CPanel from '~/components/common/panel'
    import {trim} from "../../utils/utils";

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
                    info: '',
                    contentType: 'MARKDOWN',
                    categoryId: -1,
                    tagIds: []
                },
                category: {
                    name: '',
                    description: '',
                    weight: 0
                },
                draftId: null,
                categories: [],
                tags: [],
                categoryModal: false
            }
        },
        methods: {
            draft() {
                if (!this.article.title) {
                    this.$message({
                        content: '请输入标题',
                        type: 'error',
                        duration: 2000
                    })
                    return
                }
                if (!this.article.content) {
                    this.$message({
                        content: '请输入标题',
                        type: 'error',
                        duration: 2000
                    })
                    return
                }
                this.commitDraft().then(() => {
                    this.$message({
                        content: '保存成功',
                        type: 'success',
                        duration: 2000
                    })
                }).catch(err => {
                    this.$message({
                        content: err.message,
                        type: 'error',
                        duration: 2000
                    })
                })
            },
            commitDraft() {
                // 如果已经存过草稿，则修改
                if (this.draftId) {
                    return this.$api.draft.update({
                        id: this.draftId,
                        ...this.article
                    })
                }
                return this.$api.draft.add(this.article).then(data => {
                    this.draftId = data.data.id
                })
            },
            publish() {
                const article = this.article
                if (!trim(article.poster)) {
                    this.$message({
                        content: '请上传海报',
                        type: 'error',
                        duration: 2000
                    })
                    return
                }
                if (!trim(article.title)) {
                    this.$message({
                        content: '请输入标题',
                        type: 'error',
                        duration: 2000
                    })
                    return
                }
                if (!trim(article.content)) {
                    this.$message({
                        content: '请输入文章内容',
                        type: 'error',
                        duration: 2000
                    })
                    return
                }
                if (!trim(article.info)) {
                    this.$message({
                        content: '请输入文章简介',
                        type: 'error',
                        duration: 2000
                    })
                    return
                }
                if (article.categoryId <= 0) {
                    this.$message({
                        content: '请选择文章分类',
                        type: 'error',
                        duration: 2000
                    })
                    return
                }
                if (article.tagIds.length === 0) {
                    this.$message({
                        content: '请输入标签',
                        type: 'error',
                        duration: 2000
                    })
                    return
                }
                let promise = Promise.resolve()
                // 判断是否存为草稿了，如果存为草稿，则先删除草稿
                if (this.draftId) {
                    promise = this.$api.draft.deleteById(this.draftId)
                }
                promise.then(() => {
                    return this.$api.article.add(this.article).then(data => {
                        this.$message({
                            content: '发表文章成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.$router.push('/user/self')
                    })
                }).catch(err => {
                    this.$message({
                        content: err.message,
                        type: 'error',
                        duration: 2000
                    })
                })
            },
            addTag(name) {
                if (!name) {
                    return
                }
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
                const category = this.category
                if (category.name === null || trim(category.name) === '') {
                    return this.$message({
                        content: '分类名不能为空',
                        type: 'error',
                        duration: 2000
                    })
                }
                if (category.description === null || trim(category.description) === '') {
                    return this.$message({
                        content: '描述不能为空',
                        type: 'error',
                        duration: 2000
                    })
                }
                this.$api.category.add(this.category).then(data => {
                    this.categoryModal = false
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
            },
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
        .info-wrapper {
            background-color: $color-background;
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

    .button-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .confirm,
        .cancel {
            margin-left: 0.5em;
        }
        .confirm {
            background-color: $color-primary;
            color: $color-text-white;
            &:hover {
                background-color: $color-primary-active;
            }
        }
        .cancel {
            transition: color 0.4s ease-in-out;
            &:hover {
                color: $color-text-white;
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

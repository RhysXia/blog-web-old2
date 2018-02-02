<template lang="pug">
    c-row.article-write(:gutter="14")
        c-col(:span="18")
            c-upload.article-write__poster--wrapper(:action="image.action",:headers="image.headers",:name="image.name",:onSuccess="image.onSuccess")
                img.article-write__poster(v-if="article.poster",:src="article.poster")
                .article-write__poster.article-write__poster--anon(v-else)
                    i.fa.fa-camera
            c-input(v-model.trim="article.title",type="text",placeholder="请输入标题")
            c-editor(:textHeight="300",barPosition="top",:fixedTop="70",v-model="article.content",:imageUpload="imageUpload")
        c-col(:span="6")
            c-panel.info-panel(title="简介")
                c-input(type="textarea",autoSize,v-model="article.info",placeholder="请输入概要")
            c-panel(title="选择分类")
                c-row(:gutter="6")
                    c-col(:span="18")
                        c-select(v-model="article.categoryId")
                            c-option(:label="category.name",:value="category.id",v-for="category in categories",:key="category.id")
                    c-col(:span="6")
                        c-button(type="primary",v-show="!isNewCategory",@click="isNewCategory=true") 新建
                transition(name="slide")
                    .panel-item--create(v-show="isNewCategory")
                        c-input(v-model="category.name",placeholder="输入分类名称")
                        c-input(v-model="category.description",placeholder="输入分类描述")
                        c-button(type="primary",@click="addCategory") 提交
                        c-button(@click="isNewCategory=false") 取消
            c-panel(title="选择标签")
                c-row(:gutter="6")
                    c-col(:span="18")
                        c-select(remote,multiple,@remote="remoteTagHandler",v-model="article.tagIds")
                            c-option(:label="tag.name",:value="tag.id",v-for="tag in tags",:key="tag.id")
                    c-col(:span="6")
                        c-button(type="primary",v-show="!isNewTag",@click="isNewTag=true") 新建
                transition(name="slide")
                    .panel-item--create(v-show="isNewTag")
                        c-input(v-model="tag.name",placeholder="输入标签名称")
                        c-button(type="primary",@click="addTag") 提交
                        c-button(@click="isNewTag=false") 取消
            c-panel.action-panel(v-fixed="70",title="操作")
                c-button(long,type="primary",@click="punish") 发表
                // 已经发表的文章不需要保存到草稿
                c-button(long,@click="saveAsDraft",v-if="articleId<0") 保存草稿
</template>
<script>
  import CEditor from '~/components/common/editor'
  import CInput from '~/components/common/input'
  import CUpload from '~/components/common/upload'
  import { mapState } from 'vuex'
  import CPanel from '~/components/common/panel'
  import { COption, CSelect } from '~/components/common/select'
  import CButton from '~/components/common/button'
  import fixed from '~/utils/directive/fixed'

  export default {
    directives: {
      fixed
    },
    head () {
      return {
        title: this.loginUser.nickname + '的写作页'
      }
    },
    async asyncData ({store, error, query}) {
      if (!store.getters.permissions.includes('POST:/articles')) {
        error({statusCode: 500, message: '你没有权限访问'})
      }
      try {
        const data = {
          tags: [],
          categories: [],
          draftId: -1,
          articleId: -1,
          article: {
            title: '',
            poster: '',
            info: '',
            content: '',
            contentType: 'MARKDOWN',
            categoryId: -1,
            tagIds: []
          }
        }
        let res
        // 如果是编辑草稿
        const draftId = query.draftId
        if (draftId) {
          res = await store.$api.draft.getById(draftId)
          const draft = res.data
          let tagIds = []
          if (draft.tagIds) {
            tagIds = draft.tagIds.split(',').map(it => {
              return Number(it)
            })
          }
          data.article = {
            title: draft.title || '',
            poster: draft.poster || '',
            info: draft.info || '',
            content: draft.content || '',
            contentType: draft.contentType,
            categoryId: draft.categoryId || -1,
            tagIds
          }
          data.draftId = Number(draftId)
        } else {
          // 如果是修改文章
          const articleId = query.articleId
          if (articleId) {
            res = await store.$api.article.getById(articleId)
            const article = res.data
            data.article = {
              title: article.title,
              poster: article.poster,
              info: article.info,
              content: article.content,
              contentType: article.contentType,
              categoryId: article.category.id,
              tagIds: article.tags.map(it => {
                return it.id
              })
            }
            data.articleId = Number(articleId)
          }
        }

        res = await store.$api.category.getAllByUserId({
          userId: store.state.loginUser.id,
          page: 0,
          size: 100
        })
        data.categories = res.data.content
        res = await store.$api.tag.getAll({
          page: 0,
          size: 10
        })
        data.tags = res.data.content
        return data
      } catch (err) {
        error({statusCode: err.statusCode, message: err.message})
      }
    },
    data () {
      return {
        placement: 'bottom-start',
        category: {
          name: '',
          description: '',
          weight: 0
        },
        isNewCategory: false,
        isNewTag: false,
        tag: {
          name: ''
        }
      }
    },
    computed: {
      ...mapState(['token', 'serverURL', 'loginUser']),
      image () {
        return {
          name: 'image',
          action: this.serverURL + '/articles/images',
          headers: {
            Authorization: this.token
          },
          onSuccess: data => {
            this.article.poster = data
            this.$message({
              content: '上传成功',
              duration: 2000,
              type: 'success'
            })
          }
        }
      }
    },
    methods: {
      async saveAsDraft () {
        try {
          const article = this.article
          if (!article.title.trim()) {
            this.$message({
              content: '文章标题不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          if (this.draftId >= 0) {
            await this.$api.draft.update({
              ...article,
              id: this.draftId
            })
          } else {
            const res = await this.$api.draft.add(article)
            this.draftId = res.data.id
          }
          this.$message({
            content: '保存成功',
            duration: 2000,
            type: 'success'
          })
          this.$router.push({
            path: '/article/write',
            query: {
              draftId: this.draftId
            }
          })
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      async punish () {
        try {
          const article = this.article
          if (!article.title.trim()) {
            this.$message({
              content: '文章标题不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          if (!article.info.trim()) {
            this.$message({
              content: '文章简介不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          if (!article.poster.trim()) {
            this.$message({
              content: '文章图片不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          if (!article.content.trim()) {
            this.$message({
              content: '文章内容不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          if (!article.categoryId) {
            this.$message({
              content: '文章分类不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          if (article.tagIds.length === 0) {
            this.$message({
              content: '文章标签不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          let res
          let config = {...article}
          // 如果是已经发布的文章进行修改
          if (this.articleId >= 0) {
            config.id = this.articleId
            res = await this.$api.article.update(config)
          } else {
            // 如果是草稿或者新建的文章
            if (this.draftId >= 0) {
              config.draftId = this.draftId
            }
            res = await this.$api.article.add(config)
          }
          this.$message({
            content: '发表成功',
            duration: 2000,
            type: 'success'
          })

          // 跳转到文章页
          this.$router.push(`/article/${res.data.id}`)
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      async addCategory () {
        try {
          if (!this.category.name.trim()) {
            this.$message({
              content: '分类名不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          if (!this.category.description.trim()) {
            this.$message({
              content: '分类描述不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          let res = await this.$api.category.add(this.category)
          this.article.categoryId = res.data.id
          res = await this.$api.category.getAllByUserId({
            userId: this.loginUser.id,
            page: 0,
            size: 100
          })
          this.categories = res.data.content
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      async addTag () {
        try {
          if (!this.tag.name.trim()) {
            this.$message({
              content: '标签名不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          let res = await this.$api.tag.add(this.tag)
          this.tags.push(res.data)
          this.article.tagIds.push(res.data.id)
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      remoteTagHandler (name) {
        if (this.__tagTimer) {
          clearTimeout(this.__tagTimer)
          this.__tagTimer = null
        }
        this.__tagTimer = setTimeout(() => {
          this.$api.tag.getAll({
            page: 0,
            size: 10,
            name: `%${name}%`
          }).then(res => {
            this.tags = res.data.content
          }).catch(err => {
            this.$message({
              content: err.message,
              duration: 2000,
              type: 'error'
            })
          })
        }, 500)
      },
      async imageUpload (files) {
        if (!files || files.length === 0) {
          return
        }
        const formData = new FormData()
        formData.append('image', files[0])
        const res = await
          this.$api.article.uploadImage(formData)
        return res.data
      }
    },
    components: {
      CEditor,
      CPanel,
      CInput,
      CUpload,
      COption,
      CSelect,
      CButton
    }
  }
</script>
<style lang="scss">
    @import "~assets/scss/application";

    $height-poster: 15em;

    .article-write {

        & > * > * {
            margin-bottom: 1em;
        }
        .article-write__poster--wrapper {
            width: 100%;
            height: $height-poster;
            background-color: $bg-color;
            .article-write__poster {
                display: block;
                height: $height-poster;
                max-width: 100%;
                margin: 0 auto;
            }
            .article-write__poster--anon {
                line-height: $height-poster;
                text-align: center;
                .fa {
                    font-size: 3em;
                    position: relative;
                    &:after {
                        content: '';
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform-origin: 100% 0;
                        transform: translateX(-50%);
                        font-size: 0.3em;
                        font-weight: bold;
                        white-space: nowrap;
                        margin-top: 1em;
                        transition: 0.4s ease-in-out;
                        opacity: 0;
                        color: $text-color--secondary;
                    }
                }
                &:hover {
                    .fa::after {
                        content: "请上传海报";
                        opacity: 1;
                        margin-top: 0.3em;
                    }
                }
            }
        }
        .action-panel {
            .c-panel__body {
                margin-bottom: -1em;
            }
            .c-button {
                margin-bottom: 1em;
            }
        }

        .panel-item--create {
            border-top: 1px dotted $border-color;
            margin-top: 1em;
            > * {
                margin-top: 1em;
            }
            .c-button {
                margin-right: 0.5em;
            }
        }

        .slide-enter-active,
        .slide-leave-active {
            transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
            transform-origin: 0 0;
        }
        .slide-enter,
        .slide-leave-to {
            opacity: 0;
            transform: scaleY(0.5);
        }
        .slide-enter-to,
        .slide-leave {
            opacity: 1;
            transform: scaleY(1);
        }
    }
</style>

<template lang="pug">
    .self-info-container
        template(v-if="drafts.length>0")
            h2.title 草稿
            .wrapper
                c-draft-item.item(@delete="deleteDraft(draft.id)",v-for="draft in drafts",:key="draft.id",:draft="draft")
        template(v-if="categories.length>0")
            h2.title 常用分类
            .wrapper
                c-category-item.item(@update="categoryUpdate(category)",@delete="deleteCategory(category.id)",v-for="category in categories",:key="category.id",:category="category")
        template(v-if="articles.length>0")
            h2.title 最近文章
            c-article-item.item.article(v-for="article in articles",:key="article.id",:article="article")
        c-modal(v-model="isModal",title="修改分类")
            .body
                .input-wrapper
                    label.label 名称
                    c-input(v-model="category.name",placeholder="请输入分类名称")
                .input-wrapper
                    label.label 描述
                    c-input(v-model="category.description",placeholder="请输入分类描述")
            .footer(slot="footer")
                button.primary(@click="categorySubmit") 确定
                button(@click="isModal=false") 取消
</template>
<script>
  import CArticleItem from '~/components/article/item'
  import CCategoryItem from '~/components/category/item'
  import CDraftItem from '~/components/draft/item'
  import CModal from '~/components/common/modal'
  import CInput from '~/components/common/input'

  export default {
    async asyncData ({params, store, error}) {
      const userId = Number(params.id)
      try {
        const data = {
          categories: [],
          drafts: [],
          articles: [],
          userId
        }
        let res = await store.$api.category.getAllByUserId({
          userId,
          page: 0,
          size: 4,
          sort: 'weight,DESC'
        })
        data.categories = res.data.content

        res = await store.$api.article.getAllByUserId({
          userId,
          page: 0,
          size: 6,
          sort: ['voteNum,DESC', 'readNum,DESC', 'updateAt,DESC']
        })
        data.articles = res.data.content

        if (store.getters.permissions.includes('GET:/drafts/self')) {
          res = await store.$api.draft.getSelf({page: 0, size: 100})
          data.drafts = res.data.content
        }
        return data
      } catch (err) {
        error({statusCode: err.statusCode, message: err.message})
      }
    },
    data () {
      return {
        isModal: false,
        category: {
          id: -1,
          name: '',
          description: '',
          weight: 0
        }
      }
    },
    methods: {
      async categorySubmit () {
        try {
          await this.$api.category.update(this.category)
          const userId = this.userId
          let res = await this.$api.category.getAllByUserId({
            userId,
            page: 0,
            size: 4,
            sort: 'weight,DESC'
          })
          this.categories = res.data.content
          this.$message({
            content: '修改成功',
            duration: 2000,
            type: 'success'
          })
          this.isModal = false
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      categoryUpdate (category) {
        this.category.id = category.id
        this.category.name = category.name
        this.category.description = category.description
        this.category.weight = category.weight
        this.isModal = true
      },
      async deleteCategory (id) {
        try {
          await this.$api.category.deleteById(id)
          const userId = this.userId
          let res = await this.$api.category.getAllByUserId({
            userId,
            page: 0,
            size: 4,
            sort: 'weight,DESC'
          })
          this.categories = res.data.content
          this.$message({
            content: '删除成功',
            duration: 2000,
            type: 'success'
          })
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      async deleteDraft (id) {
        try {
          await this.$api.draft.deleteById(id)
          this.$message({
            content: '删除成功',
            duration: 2000,
            type: 'success'
          })
          let res = await this.$api.draft.getSelf({page: 0, size: 100})
          this.drafts = res.data.content
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      }
    },
    components: {
      CArticleItem,
      CCategoryItem,
      CDraftItem,
      CModal,
      CInput
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .self-info-container {
        .title {
            font-size: 1.1em;
        }
        .item {
            margin-bottom: 1em;
        }
        .wrapper {
            margin-right: -1em;
            @include clearfix;
            .item {
                box-sizing: border-box;
                width: calc(50% - 1em);
                float: left;
                margin-right: 1em;
            }
        }
        .article {
            font-size: 0.8em;
        }
        .body {
            .input-wrapper {
                margin-bottom: 1em;
            }
        }
        .footer {
            .primary {
                margin-right: 1em;
            }
        }
    }
</style>

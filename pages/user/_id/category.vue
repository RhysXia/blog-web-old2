<template lang="pug">
    .self-category-container
        c-category-item.item(@update="categoryUpdate(category)",@delete="deleteCategory(category.id)",v-for="category in categories",:key="category.id",:category="category")
        c-pagination(@change="pageChange",:page="page",:totalPages="totalPages")
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
  import CCategoryItem from '~/components/category/item'
  import CPagination from '~/components/common/pagination'
  import CModal from '~/components/common/modal'
  import CInput from '~/components/common/input'

  export default {
    watchQuery: ['page'],
    key: to => to.fullPath,
    async asyncData ({store, params, query, error}) {
      try {
        const userId = Number(params.id)
        const page = Number(query.page || 1)
        const size = 8
        const data = {
          categories: [],
          page,
          size,
          totalPages: 0,
          userId
        }
        let res = await store.$api.category.getAllByUserId({
          userId,
          page: page - 1,
          size: size,
          sort: 'weight,DESC'
        })
        data.categories = res.data.content
        data.totalPages = res.data.totalPages
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
          this.$message({
            content: '删除成功',
            duration: 2000,
            type: 'success'
          })
          await this.pageChange(this.page)
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      async pageChange (page) {
        if (page === this.page) {
          let res = await this.$api.category.getAllByUserId({
            userId: this.userId,
            page: page - 1,
            size: this.size,
            sort: 'weight,DESC'
          })
          this.categories = res.data.content
          this.totalPages = res.data.totalPages
          return
        }
        const userId = this.userId
        this.$router.push({
          path: `/user/${userId}/category`,
          query: {
            page
          }
        })
      }
    },
    components: {
      CCategoryItem,
      CPagination,
      CModal,
      CInput
    }
  }
</script>

<style lang="scss" scoped>
    .self-category-container {
        .item {
            margin-bottom: 1em;
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

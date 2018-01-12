<template lang="pug">
    .c-category-list-container
        modal(v-model="showModal")
            .form
                .input-wrapper
                    label.label 名称
                    c-input.input(v-model="uCategory.name",placeholder="请输入名称")
                .input-wrapper
                    label.label 描述
                    c-textarea(v-model="uCategory.description",autoHeight,placeholder="请输入描述信息")
            .button-wrapper(slot='footer')
                button.confirm(@click="updateCategory") 确定
                button.cancel(@click="showModal=false") 取消
        .category-wrapper
            transition-group(name="list",tag="div")
                item.item(:category="category",:key="category.id",v-for="category in categories",@delete="deleteCategory(category.id)",@update="initUpdate(category.id)")
        pagination(:total="total",:pageSize="pageSize",@pageChange="pageChange")
</template>

<script>
  import item from './item'
  import Pagination from '../common/pagination'
  import modal from '../common/modal'
  import CInput from '../common/input'
  import CTextarea from '../common/textarea'

  export default {
    name: 'c-category-list',
    props: {
      categories: {
        type: Array,
        default: []
      },
      total: {
        type: Number
      },
      pageSize: {
        type: Number
      }
    },
    data () {
      return {
        showModal: false,
        uCategory: {
          id: 0,
          name: '',
          description: '',
          weight: 0
        }
      }
    },
    methods: {
      pageChange (val) {
        this.$emit('pageChange', val)
      },
      async deleteCategory (id) {
        try {
          await this.$api.category.deleteById(id)
          const categories = this.categories.filter(c => {
            return c.id !== id
          })
          this.$emit('update:categories', categories)
          this.$message({
            content: '删除成功',
            type: 'success',
            duration: 2000
          })
        } catch (err) {
          this.$message({
            content: err.message,
            type: 'error',
            duration: 2000
          })
        }
      },
      initUpdate (id) {
        const category = this.categories.filter(it => {
          return it.id === id
        })
        if (category.length === 1) {
          this.uCategory.id = category[0].id
          this.uCategory.name = category[0].name
          this.uCategory.description = category[0].description
          this.uCategory.weight = category[0].weight
          this.showModal = true
        } else {
          this.$message({
            content: '未知错误',
            type: 'error',
            duration: 2000
          })
        }
      },
      async updateCategory () {
        try {
          const {data} = await this.$api.category.update(this.uCategory)

          const categories = this.categories.slice()

          for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === data.id) {
              categories[i] = data
            }
          }
          this.$emit('update:categories', categories)
          this.showModal = false
        } catch (err) {
          this.$message({
            content: err.message,
            type: 'error',
            duration: 2000
          })
        }
      }
    },
    components: {
      item,
      Pagination,
      modal,
      CInput,
      CTextarea
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-category-list-container {
        position: relative;
        width: 100%;
        .category-wrapper {
            position: relative;
            margin-right: -1em;
            @include clearfix;
            .item {
                box-sizing: border-box;
                float: left;
                margin-right: 1em;
                width: calc(50% - 1em);
            }
        }
        .item {
            margin-bottom: 1em;
        }
        .list-enter-active {
            transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
        }
        .list-leave-active {
            display: none;
        }
        .list-enter {
            opacity: 0;
            transform: translateX(100%);
        }
        .list-enter-to {
            opacity: 1;
            transform: translateX(0);
        }

    }
</style>

<template lang="pug">
    .self-category-container
        c-category-list(:categories.sync="categories")
</template>

<script>
  import CCategoryList from '~/components/category/list'

  export default {
    name: 'info',
    async asyncData ({store, params}) {
      const userId = params.id
      const result = {
        categories: []
      }
      const {data} = await store.$api.category.getAllByUserId({
        userId,
        page: 0,
        size: 100,
        sort: 'weight,DESC'
      })
      result.categories = data.content
      return result
    },
    components: {
      CCategoryList
    }
  }
</script>

<style lang="scss" scoped>
    .self-category-container {

    }

</style>

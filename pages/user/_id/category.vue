<template lang="pug">
    .self-category-container
        .category-wrapper(v-for="category in categories",:key="category.id")
            c-category-item(:category="category")
</template>

<script>
  import CCategoryItem from '~/components/category/item'

  export default {
    name: 'info',
    async asyncData ({store, params}) {
      const userId = params.id
      const result = {}
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
      CCategoryItem
    }
  }
</script>

<style lang="scss" scoped>
    .self-category-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-right: -1rem;
    }

    .category-wrapper {
        box-sizing: border-box;
        width: calc(50% - 1rem);
        margin-right: 1rem;
        margin-bottom: 1rem;
    }
</style>
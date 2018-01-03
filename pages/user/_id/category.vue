<template lang="pug">
    .self-category-container
        .category-wrapper(v-for="(category,index) in categories",:key="index")
            c-category-item(:category="category")
</template>

<script>
    import CCategoryItem from '~/components/category/item'

    export default {
        name: "info",
        async asyncData({store, params}) {
            const userId = params.id
            const result = {}
            await store.$api.category.getAllByUserId({
                userId,
                pageSize: 100,
                pageNum: 1,
                sorts: 'weight DESC'
            }).then(data => {
                result.categories = data.data
            })
            return result
        },
        components: {
            CCategoryItem
        }
    }
</script>

<style lang="scss" scoped>
    .self-category-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-right: -1rem;
    }
    .category-wrapper{
        box-sizing: border-box;
        width: calc(50% - 1rem);
        margin-right: 1rem;
        margin-bottom: 1rem;
    }
</style>
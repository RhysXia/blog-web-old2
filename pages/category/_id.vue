<template>

</template>

<script>
    export default {
        validate({params}) {
            return /^\d+$/.test(params.id)
        },
        async asyncData({params, store}) {
            const result = {}
            const categoryId = params.id
            await store.$api.article.getAllByCategoryId({
                categoryId,
                pageNum: 1,
                pageSize: 10,
                sorts: 'updateTime DESC'
            }).then(data => {
                result.articles = data.data
            })
            return result
        }
    }
</script>

<style scoped>

</style>
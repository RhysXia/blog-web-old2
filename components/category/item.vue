<template lang="pug">
    .c-category-item-container
        nuxt-link(:to="'/category/'+category.id")
            h2.name {{category.name}}
        .desc {{category.description}}
        .info
            i.fa.fa-book
            | {{category.articleNum}}
</template>

<script>
    export default {
        name: "item",
        props: {
            category: {
                type: Object,
                default: {}
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-category-item-container{
        border: 1px solid $color-border-base;
        padding: 0.5em 1em;
        border-radius: 0.3em;
        .name{
            font-size: 1em;
            margin: 0 0 1em 0;
        }
        .desc,info{
            font-size: 0.8em;
            color: $color-text-light;
        }
    }
</style>
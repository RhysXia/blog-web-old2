<template lang="pug">
    .c-category-item
        nuxt-link.category__name(:to="'/category/'+category.id")
            h2 {{category.name}}
        .category__desc {{category.description}}
        .category__info {{category.updateAt|formatDate}}更新
            i.dot
            | {{category.articleNum}}篇文章

</template>

<script>

  export default {
    name: 'c-category-item-show',
    props: {
      category: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/application";



    .c-category-item {
        padding: 0.5em;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        .category__name {
            h2 {
                font-size: 1.2em;
                font-weight: bold;
                padding: 0;
                margin: 0;
            }
        }
        .category__desc {
            margin: 0.5em 0;
            height: 3em;
            overflow: hidden;
        }
        .category__info {
            color: $text-color--secondary;
            font-size: 0.9em;
        }
    }
</style>

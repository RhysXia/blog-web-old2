<template lang="pug">
    .c-category-item-container
        nuxt-link.category__name(:to="'/category/'+category.id")
            span.name {{category.name}}
        .desc {{category.description}}
        .info {{category.updateAt|formatDate}}更新
            i.dot
            | {{category.articleNum}}篇文章

</template>

<script>
  import CButton from '../common/button'

  export default {
    name: 'c-category-item',
    props: {
      category: {
        type: Object,
        default: {}
      }
    },
    components: {
      CButton
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/application";

    .c-category-item-container {
        border: 1px solid $color-border-base;
        padding: 0.5em 1em;
        border-radius: 0.3em;npm
        .header {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.5em;
            .name {
                font-size: 1em;
                font-weight: bold;
            }
            .dropdown {
                margin-right: -0.5em;
                .menu, .item {
                    border: none;
                    background-color: transparent;
                }
                .menu {
                    padding: 0.5em 1em;
                    &:hover {
                        color: $color-text-deep;
                    }
                }
                .item {
                    padding: 1em 2em;
                }
            }
        }

        .desc, info {
            color: $color-text-light;
        }
        .info {
            margin-top: 0.5em;

            .dot {
                &:after {
                    content: '\B7';
                    margin: 0 0.25em;

                }
            }
        }
    }
</style>

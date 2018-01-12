<template lang="pug">
    .c-category-item-container
        .header
            nuxt-link(:to="'/category/'+category.id")
                span.name {{category.name}}
            c-dropdown.dropdown(v-if="isSelf",position="right",trigger="click")
                button.menu
                    i.fa.fa-cog
                c-dropdown-menu(slot="list")
                    c-dropdown-item
                        button.item(@click="$emit('update')") 修改
                    c-dropdown-item
                        button.item(@click="$emit('delete')") 删除
        .desc {{category.description}}
        .info
            i.fa.fa-book
            | {{category.articleNum}}
</template>

<script>
  import { CDropdown, CDropdownItem, CDropdownMenu } from '../common/dropdown'

  export default {
    name: 'c-category-item',
    props: {
      category: {
        type: Object,
        default: {}
      }
    },
    computed: {
      isLogin () {
        return this.$store.getters.isLogin
      },
      user () {
        return this.$store.state.user
      },
      isSelf () {
        return this.isLogin && this.category.author.id === this.user.id
      }
    },
    components: {
      CDropdown,
      CDropdownItem,
      CDropdownMenu
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-category-item-container {
        border: 1px solid $color-border-base;
        padding: 0.5em 1em;
        border-radius: 0.3em;
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
                .menu{
                    color: $color-text;
                    background-color: transparent;
                    padding: 0.5em 1em;
                    &:hover{
                        color: $color-text-deep;
                    }
                }
                .item{
                    padding: 1em 2em;
                    &:hover{
                        background-color: $color-background-active;
                    }
                }
            }
        }

        .desc, info {
            color: $color-text-light;
        }
        .info{
            margin-top: 0.5em;
        }
    }
</style>

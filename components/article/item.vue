<template lang="pug">
    .c-article-item-container
        .left
            img.poster(:src="article.poster")
        .right
            .header
                nuxt-link(:to="'/article/'+article.id")
                    h2.title {{article.title}}
                c-dropdown.dropdown(v-if="isSelf",trigger="click")
                    button.menu
                        i.fa.fa-cog
                    c-dropdown-menu(slot="list")
                        c-dropdown-item
                            button.item(@click="$router.push({path:'/article/write',query:{articleId:article.id}})") 修改
                        c-dropdown-item
                            button.item(@click="$emit('delete')") 删除
            .info {{article.info}}
            .detail
                span.time
                    i.fa.fa-clock-o
                    | {{article.updateAt | formatDate}}
                span.read
                    i.fa.fa-eye
                    | {{article.readNum}}
                span.like
                    i.fa.fa-heart
                    | {{article.voteNum}}
                span.comment
                    i.fa.fa-comments
                    | {{article.commentNum}}
                span.category(v-if="article.category")
                    i.fa.fa-list
                    nuxt-link(:to="'/category/'+article.category.id") {{article.category.name}}
</template>
<script>
  import { CDropdown, CDropdownItem, CDropdownMenu } from '../common/dropdown'

  export default {
    name: 'c-article-item',
    props: {
      article: {
        type: Object,
        default: () => {
        }
      }
    },
    computed: {
      isSelf () {
        const loginUser = this.$store.state.user
        if (loginUser && loginUser.id) {
          if (loginUser.id === this.article.author.id) {
            return true
          }
        }
        return false
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

    $article-item-height: 10em;
    .c-article-item-container {
        display: flex;
        flex-direction: row;
        height: $article-item-height;
        background-color: $color-background;
        padding: 0.5em;
        transition: background-color 0.4s ease;
        &:hover {
            background-color: $color-background-active;
        }
        .left {
            .poster {
                width: $article-item-height * 1.1;
                height: 100%;
            }
        }
        .right {
            margin-left: 0.5em;
            width: 100%;
            .header {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
            .dropdown {
                .menu {
                    color: $color-text;
                    background-color: transparent;
                    padding: 0.5em 1em;
                    &:hover {
                        color: $color-text-deep;
                    }
                }
                .item {
                    padding: 1em 2em;
                    &:hover {
                        background-color: $color-background-active;
                    }
                }
            }
            .title {
                font-weight: bold;
                font-size: 1.2em;
                height: 1.2em;
                margin: 0.5em 0;
            }
            .info {
                height: $article-item-height - 1.2 - 1 - 1 - 1 - 0.5;
                line-height: ($article-item-height - 1.2 - 1 - 1 - 1 - 0.5) / 3;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;

            }
            .detail {
                margin-top: 0.5em;
                height: 1em;
                span {
                    margin-right: 0.8em;
                    i {
                        padding-right: 0.3em;
                    }
                }
            }

        }
    }
</style>

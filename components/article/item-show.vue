<template lang="pug">
    .c-article-item--show
        nuxt-link.item__left(:to="'/article/'+article.id")
            img.poster(:src="article.poster")
        .item__right
            .item__header
                nuxt-link(:to="'/article/'+article.id")
                    h1.title {{article.title}}
            .item__body {{article.info}}
            .item__footer
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
  export default {
    name: 'c-article-item-show',
    props: {
      article: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>
<style lang="scss">
    @import "~assets/scss/application";

    $article-item-height: 10em;
    .c-article-item--show {
        height: $article-item-height;
        background-color: $bg-color;
        padding: 0.5em;
        box-sizing: border-box;
        .item__left {
            display: block;
            float: left;
            width: $article-item-height - 1;
            height: $article-item-height - 1;
            .poster {
                width: 100%;
                height: 100%;
                transition: 0.2s ease-in-out;
                &:hover {
                    transform: rotate(360deg);
                }
            }
        }
        .item__right {
            margin-left: $article-item-height - 0.5;
            .item__header {
                height: 2em;
                overflow: hidden;
                h1 {
                    margin: 0;
                    padding: 0;
                    font-size: 1.2em;
                    font-weight: bold;
                }
            }
            .item__body {
                height: $article-item-height - 3 - 1;
                padding: 0.5em 0;
                overflow: hidden;
                box-sizing: border-box;
            }
            .item__footer {
                height: 1em;
                overflow: hidden;
                opacity: 0.8;
                > * {
                    margin-right: 1em;
                }
                i{
                    margin-right: 0.5em;
                }
            }
        }
    }

</style>

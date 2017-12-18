<template lang="pug">
    .c-article-item-container
        .left
            img.poster(:src="article.poster")
        .right
            nuxt-link(:to="'/article/'+article.id")
                h2.title {{article.title}}
            .info {{article.info}}
            .detail
                span.time
                    i.fa.fa-clock-o
                    | {{article.updateTime | formatDate}}
                span.read
                    i.fa.fa-eye
                    | {{article.readCount}}
                span.like
                    i.fa.fa-heart
                    | {{article.likeCount}}
                span.category(v-if="article.category")
                    i.fa.fa-list
                    | {{article.category.name}}
</template>
<script>
  export default {
    name: 'article-item',
    props: {
      article: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    $article-item-height: 10rem;
    .c-article-item-container {
        display: flex;
        flex-direction: row;
        height: $article-item-height;
        background-color: $color-background;
        padding: 0.5rem;

        .left {
            .poster {
                width: $article-item-height * 1.1;
                height: 100%;
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            margin-left: 0.5rem;
            .title {
                font-weight: bold;
                font-size: 1.2rem;
            }
            .info {
                font-size: 1.1rem;
                display: flex;
                flex: 1 1 auto;
            }
            .detail {
                display: flex;
                align-self: flex-end;
                align-items: center;
                span {
                    margin-right: 0.8rem;
                    i {
                        padding-right: 0.3rem;
                    }
                }
            }

        }
    }
</style>

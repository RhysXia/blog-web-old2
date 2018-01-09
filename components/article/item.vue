<template lang="pug">
    .c-article-item-container
        .left
            img.poster(:src="article.poster")
        .right
            .header
                nuxt-link(:to="'/article/'+article.id")
                    h2.title {{article.title}}
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

    export default {
        name: 'article-item',
        props: {
            article: {
                type: Object,
                default: () => {
                }
            }
        },
        computed: {
            isSelf() {
                const loginUser = this.$store.state.user
                if (loginUser && loginUser.id) {
                    if (loginUser.id === article.author.id) {
                        return true
                    }
                }
                return false
            }
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
            display: flex;
            flex-direction: column;
            margin-left: 0.5em;
            .title {
                font-weight: bold;
                font-size: 1.2em;
            }
            .info {
                font-size: 1.1em;
                display: flex;
                flex: 1 1 auto;
            }
            .detail {
                display: flex;
                align-self: flex-end;
                align-items: center;
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

<template lang="pug">
    .index-container
        .carousel-wrapper
            c-carousel(width="100%",height="200px")
                c-carousel-item(v-for="(article,index) in  hotArticles.slice(0)",:key="index")
                    nuxt-link.article-image-wrapper(:to="'/article/'+article.id")
                        img.article-image(:src="article.poster")
                        span.title {{article.title}}
        c-article-list(:articles="articles",:total="count",:pageSize="size",@pageChange="pageChange")
</template>
<script>
    import {CCarousel, CCarouselItem} from '~/components/common/carousel'
    import CArticleList from '~/components/article/list'

    export default {
        head() {
            return {
                title: '首页'
            }
        },
        async asyncData({store}) {
            const data = {
                articles: [],
                count: 0,
                size: 10,
            }
            await store.$api.article.getAll({
                page: 0,
                size: data.size,
                sort: 'updateAt,DESC'
            }).then(res => {
                data.count = res.data.totalElements
                data.articles = res.data.content
            }).catch()
            return data
        },
        data() {
            return {
                refresh: true
            }
        },
        methods: {
            pageChange(val) {
                this.$api.article.getAll({
                    page: val-1,
                    size: this.size,
                    sort: 'updateAt,DESC'
                }).then(res => {
                    this.count = res.data.totalElements
                    this.articles = res.data.content
                }).catch()
            }
        },
        computed: {
            hotArticles() {
                return this.$store.state.article.hotArticles
            }
        },
        components: {
            CCarousel,
            CCarouselItem,
            CArticleList
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .index-container {
        > * {
            margin-bottom: 1rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .carousel-wrapper {
            padding: 0.5rem;
            background-color: $color-background;
            .article-image-wrapper {
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
                .article-image {
                    width: 100%;
                    height: 100%;
                }
                .title {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    padding: 0.25rem 0.5rem;
                    background-color: $color-background;
                    opacity: 0.5;
                }
            }

        }

    }
</style>

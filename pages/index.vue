<template lang="pug">
    .index-container
        .carousel-wrapper
            c-carousel(width="100%",height="200px")
                c-carousel-item(v-for="(article,index) in  hotArticles.slice(0)",:key="index")
                    nuxt-link.article-image-wrapper(:to="'/article/'+article.id")
                        img.article-image(:src="article.poster")
                        span.title {{article.title}}
        c-article-list(:articles="articles",:hasMore="hasMore",:loadMore="loadMore")
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
        asyncData({store}) {
            const articles = store.state.article.indexArticleInfo.articles
            if (articles.length === 0) {
                return store.dispatch('article/loadIndexArticleInfo').catch(err => {
                })
            }
        },
        data() {
            return {
                refresh: true
            }
        },
        methods: {
            loadMore() {
                return this.$store.dispatch('article/loadIndexArticleInfo')
            }
        },
        computed: {
            articleInfo() {
                return this.$store.state.article.indexArticleInfo
            },
            articles() {
                return this.articleInfo.articles
            },
            hasMore() {
                return this.articleInfo.pageNum * this.articleInfo.pageSize < this.articleInfo.count
            },
            hotArticles() {
                return this.$store.state.article.hotArticles
            }
        },
        watch: {
            'articleInfo.count'(val) {
                if (!this.refresh) {
                    return
                }
                this.$message({
                    type: 'info',
                    content: '有新的文章，请刷新页面获取最新数据',
                    duration: 2000
                })
                this.refresh = false
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

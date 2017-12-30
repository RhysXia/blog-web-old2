export const state = () => ({
    hotArticles: [],
    indexArticleInfo: {
        pageSize: 5,
        pageNum: 0,
        articles: [],
        count: 0
    },
})
export const mutations = {
    setHotArticles(state, articles) {
        state.hotArticles = articles
    },
    setIndexArticleInfo(state, indexArticlesInfo) {
        state.indexArticleInfo = indexArticlesInfo
    }
}
export const actions = {
    loadIndexArticleInfo({state, commit}) {
        let {pageSize, pageNum, articles, count} = state.indexArticleInfo
        return this.$api.article.count().then(data => {
            count = data.data
        }).then(() => {
            pageNum++
            return this.$api.article.getAll({
                pageSize,
                pageNum,
                sorts: 'updateTime DESC'
            })
        }).then(data => {
            // 有可能出现重复，去重
            const ids = articles.map(it=>it.id)
            let newArticles = data.data.filter(it => {
                return !ids.includes(it.id)
            })
            articles = articles.concat(newArticles)
        }).then(() => {
            commit('setIndexArticleInfo', {
                pageSize,
                pageNum,
                articles,
                count
            })
        })

    }
}

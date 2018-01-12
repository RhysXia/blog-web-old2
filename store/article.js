export const state = () => ({
  hotArticles: [],
  indexArticleInfo: {
    pageSize: 5,
    pageNum: 0,
    articles: [],
    count: 0
  }
})
export const mutations = {
  setHotArticles (state, articles) {
    state.hotArticles = articles
  }
}
export const actions = {}

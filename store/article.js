export const state = () => ({
  list: {},
  hotArticles: {},
  article: {}
})
export const mutations = {
  setList (state, list) {
    state.list = list
  },
  setHotArticles (state, articles) {
    state.hotArticles = articles
  },
  setArticle (state, article) {
    state.article = article
  }
}
export const actions = {}

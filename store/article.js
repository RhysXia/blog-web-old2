export const state = () => ({
  article: {}
})

export const mutations = {
  setArticle (state, article) {
    state.article = article
  }
}
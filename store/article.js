export const state = () => ({
  hotArticles: []
})

export const mutations = {
  setHotArticles (state, hotArticles) {
    state.hotArticles = hotArticles
  }
}

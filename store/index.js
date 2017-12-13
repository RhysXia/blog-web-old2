export const state = () => ({
  serverURL: 'https://api.ryths.cn',
  token: '',
  hotArticles: [],
  hotTags: []
})

export const mutations = {
  setHotArticles (state, articles) {
    state.hotArticles = articles
  },
  setHotTags (state, tags) {
    state.hotTags = tags
  },
  setToken (state, token) {
    state.token = token
  }
}
export const actions = {
  async nuxtServerInit ({commit}) {
    await this.$api.article.getAll({
      pageNum: 1,
      pageSize: 10,
      sorts: 'likeCount DESC'
    }).then(data => {
      commit('setHotArticles', data.data)
    })
    await this.$api.tag.getAll({
      pageNum: 1,
      pageSize: 10,
      sorts: 'articleCount DESC'
    }).then(data => {
      commit('setHotTags', data.data)
    })
  }
}
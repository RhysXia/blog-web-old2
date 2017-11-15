import ArticleApi from '~/api/article-api'

export const actions = {
  async nuxtServerInit ({commit, state}, {req}) {
    // 初始化热门文章列表
    const hotArticles = state.article.hotArticles
    if (hotArticles.length === 0) {
      await ArticleApi.getArticles(0, 8, 'praiseNum,DESC').then(res => {
        if (res.data.code === 0) {
          commit('article/setHotArticles', res.data.result.data)
        }
      })
    }
  }
}

export const state = () => ({
  showAside: true
})

export const mutations = {
  setShowAside (state, showAside) {
    state.showAside = showAside
  }
}

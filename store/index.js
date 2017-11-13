import ArticleApi from '~/api/article-api'

export const actions = {
  async nuxtServerInit ({commit, state}) {
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

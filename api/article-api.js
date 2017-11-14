import http from './http'

const articleApi = {}

articleApi.getArticles = (page, size, sort = null) => {
  return http.get('/articles', {
    params: {
      page,
      size,
      sort
    }
  })
}

articleApi.getArticleById = id => {
  return http.get(`/articles/${id}`)
}

articleApi.getCommentsByArticleId = (articleId, page, size, sort = null) => {
  return http.get(`/articles/${articleId}/comments`, {
    params: {
      page,
      size,
      sort
    }
  })
}

export default articleApi

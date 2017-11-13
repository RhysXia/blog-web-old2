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

export default articleApi

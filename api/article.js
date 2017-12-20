export default http => {
  const article = {}

  article.getAll = ({pageSize, pageNum, sorts = ''}) => {
    return http.get('/articles', {
      params: {
        pageNum,
        pageSize,
        sorts
      }
    })
  }
  article.count = () => {
    return http.get('/articles/count')
  }

  article.getById = id => {
    return http.get(`/articles/${id}`)
  }
  return article
}

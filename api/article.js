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
  return article
}

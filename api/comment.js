export default http => {
  const comment = {}
  comment.getCountByArticleId = articleId => {
    return http.get(`/comments/articles/${articleId}/count`)
  }

  comment.getAllByArticleId = ({articleId, pageNum, pageSize, sorts = ''}) => {

    return http.get(`/comments/articles/${articleId}`, {
      params: {
        pageNum,
        pageSize,
        sorts
      }
    })
  }

  return comment
}
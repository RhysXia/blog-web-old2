export default http => {
  const comment = {}
  comment.getCountByArticleId = articleId => {
    return http.get(`/articles/${articleId}/comments/count`)
  }

  comment.getAllByArticleId = ({articleId, pageNum, pageSize, sorts = ''}) => {

    return http.get(`/articles/${articleId}/comments`, {
      params: {
        pageNum,
        pageSize,
        sorts
      }
    })
  }
  comment.uploadImage = imageData => {
    return http.post('/comments/image', imageData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return comment
}
export default http => {
  const comment = {}

  comment.getAllByArticleId = ({articleId, page, size, sort = ''}) => {

    return http.get(`/articles/${articleId}/comments`, {
      params: {
        page,
        size,
        sort
      }
    })
  }

  comment.getAllByUserId = ({userId, page, size, sort = ''}) => {

    return http.get(`/users/${userId}/comments`, {
      params: {
        page,
        size,
        sort
      }
    })
  }

  comment.add = ({content, contentType, articleId}) => {
    return http.post(`/articles/${articleId}/comments`, {
      content,
      contentType
    })
  }
  comment.deleteById = id => {
    return http.delete(`/comments/${id}`)
  }

  comment.uploadImage = (imageData) => {
    return http.post(`/comments/images`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return comment
}

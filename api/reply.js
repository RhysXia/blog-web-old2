export default http => {
  const reply = {}

  reply.getAllByArticleId = ({commentId, page, size, sort = ''}) => {

    return http.get(`/comments/${commentId}/replies`, {
      params: {
        page,
        size,
        sort
      }
    })
  }

  reply.add = ({content, contentType, commentId}) => {
    return http.post(`/comments/${commentId}/replies`, {
      content,
      contentType
    })
  }
  reply.deleteById = id => {
    return http.delete(`/replies/${id}`)
  }

  reply.uploadImage = (imageData) => {
    return http.post(`/replies/images`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return reply
}

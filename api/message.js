export default http => {
  const message = {}

  message.getAllComments = ({page, size, sort = ''}) => {
    return http.get('/messages/comments', {
      params: {
        page,
        size,
        sort
      }
    })
  }

  return message
}

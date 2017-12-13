export default http => {
  const tag = {}

  tag.getAll = ({pageSize, pageNum, sorts = ''}) => {
    return http.get('/tags', {
      params: {
        pageNum,
        pageSize,
        sorts
      }
    })
  }

  return tag
}
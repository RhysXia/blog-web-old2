import http from './http'

const tagApi = {}

tagApi.getTags = (page, size, sort) => {
  return http.get('/tags', {
    params: {
      page,
      size,
      sort
    }
  })
}

export default tagApi

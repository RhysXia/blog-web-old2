import axios from 'axios'
import Qs from 'qs'

const API = require.context('~/api', false, /\.js$/)

export default ({req, store}, inject) => {
  const serverURL = store.state.serverURL
  const http = axios.create({
    baseURL: serverURL,
    timeout: 0,
    paramsSerializer: params => {
      return Qs.stringify(params, {arrayFormat: 'repeat'})
    }
  })

  http.interceptors.request.use(config => {
    const token = store.state.token
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  }, (error) => {
    console.error(error)
  })

  http.interceptors.response.use(response => {
    return response
  }, error => {
    if (error.response) {
      error.statusCode = error.response.status
      error.message = error.response.data.message || error.message
    } else {
      error.statusCode = 408
    }
    return Promise.reject(error)
  })

  const api = {}

  API.keys().forEach(item => {
    const key = item.substring(2, item.lastIndexOf('.js'))
    const itemApi = API(item)
    api[key] = itemApi.default(http)
  })
  inject('api', api)
}

import axios from 'axios'

const API = require.context('~/api', false, /\.js$/)
export default ({store}, inject) => {
  const serverURL = store.state.serverURL
  const http = axios.create({
    baseURL: serverURL
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
    if (response.data.code === 0) {
      return response.data
    }
    const err = new Error(response.data.message || '服务器错误')
    err.data = response.data
    throw err
  }, error => {
    let data
    if (error.response && error.response.data) {
      data = error.response.data
      error.message = data.message || '服务器错误'
    } else {
      data = {message: error.message}
    }
    error.data = data
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

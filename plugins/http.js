import axios from 'axios'
const API = require.context('~/api', false, /\.js$/)
export default ({ store }, inject) => {
    const serverURL = store.state.serverURL
    const http = axios.create({
        baseURL: serverURL
    })
    const api = {}

    API.keys().forEach(item => {
        const key = item.substring(2, item.lastIndexOf('.js'))
        const itemApi = API(item)
        api[key] = itemApi.default(http)
    })
    inject('api', api)
}
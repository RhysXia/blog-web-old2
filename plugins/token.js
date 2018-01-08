import {getCookie, removeCookie} from "../utils/cookie";

export default ({store}, inject) => {
    // 从本地存储中尝试获取token
    const token = getCookie('ryths-blog-token')
    console.log(token)
    if (token) {
        // 如果token存在，则放入store中
        return store.dispatch('login', {token}).catch(() => {
            // token如果不正确，删除store和本地存储中的token
            store.commit('setToken', '')
            removeCookie('ryths-blog-token')
        })
    }
}

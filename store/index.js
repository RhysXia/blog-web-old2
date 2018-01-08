import {removeCookie, setCookie} from "../utils/cookie";

export const state = () => ({
    serverURL: 'https://api.ryths.cn',
    token: '',
    user: null,
    isMenuShow: true,
    isAsideShow: true
})

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setUser(state, user) {
        state.user = user
    },
    showMenu(state, flag) {
        state.isMenuShow = flag
    },
    showAside(state, flag) {
        state.isAsideShow = flag
    }
}
export const getters = {
    isLogin(state) {
        return state.user !== null
    }
}
export const actions = {
    async nuxtServerInit({commit}) {
        await this.$api.article.getAll({
            page: 0,
            size: 10,
            sort: 'voteNum,DESC'
        }).then(res => {
            commit('article/setHotArticles', res.data.content)
        }).catch()
        await this.$api.tag.getAll({
            page: 0,
            size: 10,
            sort: 'articleNum,DESC'
        }).then(res => {
            commit('tag/setHotTags', res.data.content)
        }).catch()
    },
    // 登陆，根据用户名密码登陆，或者根据token登陆
    login({commit, state}, {username = null, password = null, token = null, remember = false}) {
        // 如果用户密码存在，则使用用户名密码登陆
        let promise
        if (username && password) {
            promise = this.$api.auth.login({username, password}).then(res => {
                // 登陆成功，保存token到store
                commit('setToken', res.data.id)
                if (remember) {
                    setCookie('ryths-blog-token', res.data, {expires: 30})
                }
                return this.$api.user.getSelf().then(res => {
                    commit('setUser', res.data)
                })
            })
        } else if (token) {
            commit('setToken', token)
            if (remember) {
                setCookie('ryths-blog-token', token, {expires: 30})
            }
            promise = this.$api.user.getSelf().then(res => {
                commit('setUser', res.data)
            })
        } else {
            promise = Promise.reject(new Error('用户名密码不能为空'))
        }
        return promise
    },
    logout({commit, state}) {
        return this.$api.auth.logout().then(data => {
            commit('setToken', '')
            commit('setUser', null)
            removeCookie('ryths-blog-token')
        }).then(data => {
            const webSocket = state.webSocket
            if (webSocket) {
                webSocket.close()
            }
        })
    }
}

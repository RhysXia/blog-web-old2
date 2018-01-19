import { removeCookie, setCookie } from '../utils/cookie'

export const state = () => ({
  serverURL: 'https://api.ryths.cn',
  token: '',
  tokenName: 'rhys-blog-token',
  user: null,
  blog: {}
})

export const mutations = {
  setBlog (state, blog) {
    state.blog = blog
  },
  setToken (state, token) {
    state.token = token
  },
  setUser (state, user) {
    state.user = user
  }
}
export const getters = {
  isLogin (state) {
    return state.user !== null
  }
}
export const actions = {
  async nuxtServerInit ({commit}) {
    try {
      const {data} = await this.$api.blog.getInfo()
      commit('setBlog', data)
    } catch (err) {
      console.error(err)
    }
  },
  // 登陆，根据用户名密码登陆
  async login (
    {commit, state},
    {username, password, remember = false}) {
    let res = await this.$api.auth.login({username, password})
    // 登陆成功，保存token到store
    const token = res.data.id
    commit('setToken', token)
    commit('setUser', res.data.user)
    const config = {
      path: '/'
    }
    if (remember) {
      config.expires = 30
    }
    setCookie(state.tokenName, token, config)
  },
  async logout ({commit, state}) {
    try {
      await this.$api.auth.logout()
    } catch (err) {}
    commit('setToken', '')
    commit('setUser', null)
    removeCookie(state.tokenName)
  }
}

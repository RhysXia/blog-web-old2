import { removeCookie, setCookie } from '../utils/cookie'

export const state = () => ({
  serverURL: 'https://api.ryths.cn',
  token: '',
  tokenName: 'rhys-blog-token',
  loginUser: null,
  blog: {}
})

export const mutations = {
  setBlog (state, blog) {
    state.blog = blog
  },
  setToken (state, token) {
    state.token = token
  },
  setLoginUser (state, user) {
    state.loginUser = user
  }
}
export const getters = {
  isLogin (state) {
    return state.loginUser !== null
  },
  permissions (state) {
    const user = state.loginUser
    if (!user) {
      return []
    }
    const permissions = []
    user.roles.forEach(it => {
      it.permissions.forEach(i => {
        permissions.push(i)
      })
    })
    return permissions.map(it => {
      return `${it.method}:${it.url}`
    })
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
    commit('setLoginUser', res.data.user)
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
    commit('setLoginUser', null)
    removeCookie(state.tokenName)
  }
}

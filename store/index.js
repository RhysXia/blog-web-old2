export const state = () => ({
  serverURL: 'https://api.ryths.cn',
  token: '',
  user: null,
  isMenuShow: true,
  isAsideShow: true,
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
  },
  showMenu (state, flag) {
    state.isMenuShow = flag
  },
  showAside (state, flag) {
    state.isAsideShow = flag
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

      let res = await this.$api.article.getAll({
        page: 0,
        size: 10,
        sort: ['voteNum,DESC', 'commentNum,DESC', 'readNum,DESC']
      })
      commit('article/setHotArticles', res.data.content)
      res = await this.$api.tag.getAll({
        page: 0,
        size: 10,
        sort: 'articleNum,DESC'
      })
      commit('tag/setHotTags', res.data.content)
    } catch (err) {
      console.error(err)
    }
  },
  // 登陆，根据用户名密码登陆，或者根据token登陆
  async login (
    {commit, state},
    {username = null, password = null, token = null, remember = false}) {
    // 如果用户密码存在，则使用用户名密码登陆
    if (username && password) {
      let res = await this.$api.auth.login({username, password})
      // 登陆成功，保存token到store
      commit('setToken', res.data.id)
      commit('setUser', res.data.user)
      if (remember) {
        localStorage.setItem('ryths-blog-token', res.data.id)
      }
    } else if (token) {
      commit('setToken', token)
      if (remember) {
        localStorage.setItem('ryths-blog-token', token)
      }
      let res = await this.$api.user.getSelf()
      commit('setUser', res.data)
    } else {
      return Promise.reject(new Error('用户名密码不能为空'))
    }
  },
  async logout ({commit, state}) {
    await this.$api.auth.logout()
    commit('setToken', '')
    commit('setUser', null)
    localStorage.removeItem('ryths-blog-token')
  }
}

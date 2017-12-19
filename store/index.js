export const state = () => ({
  serverURL: 'https://api.ryths.cn',
  token: '',
  user: null,
  hotArticles: [],
  hotTags: []
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setUser (state, user) {
    state.user = user
  },
  setHotArticles (state, articles) {
    state.hotArticles = articles
  },
  setHotTags (state, tags) {
    state.hotTags = tags
  }
}
export const getters = {
  isLogin (state) {
    return state.user !== null
  }
}
export const actions = {
  async nuxtServerInit ({commit}) {
    await this.$api.article.getAll({
      pageSize: 10,
      pageNum: 1,
      sorts: 'likeCount DESC'
    }).then(data => {
      commit('setHotArticles', data.data)
    })
    await this.$api.tag.getAll({
      pageSize: 10,
      pageNum: 1,
      sorts: 'articleCount DESC'
    }).then(data => {
      commit('setHotTags', data.data)
    })
  },
  // 登陆，根据用户名密码登陆，或者根据token登陆
  login ({commit}, {username = null, password = null, token = null, remember = false}) {
    // 如果用户密码存在，则使用用户名密码登陆
    if (username && password) {
      return this.$api.auth.login({username, password}).then(data => {
        // 登陆成功，保存token到store
        commit('setToken', data.data)
        if (remember) {
          localStorage.setItem('ryths-blog-token', data.data)
        }
        return this.$api.user.getSelf().then(data => {
          commit('setUser', data.data)
        })
      })
    } else if (token) {
      commit('setToken', token)
      if (remember) {
        localStorage.setItem('ryths-blog-token', token)
      }
      return this.$api.user.getSelf().then(data => {
        commit('setUser', data.data)
      })
    }
  },
  logout ({commit}) {
    return this.$api.auth.logout().then(data => {
      commit('setToken', '')
      commit('setUser', null)
      localStorage.removeItem('ryths-blog-token')
    })
  }
}

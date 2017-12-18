export const state = () => ({
  serverURL: 'https://api.ryths.cn',
  token: ''
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  }
}
export const actions = {
  async nuxtServerInit ({commit}) {}
}

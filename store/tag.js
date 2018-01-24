export const state = () => ({
  hotTags: {},
  list: {}
})

export const mutations = {
  setHotTags (state, tags) {
    state.hotTags = tags
  },
  setList (state, list) {
    state.list = list
  }
}
export const getters = {}
export const actions = {}

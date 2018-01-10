export default async ({req, store}, inject) => {
  if (process.server) {
    const token = req.cookies.get('rhys-blog-token')
    if (token) {
      store.commit('setToken', token)
    }
    // 请求用户个人数据
    try {
      const {data} = await store.$api.user.getSelf()
      store.commit('setUser', data)
    } catch (err) {
      console.error(err)
    }
  }
}

export default async ({req, store}, inject) => {
  if (!process.server) {
    return
  }
  // 获取用户存放在cache中的token
  const token = req.cookies.get(store.state.tokenName)
  if (!token) {
    return
  }
  // 设置token
  store.commit('setToken', token)
  // 请求用户个人数据
  try {
    // 请求用户数据
    const {data} = await store.$api.user.getSelf()
    // 设置user
    store.commit('setLoginUser', data)
  } catch (err) {
    console.error(err)
    // token过期，使cookies失效
    req.cookies.set(store.state.tokenName, '', {
      maxAge: -1
    })
    // 删除store中的token
    store.commit('setToken', '')
  }
}

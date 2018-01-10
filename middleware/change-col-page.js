export default ({route, store, redirect}, next) => {
  const MenuPageNames = ['auth-login', 'article-write', 'user-id']
  const name = route.name
  if (!name) {
    next()
    return
  }
  store.commit('showMenu', !isInNames(name, MenuPageNames))
  const AsidePageNames = ['auth-login', 'about', 'article-write', 'user-id']
  store.commit('showAside', !isInNames(name, AsidePageNames))
  next()
}

function isInNames (name, array) {
  for (let item of array) {
    if (name.startsWith(item)) {
      return true
    }
  }
  return false
}
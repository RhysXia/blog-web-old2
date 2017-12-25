export default ({route, store}, next) => {
  const MenuPageNames = ['auth-login', 'article-write']
  const name = route.name
  store.commit('showMenu', !MenuPageNames.includes(name))
  const AsidePageNames = ['auth-login', 'about', 'article-write']
  store.commit('showAside', !AsidePageNames.includes(name))
  next()
}

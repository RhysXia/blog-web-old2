export default ({route, store}, next) => {
  const MenuPageNames = ['auth-login', 'user-write']
  const name = route.name
  store.commit('showMenu', !MenuPageNames.includes(name))
  const AsidePageNames = ['auth-login', 'about', 'user-write']
  store.commit('showAside', !AsidePageNames.includes(name))
  next()
}

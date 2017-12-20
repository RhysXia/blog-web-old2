export default ({route, store}, next) => {
  const MenuPageNames = ['auth-login']
  const name = route.name
  store.commit('showMenu', !MenuPageNames.includes(name))
  const AsidePageNames = ['auth-login', 'about']
  store.commit('showAside', !AsidePageNames.includes(name))
  next()
}

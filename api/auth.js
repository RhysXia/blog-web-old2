export default http => {
  const auth = {}

  auth.login = ({username, password}) => {
    return http.post('/auth/login', {
      username,
      password
    })
  }

  auth.logout = () => {
    return http.get('/auth/logout')
  }

  return auth
}

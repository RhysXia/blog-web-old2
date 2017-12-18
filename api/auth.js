export default http => {
  const auth = {}

  auth.login = ({username, password}) => {
    return http.post('/auth/login', {
      username,
      password
    })
  }

  return auth
}

export default http => {
  const auth = {}

  auth.login = ({username, password}) => {
    return http.post('/tokens', {
      username,
      password
    })
  }

  auth.logout = () => {
    return http.delete('/tokens')
  }

  return auth
}

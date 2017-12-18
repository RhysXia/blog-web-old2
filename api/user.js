export default http => {
  const user = {}

  user.getSelf = () => {
    return http.get('/users/self')
  }

  return user
}

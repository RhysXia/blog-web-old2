export default http => {
  const user = {}

  user.getSelf = () => {
    return http.get('/users/self')
  }

  user.getById = (id) => {
    return http.get(`/users/${id}`)
  }

  user.updateBase = user => {
    return http.put('/users/base', user)
  }

  user.updatePassword = ({password, newPassword}) => {
    return http.put('/users/password', {password, newPassword})
  }

  return user
}

export default http => {
    const user = {}

    user.getSelf = () => {
        return http.get('/users/self')
    }

    user.getById = (id) => {
        return http.get(`/users/${id}`)
    }

    return user
}

export default http => {
    const blog = {}

    blog.getInfo = () => {
        return http.get('/blog')
    }

    return blog
}

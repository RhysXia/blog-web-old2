export default http => {
    const category = {}
    category.getAllByUserId = ({userId, page, size, sort = ''}) => {
        return http.get('/categories', {
            params: {
                page,
                size,
                sort,
                userId
            }
        })
    }

    category.getById = (id) => {
        return http.get(`/categories/${id}`)
    }

    category.add = ({name, description, weight}) => {
        return http.post('/categories', {
            name, description, weight
        })
    }

    return category
}

export default http => {
    const category = {}
    category.getAllByUserId = ({userId, pageSize, pageNum, sorts = ''}) => {
        return http.get(`/users/${userId}/categories`, {
            params: {
                pageNum,
                pageSize,
                sorts
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

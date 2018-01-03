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

    category.add = ({name, description, weight}) => {
        return http.post('/categories', {
            name, description, weight
        })
    }

    return category
}

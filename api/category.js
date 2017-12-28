export default http => {
    const category = {}
    category.getAllBySelf = ({pageSize, pageNum, sorts = ''}) => {
        return http.get(`/categories/self`, {
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

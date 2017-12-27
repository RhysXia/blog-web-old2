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


    return category
}

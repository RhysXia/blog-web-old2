export default http => {
    const tag = {}

    tag.getAll = ({pageSize, pageNum, sorts = '', name = null}) => {
        return http.get('/tags', {
            params: {
                pageNum,
                pageSize,
                sorts,
                name
            }
        })
    }

    tag.add = ({name}) => {
        return http.post('/tags', {
            name
        })
    }
    return tag
}
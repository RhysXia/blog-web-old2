export default http => {
    const tag = {}

    tag.getAll = ({page, size, sort = '', name = null}) => {
        return http.get('/tags', {
            params: {
                page,
                size,
                sort,
                name
            }
        })
    }

    tag.add = ({name}) => {
        return http.post('/tags', {
            name
        })
    }

    tag.getById = id => {
        return http.get(`/tags/${id}`)
    }
    return tag
}
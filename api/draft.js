export default http => {
    const draft = {}
    draft.add = ({title, info = null, poster = null, categoryId = null, content = null, contentType = null, tagIds = null}) => {
        return http.post('/drafts', {
            title,
            info,
            poster,
            categoryId,
            content,
            contentType,
            tagIds
        })
    }

    draft.update = ({id, title, info = null, poster = null, categoryId = null, content = null, contentType = null, tagIds = null}) => {
        return http.put(`/drafts/${id}`, {
            title,
            info,
            poster,
            categoryId,
            content,
            contentType,
            tagIds
        })
    }

    draft.deleteById = id => {
        return http.delete(`/drafts/${id}`)
    }

    draft.getSelf = ({page, size, sort = ''}) => {
        return http.get('/drafts/self', {
            params: {
                page,
                size,
                sort
            }
        })
    }
    draft.getById = id => {
        return http.get(`/drafts/${id}`)
    }
    return draft
}

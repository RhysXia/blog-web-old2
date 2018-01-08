export default http => {
    const comment = {}

    comment.getAllByArticleId = ({articleId, page, size, sort = ''}) => {

        return http.get(`/articles/${articleId}/comments`, {
            params: {
                page,
                size,
                sort
            }
        })
    }

    comment.add = ({content, contentType, articleId}) => {
        return http.post(`/articles/${articleId}/comments`, {
            content,
            contentType
        })
    }
    comment.deleteById = id => {
        return http.delete(`/comments/${id}`)
    }

    return comment
}

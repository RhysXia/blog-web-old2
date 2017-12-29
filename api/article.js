export default http => {
    const article = {}

    article.getAll = ({pageSize, pageNum, sorts = ''}) => {
        return http.get('/articles', {
            params: {
                pageNum,
                pageSize,
                sorts
            }
        })
    }
    article.count = () => {
        return http.get('/articles/count')
    }

    article.getById = id => {
        return http.get(`/articles/${id}`)
    }

    article.isVoted = articleId => {
        return http.get(`/articles/${articleId}/isVote`)
    }

    article.addVote = articleId => {
        return http.post(`/articles/${articleId}/votes`)
    }
    article.deleteVote = articleId => {
        return http.delete(`/articles/${articleId}/votes`)
    }

    article.uploadImage = imageData => {
        return http.post('/articles/image', imageData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    article.add = ({title, info, poster, categoryId, content, contentType, tagIds}) => {
        return http.post('/articles', {
            title,
            info,
            poster,
            categoryId,
            content,
            contentType,
            tagIds
        })
    }
    return article
}

<template lang="pug">
    .article-id-container
        .article-wrapper
            .header
                h1.title {{article.title}}
                .info
                    span
                        i.fa.fa-clock-o
                        | 创建{{article.createAt | formatDate}};
                        | 更新{{article.updateAt | formatDate}}
                    .right
                        button.btn.link(@click="fullPageClick")
                            i.fa(:class="fullPage?'fa-compress':'fa-arrows-alt'")
                            | 全屏阅读
                        button.btn.link(@click="partFullPageClick")
                            i.fa(:class="partFullPage?'fa-compress':'fa-expand'")
                            | 通栏阅读
                .info
                    span
                        i.fa.fa-eye
                        | {{article.readNum}}
                    span
                        i.fa.fa-heart
                        | {{article.voteNum}}
                    span
                        i.fa.fa-user
                        nuxt-link(:to="'/user/'+article.author.id") {{article.author.nickname}}
                    span
                        i.fa.fa-tag
                        template(v-for="(tag,index) in article.tags")
                            nuxt-link.tag(:to="'/tag/'+tag.id") {{tag.name}}
                    span
                        i.fa.fa-list
                        nuxt-link(:to="'/category/'+article.category.id") {{article.category.name}}
            .body
                c-show-more(:hiddenHeight="500")
                    .content(v-html="content")
            no-ssr
                .footer
                    button.btn.link(v-if="isLogin",@click="voteClick")
                        i.fa.fa-hand-pointer-o
                        | {{isVoted?'取消点赞':'点赞一下'}}
                    nuxt-link(v-if="isSelf",:to="{path:'/article/write',query:{articleId:article.id}}") 修改
        .comment-wrapper
            .header
                no-ssr
                    h2.title {{isLogin?'评论列表':'评论列表(登陆后可评论)'}}
                span.info(v-if="count")
                    | 共
                    b {{count}}
                    | 条评论
            .body
                no-ssr
                    .write(v-if="isLogin")
                        .left
                            c-avatar(:imgUrl="user.avatar")
                        .right
                            c-editor(:textHeight="150",barPosition="bottom",v-model="commentContent",:imageUpload="commentImageUpload")
                                button.submit(slot="button",@click="commentSubmit") 提交
                template(v-if="!count")
                    .no-content 好可怜，都没人理我~
                template(v-else)
                    c-comment-list(:comments="comments",:total="count",:pageSize="size",@pageChange="pageChange")
</template>
<script>
    import markdown from '~/utils/markdown'
    import CCommentList from '~/components/comment/list'
    import CAvatar from '~/components/common/avatar'
    import CEditor from '~/components/common/editor'
    import CShowMore from '~/components/common/show-more'

    export default {
        validate({params}) {
            return /^\d+$/.test(params.id)
        },
        head() {
            return {
                title: this.article.title
            }
        },
        data() {
            return {
                commentContent: '',
                isVoted: false
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            isLogin() {
                return this.$store.getters.isLogin
            },
            fullPage() {
                const isMenuShow = this.$store.state.isMenuShow
                const isAsideShow = this.$store.state.isAsideShow
                return !isMenuShow && !isAsideShow
            },
            partFullPage() {
                const isMenuShow = this.$store.state.isMenuShow
                const isAsideShow = this.$store.state.isAsideShow
                return isMenuShow && !isAsideShow
            },
            content() {
                const content = this.article.content
                if (this.article.contentType === 'MARKDOWN') {
                    return markdown(content)
                } else {
                    return content
                }
            },
            isSelf() {
                const loginUser = this.$store.state.user
                const user = this.user
                if (loginUser && loginUser.id) {
                    if (user.id === loginUser.id) {
                        return true
                    }
                }
                return false
            }
        },
        methods: {
            pageChange(val) {
                this.$api.comment.getAllByArticleId({
                    articleId: this.article.id,
                    page: val - 1,
                    size: this.size,
                    sort: 'floorNum,DESC'
                }).then(res => {
                    this.comments = res.data.content
                    this.count = res.data.totalElements
                })
            },
            voteClick() {
                const id = this.article.id
                const isVoted = this.article.voted
                if (isVoted) {
                    this.$api.article.deleteVote(id).then(data => {
                        this.article.voted = false
                        this.article.voteNum--
                    })
                } else {
                    this.$api.article.addVote(id).then(data => {
                        this.article.voted = true
                        this.article.voteNum++
                    })
                }
            },
            itemDelete(index) {
                const articleId = this.article.id
                this.$api.comment.deleteById(this.comments[index].id).then(res => {
                    if (!this.hasMore) {
                        this.comments = this.comments.splice(index, 1)
                        return
                    }
                    const start = this.page * this.size
                    this.comments.splice(start, this.size)
                    this.$api.comment.getAllByArticleId({
                        articleId: id,
                        page: this.page,
                        size: this.size,
                        sort: 'floorNum,DESC'
                    }).then(res => {
                        this.comments = res.data.content
                        result.count = res.data.totalElements
                        result.last = res.data.last
                    })
                }).then(() => {
                    this.$message({
                        content: '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                }).catch(() => {
                    this.$message({
                        content: '删除失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            },
            commentSubmit() {
                const articleId = this.article.id
                const content = this.commentContent
                if (!content) {
                    this.$message({
                        type: 'error',
                        duration: 2000,
                        content: '内容不能为空'
                    })
                    return
                }
                return this.$api.comment.add({
                    content,
                    contentType: 'MARKDOWN',
                    articleId
                }).then(data => {
                    this.$message({
                        type: 'success',
                        duration: 2000,
                        content: '评论成功'
                    })
                    this.commentContent = ''
                    this.pageNum = 1
                    return this.$api.comment.getAllByArticleId({
                        articleId,
                        pageSize: this.pageSize,
                        pageNum: this.pageNum,
                        sorts: 'floorNum DESC'
                    }).then(data => {
                        this.comments = data.data
                        return this.$api.comment.getCountByArticleId(articleId).then(data => {
                            this.commentCount = data.data
                        })
                    }).catch((err) => {
                        this.$message({
                            type: 'error',
                            duration: 2000,
                            content: err.message
                        })
                    })
                })
            },
            commentImageUpload(files) {
                return new Promise((resolve, reject) => {
                    if (files.length === 0) {
                        return reject(new Error('没有选择文件'))
                    }
                    const formDate = new FormData()
                    formDate.append('image', files[0])
                    this.$api.comment.uploadImage(formDate).then(data => {
                        return resolve(data.data)
                    })
                })
            },
            fullPageClick() {
                const flag = this.fullPage
                this.$store.commit('showMenu', flag)
                this.$store.commit('showAside', flag)
            },
            partFullPageClick() {
                const flag = this.partFullPage
                this.$store.commit('showMenu', true)
                this.$store.commit('showAside', flag)
            }
        },
        async asyncData({params, store, error}) {
            const id = Number(params.id)

            const result = {
                article: {},
                comments: [],
                page: 0,
                size: 5,
                count: 0
            }

            await store.$api.article.getById(id).then(res => {
                result.article = res.data
            }).catch(err => {
                const res = err.response
                if (res) {
                    const statusCode = res.status
                    error({statusCode, message: res.data.message})
                }
            })
            await store.$api.comment.getAllByArticleId({
                articleId: id,
                page: result.page,
                size: result.size,
                sort: 'floorNum,DESC'
            }).then(res => {
                result.comments = res.data.content
                result.count = res.data.totalElements
            })
            return result
        },
        components: {
            CCommentList,
            CAvatar,
            CEditor,
            CShowMore
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .article-id-container {
        > * {
            margin-bottom: 1rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .article-wrapper {
            background-color: $color-background;
            padding: 1rem;
            border-radius: 5px;
            .header {
                padding-bottom: 1rem;
                border-bottom: 1px solid $color-border-base;
                .title {
                    text-align: center;
                    margin: 0.5rem 0 0.6rem 0;
                }
                .action {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                .info {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    margin-top: 0.5rem;
                    span {
                        margin-left: 0.5rem;
                        i {
                            padding-right: 0.25rem;
                        }
                    }
                    .tag {
                        margin-right: 0.2rem;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                    .right {
                        display: flex;
                        flex: 1 1 auto;
                        justify-content: flex-end;
                        align-items: center;
                    }

                }
            }
            .body {
            }
            .footer {
                border-top: 1px solid $color-border-base;
                padding-top: 1rem;
            }
        }
        .btn {
            padding: 0.3rem 0.5rem;
            i {
                padding-right: 0.25rem;
            }
            &:hover {
                background-color: $color-background-active;
            }
        }
        .comment-wrapper {
            .header {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                background-color: $color-background;
                border-radius: 5px;
                .title {
                    font-size: 1.2rem;
                    margin: 0;
                    padding: 0.5rem;
                }
            }
            .body {
                margin-top: 1rem;
                font-size: 1rem;
                > * {
                    margin-bottom: 0.9rem;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
                .write {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    background-color: $color-background;
                    padding: 0.7rem;
                    .left {
                        margin-right: 0.5rem;
                    }
                    .right {
                        width: 100%;
                        font-size: 0.8rem;
                        .submit {
                            height: 100%;
                            padding: 0.5em 1em;
                            background-color: $color-primary;
                            color: $color-text-white;
                            float: right;
                            border-radius: 0;
                            &:hover {
                                background-color: $color-primary-active;
                            }
                        }
                    }
                }
                .no-content {
                    height: 80px;
                    text-align: center;
                    line-height: 80px;
                    font-weight: bold;
                    background-color: $color-background;

                }

            }
        }
    }


</style>

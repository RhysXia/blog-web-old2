<template lang="pug">
    c-row.user-self-container(:gutter="10")
        c-col(:span="4")
            .avatar-wrapper
                c-avatar(:imgUrl="user.avatar",type="square",width="100%",height="100%")
            h2.nickname
                | {{user.nickname}}
            p.info {{user.info}}
            .email
                i.fa.fa-envelope
                a(:href="'mailto:'+user.email") {{user.email}}
        c-col(:span="20")
            .tabs
                nuxt-link.tab(:to="'/user/'+user.id") 总概
                nuxt-link.tab(:to="'/user/'+user.id+'/article'") 文章
            nuxt-child
</template>
<script>
    import CAvatar from '~/components/common/avatar'

    export default {
        head() {
            return {
                title: `${this.user.nickname}的主页`
            }
        },
        async asyncData({params, error, store}) {
            const id = params.id
            const result = {
                user: {}
            }
            await store.$api.user.getById(id).then(data => {
                result.user = data.data
            }).catch(err => {
                error({statusCode: 500, message: err.message})
            })
            return result
        },
        computed: {
            isSelf() {
                const loginUser = this.$store.state.user
                const user = this.user
                if (loginUser && loginUser.id) {
                    if (user.id === loginUser.id) {
                        return true
                    }
                }
                return false
            },
        },
        components: {
            CAvatar
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .user-self-container {
        background-color: $color-background;
        padding: 0.5rem;
        .avatar-wrapper {
            position: relative;
            width: 100%;
            padding-bottom: 100%;
            .c-avatar-container {
                position: absolute;
            }
        }
        .nickname {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.6rem;
        }
        .info {
            display: block;
            color: $color-text-light;
            border-bottom: 1px solid $color-border-base;
            padding-bottom: 0.5rem;
        }
        .email {
            i {
                margin-right: 0.5rem;
                color: $color-text-light;
            }
        }
        .tabs {
            border-bottom: 1px solid $color-border-base;
            box-sizing: border-box;
            .tab {
                display: inline-block;
                padding: 0.8rem 1.5rem;
                color: $color-text;
                position: relative;
                font-weight: bold;
                &:after {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 2px;
                    content: '';
                }
                &.nuxt-link-exact-active {
                    &:after {
                        background-color: $color-primary;
                    }
                }
            }
        }

    }
</style>
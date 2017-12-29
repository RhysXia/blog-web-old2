<template lang="pug">
    no-ssr
        c-row.user-self-container(:gutter="10",v-if="isLogin")
            c-col(:span="4")
                .avatar-wrapper
                    c-avatar(:imgSrc="user.avatar",type="square",width="100%",height="100%")
                h2.nickname
                    | {{user.nickname}}
                p.info {{user.info}}
                .email
                    i.fa.fa-envelope
                    a(:href="'mailto:'+user.email") {{user.email}}
            c-col(:span="20")
                .tabs
                    nuxt-link.tab(to="/user/self/info") 总概
                    nuxt-link.tab(to="/user/self/article") 文章
                nuxt-child
</template>
<script>
    import CAvatar from '~/components/common/avatar'

    export default {
        head() {
            return {
                title: '个人主页'
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            isLogin() {
                return this.$store.getters.isLogin
            }
        },
        beforeMount() {
            // 没有登录则转到错误界面
            if (!this.isLogin) {
                this.$nuxt.error({statusCode: 403, message: '请登陆后重试'})
            }
        },
        mounted() {
            this.$router.push('/user/self/info')
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
                &.nuxt-link-active {
                    &:after {
                        background-color: $color-primary;
                    }
                }
            }
        }

    }
</style>
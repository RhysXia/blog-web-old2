<template lang="pug">
    c-row.c-header-container
        c-col(:span="20",:offset="2")
            c-row(type="flex",align="middle",justify="space-between")
                c-col
                    nuxt-link(to="/")
                        h1.logo Rhys Blog
                c-col
                    // 客户端渲染，否则在登录状态下，客户端和服务端渲染不匹配
                    // TODO 不是太明白
                    no-ssr
                        .action(v-if="!isLogin")
                            nuxt-link(to="/auth/login") 登录
                            nuxt-link(to="/auth/register") 注册
                        .action(v-else)
                            c-dropdown
                                c-badge(:value="count")
                                    i.fa.fa-bell
                                c-dropdown-menu(slot="list")
                                    c-dropdown-item
                            c-dropdown
                                c-avatar(height="45px",width="45px",:imgUrl="user.avatar")
                                c-dropdown-menu(slot="list")
                                    c-dropdown-item
                                        nuxt-link.dropdown-item(:to="'/user/'+user.id") 个人中心
                                    c-dropdown-item
                                        nuxt-link.dropdown-item(to="/article/write") 写文章

                            button.btn(@click="logout") 注销
</template>
<script>
    import {CDropdown, CDropdownItem, CDropdownMenu} from '~/components/common/dropdown'
    import CAvatar from '~/components/common/avatar'
    import CBadge from '~/components/common/badge'

    export default {
        name: 'header',
        data() {
            return {
                comments: [],
                count: 0
            }
        },
        computed: {
            isLogin() {
                return this.$store.getters.isLogin
            },
            user() {
                return this.$store.state.user
            }
        },
        watch: {
            isLogin(val) {
                if (val) {
                    this.initComments()
                }
            }
        },
        methods: {
            initComments() {
                this.$api.comment.getCountNotRead().then(data => {
                    this.count = data.data
                })
                this.$api.comment.getAllNotRead({
                    pageNum: 1,
                    pageSize: 10
                }).then(data => {
                    this.comments = data.data
                })
            },
            logout() {
                this.$store.dispatch('logout').then(() => {
                    this.$router.push('/')
                }).catch(err => {
                })
            }
        },
        mounted() {
            if (this.isLogin) {
                this.initComments()
            }
        },
        components: {
            CDropdown,
            CDropdownItem,
            CDropdownMenu,
            CAvatar,
            CBadge
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-header-container {
        background-color: $color-background;
        height: $height-header;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
        .logo {
            font-size: 1.4rem;
            color: $color-primary;
        }
        .action {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-right: -1rem;
            a {
                padding-right: 1rem;
            }
            .btn {
                background-color: transparent;
                color: $color-primary;
                &:hover {
                    color: color-active($color-primary);
                }
            }
            .dropdown-item {
                display: block;
                padding: 0.5rem 1rem;
                &:hover {
                    background-color: rgba(200, 200, 200, 0.5);
                }
            }
        }
    }
</style>

<template lang="pug">
    header.c-header-container.shadow
        .c-wrapper
            .c-left
                nuxt-link(to="/")
                    h1.c-logo {{blog.name}}
                nuxt-link.menu(to="/") 首页
                nuxt-link.menu(to="/about") 关于
            .c-right
                //c-input(placeholder="搜索")
                template(v-if="!isLogin")
                    nuxt-link(to="/auth/login") 登录
                    nuxt-link(to="/auth/register") 注册
                template(v-else)
                    c-dropdown
                        c-avatar(height="45px",width="45px",:imgUrl="user.avatar")
                        c-dropdown-menu(slot="list")
                            c-dropdown-item
                                nuxt-link.c-dropdown-item(:to="'/user/'+user.id") 个人中心
                            c-dropdown-item(v-if="isWrite")
                                nuxt-link.c-dropdown-item(to="/article/write") 写文章
                            c-dropdown-item
                                nuxt-link.c-dropdown-item(to="/user/setting") 设置
                            c-dropdown-item
                                button.c-dropdown-item.link(@click="logout")  注销
</template>
<script>
  import {
    CDropdown, CDropdownItem,
    CDropdownMenu
  } from '~/components/common/dropdown'
  import CAvatar from '~/components/common/avatar'
  import CBadge from '~/components/common/badge'
  import CInput from '~/components/common/input'

  export default {
    name: 'c-header',
    data () {
      return {}
    },
    computed: {
      isLogin () {
        return this.$store.getters.isLogin
      },
      user () {
        return this.$store.state.user
      },
      blog () {
        return this.$store.state.blog
      },
      isWrite () {
        return this.$store.getters.permissions.includes('POST:/articles')
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/')
        }).catch(() => {})
      }
    },
    components: {
      CDropdown,
      CDropdownItem,
      CDropdownMenu,
      CAvatar,
      CBadge,
      CInput
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-header-container {
        background-color: $color-background;
    }

    .c-wrapper, .c-left, .c-right {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .c-wrapper {
        height: $height-header;
        justify-content: space-between;
        width: $width-main;
        margin: 0 auto;
    }

    .c-logo {
        font-size: 1.5em;
    }

    .c-dropdown-item {
        display: block;
        padding: 0.5em 0.7em;
        &:hover {
            background-color: $color-background-active;
        }
    }

    .link {
        width: 100%;
        text-align: left;
    }

    .c-right, .c-left {
        margin-right: -0.5em;
        > * {
            margin-right: 0.5em;
        }
    }

    .menu {
        display: inline-block;
        padding: 0 0.5em;
        color: $color-text;
        &:hover, &.nuxt-link-exact-active {
            color: $color-primary;
        }
    }
</style>

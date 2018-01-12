<template lang="pug">
    .c-header-container
        .content-wrapper
            c-row(type="flex",align="middle",justify="space-between")
                c-col
                    nuxt-link(to="/")
                        h1.logo {{blog.name}}
                c-col
                    .action(v-if="!isLogin")
                        nuxt-link.login(to="/auth/login") 登录
                        //nuxt-link(to="/auth/register") 注册
                    .action(v-else)
                        c-dropdown.dropdown
                            c-avatar(height="45px",width="45px",:imgUrl="user.avatar")
                            c-dropdown-menu(slot="list")
                                c-dropdown-item
                                    nuxt-link.dropdown-item(:to="'/user/'+user.id") 个人中心
                                c-dropdown-item
                                    nuxt-link.dropdown-item(to="/article/write") 写文章
                                c-dropdown-item
                                    nuxt-link.dropdown-item(to="/user/setting") 设置
                                c-dropdown-item
                                    button.dropdown-item(@click="logout") 注销
</template>
<script>
  import {
    CDropdown, CDropdownItem,
    CDropdownMenu
  } from '~/components/common/dropdown'
  import CAvatar from '~/components/common/avatar'
  import CBadge from '~/components/common/badge'

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
        .content-wrapper{
            margin: 0 auto;
            width: $content-width;
        }
        .logo {
            font-size: 1.4rem;
            color: $color-primary;
        }
        .action {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-right: -1rem;
            .login{
                padding-right: 1rem;
            }
            .dropdown{
                margin-right: 1rem;
            }
            .dropdown-item {
                display: block;
                width: 100%;
                box-sizing: border-box;
                padding: 0.5rem 1.5rem;
                background-color: transparent;
                color: $color-primary;
                text-align: left;
                &:hover {
                    background-color: $color-background-active;
                    color: color-active($color-primary);
                }
            }
        }
    }
</style>

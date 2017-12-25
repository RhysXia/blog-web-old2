<template lang="pug">
    c-row.c-header-container(type="flex",align="middle",justify="center")
        c-col(:span="20")
            c-row(type="flex",align="middle",justify="space-between")
                c-col
                    nuxt-link(to="/")
                        h1.logo Ryths Blog
                c-col
                    .action(v-if="!isLogin")
                        nuxt-link(to="/auth/login") 登录
                        nuxt-link(to="/auth/register") 注册
                    .action(v-else)
                        c-dropdown
                            c-avatar(height="45px",width="45px",:imgUrl="user.avatar")
                            c-dropdown-menu(slot="list")
                                c-dropdown-item
                                    nuxt-link(to="/user/self") 个人中心
                                c-dropdown-item
                                    nuxt-link(to="/user/write") 写文章

                        button.btn(@click="logout") 注销
</template>
<script>
  import { CDropdown, CDropdownItem, CDropdownMenu } from '~/components/common/dropdown'
  import CAvatar from '~/components/common/avatar'

  export default {
    name: 'header',
    computed: {
      isLogin () {
        return this.$store.getters.isLogin
      },
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/')
        }).catch(err => {})
      }
    },
    components: {
      CDropdown,
      CDropdownItem,
      CDropdownMenu,
      CAvatar
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    $height-header: 55px;
    .c-header-container {
        background-color: $color-background;
        height: $height-header;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
        position: sticky;
        top: 0;
        z-index: 1000;
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
        }
    }
</style>

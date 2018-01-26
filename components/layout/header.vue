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
                    c-dropdown(v-if="messages.totalElements>0",position="left")
                        c-badge(:value="messages.totalElements")
                            i.fa.fa-comments
                        c-dropdown-menu(slot="list")
                            c-dropdown-item(v-for="message in messages.content",:key="message.id")
                                .message-wrapper
                                    span.message
                                        router-link(:to="'/user/'+message.user.id") {{message.user.nickname}}
                                        | 在
                                        router-link(:to="'/article/'+message.article.id") {{message.article.title}}
                                        | 评论了你
                                    router-link.message-watch(:to="'/message/comment'+'?commentId='+message.comment.id") 查看
                    c-dropdown
                        c-avatar(height="45px",width="45px",:imgUrl="loginUser.avatar")
                        c-dropdown-menu(slot="list")
                            c-dropdown-item
                                nuxt-link.c-dropdown-item(:to="'/user/'+loginUser.id") 个人中心
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
  import CInput from '~/components/common/input'
  import CBadge from '~/components/common/badge'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'c-header',
    data () {
      return {
        messages: {},
        timer: null
      }
    },
    computed: {
      ...mapState(['loginUser', 'blog']),
      ...mapGetters(['isLogin']),
      isWrite () {
        return this.$store.getters.permissions.includes('POST:/articles')
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/')
        }).catch(() => {})
      },
      async getMessages () {
        try {
          if (this.isLogin) {
            let res = await this.$api.message.getAllComments({
              page: 0,
              size: 5,
              sort: ['createAt,DESC']
            })
            this.messages = res.data
          }
        } catch (err) {
          this.$message({
            content: err.message,
            duration: 2000,
            type: 'error'
          })
        }
      }
    },
    mounted () {
      const delay = 1000 * 60 * 1
      // this.timer = setInterval(this.getMessages, delay)
      this.getMessages()
    },
    components: {
      CDropdown,
      CDropdownItem,
      CDropdownMenu,
      CAvatar,
      CInput,
      CBadge
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-header-container {
        background-color: $color-background;
    }

    .fa-comments {
        font-size: 2em;
        color: $color-text-light;
    }

    .message-wrapper {
        width: 18em;
        border-bottom: 1px solid $color-border-base;
        padding: 1em;
        .message{
            height: 3em;
            display: inline-block;
            width: 15em;
        }
        .message-watch{
            height: 3em;
            width: 3em;
            display: inline-block;
        }
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
        border: none;
    }

    .c-left {
        margin-right: -0.5em;
        > * {
            margin-right: 0.5em;
        }
    }

    .c-right {
        margin-right: -2em;
        > * {
            margin-right: 2em;
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

<template lang="pug">
    header.c-header
        .c-header--wrapper
            .c-header--left
                nuxt-link(to="/")
                    h1.c-header__logo {{blog.name}}
                nuxt-link.c-header__menu(to="/") 首页
                nuxt-link.c-header__menu(to="/about") 关于
            .c-header--right
                .c-header__search(:class="inputClasses",@keyup.enter="searchHandler")
                    c-input(v-model="searchContent",placeholder="搜索",@focus="inputFocus",@blur="inputBlur")
                        span(slot="append") 搜索
                template(v-if="!isLogin")
                    nuxt-link.c-header__menu(to="/auth/login") 登录
                    nuxt-link.c-header__menu(to="/auth/register") 注册
                template(v-else)
                    c-dropdown(v-if="messages.totalElements>0")
                        c-badge(:value="messages.totalElements")
                            i.fa.fa-comments
                        c-dropdown-menu(slot="list",maxHeight="10em")
                            c-dropdown-item(v-for="message in messages.content",:key="message.id")
                                .c-header__message--wrapper
                                    span.c-header__message
                                        router-link(:to="'/user/'+message.user.id") {{message.user.nickname}}
                                        | 在
                                        router-link(:to="'/article/'+message.article.id") {{message.article.title}}
                                        | 评论了你
                                    router-link.c-header__message__btn(:to="'/message/comment'+'?commentId='+message.comment.id") 查看
                    c-dropdown
                        c-avatar(:src="loginUser.avatar",shape="square") {{loginUser.nickname}}
                        c-dropdown-menu(slot="list")
                            c-dropdown-item(@click="$router.push('/user/'+loginUser.id)") 个人中心
                            c-dropdown-item(v-if="isWrite",@click="$router.push('/article/write')") 写文章
                            c-dropdown-item(@click="$router.push('/user/setting')") 设置
                            c-dropdown-item(@click="logout") 注销
</template>
<script>
  import { CDropdown, CDropdownItem, CDropdownMenu } from '~/components/common/dropdown'
  import CAvatar from '~/components/common/avatar'
  import CInput from '~/components/common/input'
  import CBadge from '~/components/common/badge'
  import CButton from '~/components/common/button'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'c-header',
    data () {
      return {
        messages: {},
        timer: null,
        isInputFocused: false,
        searchContent: ''
      }
    },
    computed: {
      ...mapState(['loginUser', 'blog']),
      ...mapGetters(['isLogin']),
      isWrite () {
        return this.$store.getters.permissions.includes('POST:/articles')
      },
      inputClasses () {
        return {
          'c-header__search--focus': this.isInputFocused
        }
      }
    },
    methods: {
      searchHandler () {
        console.log(this.searchContent)
      },
      inputFocus () {
        this.isInputFocused = true
      },
      inputBlur () {
        this.isInputFocused = false
      },
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
      CBadge,
      CButton
    }
  }
</script>
<style lang="scss">
    @import "~assets/scss/application";

    .c-header {
        position: sticky;
        z-index: 1;
        top: 0;
        background-color: $bg-color;
        .c-header--wrapper {
            width: $main-width;
            height: $header-height;
            margin: 0 auto auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .c-header--left,
        .c-header--right {
            display: flex;
            align-items: center;
        }
        .c-header__logo {
            padding: 0;
            font-size: 1.8em;
            margin: 0 1em 0 0;
        }
        .c-header__menu {
            display: inline-block;
            font-size: 1em;
            margin-right: 0.5em;
            color: $text-color;
            padding: 0.5em;
            &:hover {
                color: $link-color;
            }
            &.nuxt-link-exact-active {
                color: $link-color;
            }
        }
        .c-header__search {
            transition: width 0.4s ease-in-out;
            width: 10em;
            .c-input__append {
                cursor: pointer;
                transition: 0.4s ease-in-out;
                &:hover {
                    color: $link-color--hover;
                }
            }
            &.c-header__search--focus {
                width: 20em;
                .c-input__append {
                    background-color: $primary-color;
                    border-color: $primary-color;
                    color: $bg-color;
                    &:hover {
                        background-color: darken($primary-color, 10%);
                    }
                }
            }
        }
        .c-dropdown {
            margin-left: 2em;
            .fa-comments {
                font-size: 2em;
                color: $info-color;
            }
        }
        .c-header__message--wrapper {
            width: 20em;
            padding: 0.5em;
            color: $text-color;
            &:hover {
                color: $text-color;
            }
            .c-header__message {
                white-space: nowrap;
                margin-right: 3em;
            }
            .c-header__message__btn {
                float: right;
                width: 3em;
            }
        }

    }
</style>

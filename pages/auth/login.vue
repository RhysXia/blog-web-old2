<template lang="pug">
    .auth-login
        h2.title 欢迎登陆
        .form
            .input-wrapper
                span.label 用户名
                c-input(v-focus,type="text",v-model="user.username",placeholder="请输入用户名")
            .input-wrapper(v-focus)
                span.label 密码
                c-input(type="password",v-model="user.password",placeholder="请输入密码")
            c-checkbox(v-model="user.emember",label="记住我")
            c-button(type="primary",long,@click="submit") 登陆

</template>

<script>
  import focus from '~/utils/directive/focus'
  import CInput from '~/components/common/input'
  import CButton from '~/components/common/button'
  import { CCheckbox } from '~/components/common/checkbox'

  export default {
    directives: {
      focus
    },
    data () {
      return {
        user: {
          username: '',
          password: '',
          emember: false
        }
      }
    },
    methods: {
      async submit () {
        try {
          await this.$store.dispatch('login', this.user)
          // 获取跳转来的路径
          const from = this.$route.meta.from
          // 如果来的路径不是当前路径和注册页面，则跳转回去，否则跳转到首页
          if (from !== this.$route.fullPath && from !== '/auth/register') {
            this.$router.push(from)
          } else {
            this.$router.push('/')
          }
        } catch (err) {
          this.$message({
            content: err.message,
            type: 'error',
            duration: 2000
          })
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      // 获取from的路径
      const path = from.fullPath
      // 将跳转来的路径记录下来
      to.meta.from = path
      next()
    },
    components: {
      CInput,
      CCheckbox,
      CButton
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/application";

    .auth-login {
        height: 100%;
        background-color: $bg-color;
        width: 40%;
        padding: 1em;
        margin: 15% auto auto;
        .title {
            text-align: center;
            color: $primary-color;
            margin-bottom: 2em;
        }
        .form {
            > * {
                margin-bottom: 1em;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            .input-wrapper {
                .label {
                    font-weight: bold;
                }
            }
        }
    }
</style>

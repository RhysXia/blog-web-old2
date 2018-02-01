<template lang="pug">
    .auth-register
        h2.title 欢迎注册
        .form
            .input-wrapper
                span.label 用户名
                c-input(v-focus,type="text",v-model="user.username",placeholder="请输入用户名")
            .input-wrapper
                span.label 密码
                c-input(type="password",v-model="user.password",placeholder="请输入密码")
            .input-wrapper
                span.label 确认密码
                c-input(type="password",v-model="user.rePassword",placeholder="请输入确认密码")
            .input-wrapper
                span.label 昵称
                c-input(v-model="user.nickname",placeholder="请输入昵称")
            c-button(type="primary",long,@click="submit") 注册

</template>

<script>
  import focus from '~/utils/directive/focus'
  import CInput from '~/components/common/input'
  import CButton from '~/components/common/button'

  export default {
    directives: {
      focus
    },
    data () {
      return {
        user: {
          username: '',
          password: '',
          rePassword: '',
          nickname: ''
        }
      }
    },
    methods: {
      async submit () {
        try {
          const username = this.user.username
          const password = this.user.password
          const rePassword = this.user.rePassword
          const nickname = this.user.nickname
          if (!username.trim() || !nickname.trim() || !password.trim() || !rePassword.trim()) {
            this.$message({
              content: '用户名、昵称、密码、确认密码不能为空',
              duration: 2000,
              type: 'error'
            })
            return
          }
          if (password !== rePassword) {
            this.$message({
              content: '密码和确认密码不一致',
              duration: 2000,
              type: 'error'
            })
            return
          }
          await this.$api.user.register({username, password, nickname})
          this.$message({
            content: '注册成功',
            duration: 2000,
            type: 'success'
          })
          // 跳转到登录页
          this.$router.push('/auth/login')
        } catch (err) {
          this.$message({
            content: err.message,
            type: 'error',
            duration: 2000
          })
        }
      }
    },
    components: {
      CInput,
      CButton
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/application";

    .auth-register {
        height: 100%;
        background-color: $bg-color;
        width: 40%;
        padding: 1em;
        margin: 10% auto auto;
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

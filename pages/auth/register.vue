<template lang="pug">
    c-row.auth-login-container(type="flex",justify="center")
        c-col.form-wrapper(:span="10")
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
                .action
                    button.login(@click="submit") 注册

</template>

<script>
  import focus from '~/utils/directive/focus'
  import CInput from '~/components/common/input'

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
      CInput
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .auth-login-container {
        .form-wrapper {
            background-color: $color-background;
            padding: 1rem;
            border-radius: 5px;
            .title {
                text-align: center;
                color: $color-primary;
                margin-bottom: 2rem;
            }
            .form {
                > * {
                    margin-bottom: 1rem;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
                .input-wrapper {
                    .label {
                        font-weight: bold;
                    }
                    input {
                        width: 100%;
                    }
                }
                .checkbox-wrapper {
                }
                .action {
                    .login {
                        background-color: $color-primary;
                        color: $color-text-white;
                        width: 100%;
                        padding: 0.35rem 1rem;
                        &:hover {
                            background-color: $color-primary-active;
                        }
                    }
                }
            }

        }
    }
</style>

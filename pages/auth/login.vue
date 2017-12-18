<template lang="pug">
    c-row.auth-login-container(type="flex",justify="center")
        c-col.form-wrapper(:span="10")
            h2.title 欢迎登陆
            .form
                .error(v-show="error") {{error}}
                .input-wrapper
                    span.label 用户名
                    input(type="text",v-model="user.username",placeholder="请输入用户名")
                .input-wrapper
                    span.label 密码
                    input(type="password",v-model="user.password",placeholder="请输入密码")
                .action
                    button.login(@click="submit") 登陆

</template>

<script>
  export default {
    data () {
      return {
        user: {
          username: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      submit () {
        console.log(1)
        this.$store.dispatch('login', this.user).then(() => {
          // 获取跳转来的路径
          const from = this.$route.meta.from
          // 如果来的路径不是当前路径和注册页面，则跳转回去，否则跳转到首页
          if (from !== this.$route.fullPath && from !== '/auth/register') {
            this.$router.push(from)
          } else {
            this.$router.push('/')
          }
        }).catch(err => {
          this.error = err.message
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      // 获取from的路径
      const path = from.fullPath
      // 将跳转来的路径记录下来
      to.meta.from = path
      next()
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
            .error {
                background-color: $color-danger;
                padding: 0.25rem;
                border-radius: 5px;
                margin-bottom: 1rem;
                color: $color-text-white;
                text-align: center;
            }
            .input-wrapper {
                margin-bottom: 1rem;
                .label {
                    font-weight: bold;
                }
                input {
                    width: 100%;
                }
            }
            .action {
                .login {
                    background-color: $color-primary;
                    color: $color-text-white;
                    width: 100%;
                    padding: 0.35rem 1rem;
                    &:hover {
                        background-color: color-active($color-primary);
                    }
                }
            }
        }
    }
</style>

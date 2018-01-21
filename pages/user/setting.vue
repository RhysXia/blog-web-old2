<template lang="pug">
    .user-setting-container
        c-panel
            .header(slot="header")
                button(@click="updateClick") {{isUpdate?'取消':'修改'}}
                button(@click="confirm",v-if="isUpdate") 确定修改
            .body
                .left
                    c-upload(action="https://api.ryths.cn/users/images",name="image",:headers="headers",:onSuccess="onFileSuccess")
                        .upload-wrapper
                            c-avatar.avatar(:imgUrl="copyUser.avatar",type="square",width="100%",height="100%")
                .right
                    .item
                        span.label 用户名
                        c-input.input(v-model="copyUser.username",:readonly="!isUpdate")
                    .item
                        span.label 昵称
                        c-input.input(v-model="copyUser.nickname",:readonly="!isUpdate")
                    template(v-if="isUpdate")
                        .item
                            span.label 密码
                            c-input.input(v-model="copyUser.password")
                        .item
                            span.label 确认密码
                            c-input.input(v-model="copyUser.rePassword")
        c-modal.modal(v-model="isConfirm",title="请输入原始用户名密码")
            .item
                span.label 用户名
                c-input.input(v-model="copyUser.confirmUsername")
            .item
                span.label 密码
                c-input.input(v-model="copyUser.confirmPassword")
            .footer(slot="footer")
                button.confirm(@click="submit") 确定
                button.cancel(@click="cancelSubmit") 取消
</template>

<script>
  import CInput from '~/components/common/input'
  import CPanel from '~/components/common/panel'
  import CUpload from '~/components/common/upload'
  import CAvatar from '~/components/common/avatar'
  import CModal from '~/components/common/modal'
  import { mapState } from 'vuex'

  export default {
    name: 'setting',
    validate ({store}) {
      return store.getters.isLogin
    },
    computed: {
      ...mapState(['user', 'token']),
      headers () {
        const headers = {}
        headers.Authorization = this.token
        return headers
      }
    },
    data () {
      return {
        copyUser: {
          username: null,
          password: null,
          rePassword: null,
          nickname: null,
          info: null,
          avatar: null,
          confirmUsername: '',
          confirmPassword: ''
        },
        isUpdate: false,
        isConfirm: false
      }
    },
    methods: {
      onFileSuccess (data) {
        this.copyUser.avatar = data
      },
      updateClick () {
        if (this.isUpdate) {
          this.reset()
        }
        this.isUpdate = !this.isUpdate
      },
      confirm () {
        const user = this.copyUser
        if (!user.username && !user.username.trim()) {
          this.$message({
            content: '用户名不能为空',
            duration: 2000,
            type: 'error'
          })
          return
        }
        if (!user.nickname && !user.nickname.trim()) {
          this.$message({
            content: '昵称不能为空',
            duration: 2000,
            type: 'error'
          })
          return
        }
        if (user.password.trim() && user.password !== user.rePassword) {
          this.$message({
            content: '确认密码和密码要相同',
            duration: 2000,
            type: 'error'
          })
          return
        }
        this.isConfirm = true
      },
      cancelSubmit () {
        this.isConfirm = false
        this.copyUser.confirmUsername = ''
        this.copyUser.confirmPassword = ''
      },
      async submit () {
        if (!this.copyUser.confirmUsername.trim()) {
          this.$message({
            content: '请输入用户名',
            duration: 2000,
            type: 'error'
          })
          return
        }
        if (!this.copyUser.confirmPassword.trim()) {
          this.$message({
            content: '请输入密码',
            duration: 2000,
            type: 'error'
          })
          return
        }
        try {
          await this.$api.user.update(this.copyUser)
          const {data} = await this.$api.user.getSelf()
          this.$store.commit('setUser', data)
          this.isConfirm = false
          this.isUpdate = false
        } catch (e) {
          this.$message({
            content: e.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      reset () {
        this.copyUser.username = this.user.username
        this.copyUser.nickname = this.user.nickname
        this.copyUser.info = this.user.info
        this.copyUser.avatar = this.user.avatar
        this.copyUser.password = null
        this.copyUser.rePassword = null
      }
    },
    created () {
      this.reset()
    },
    components: {
      CInput,
      CPanel,
      CUpload,
      CAvatar,
      CModal
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .user-setting-container {
        .header {
            padding-bottom: 0.5em;
            border-bottom: 1px solid $color-border-base;
            @include clearfix;
            button {
                float: right;
                margin-left: 1em;
                background-color: $color-success;
                color: $color-text-white;
                border: none;
                border-radius: 0;
                padding: 0.3em 1em;
                &:hover {
                    background-color: $color-success-active;
                }
            }
        }
        .body {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            margin-top: 1em;
        }
        .left {
            display: flex;
            flex: 1;
            margin-right: 1em;
            .upload-wrapper {
                position: relative;
                width: 100%;
                padding-top: 100%;
                .avatar, &:after {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
                &:after {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: $z-index-l;
                    font-size: 1.2em;
                    font-weight: bold;
                    color: $color-success;
                }
                &:hover {
                    &:after {
                        content: '更换头像';
                        background-color: rgba(255, 255, 255, 0.5);
                    }
                }
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            flex: 4;
            .item {
                display: flex;
                flex: auto;
                flex-direction: row;
                align-items: center;
                margin-bottom: 1em;
                .label {
                    display: inline-block;
                    width: 5em;
                }
                .input {
                    display: flex;
                    flex: auto;
                }
            }
        }
        .modal {
            .item {
                margin-bottom: 1em;
            }
            .footer {
                @include clearfix;
                button {
                    float: right;
                    box-sizing: border-box;
                    margin-left: 1em;
                    transition: background-color 0.4s ease;
                }
                .confirm {
                    color: $color-text-white;
                    background-color: $color-primary;
                    border: 1px solid $color-primary;
                    &:hover {
                        background-color: $color-primary-active;
                    }
                }
                .cancel {
                    border: 1px solid $color-border-base;
                    &:hover {
                        background-color: $color-background-active;
                    }
                }
            }
        }
    }
</style>

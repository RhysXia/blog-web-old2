<template lang="pug">
    c-tab-group.user-setting-container
        c-tab(label="基本信息")
            .body-info
                .left
                    .input-wrapper
                        label.label 昵称
                        c-input(v-model="copyUser.nickname")
                    .input-wrapper
                        label.label 简介
                        c-textarea(v-model="copyUser.info",autoHeight)
                    button.submit(@click="saveBase") 保存
                .right
                    .avatar-wrapper
                        .avatar
                            c-avatar(:src="copyUser.avatar",shape="square",matchParent)
                    c-upload(:action="avatar.url",:headers="avatar.headers",:name="avatar.name",:onSuccess="avatar.onSuccess")
                        button.upload-avatar 修改头像
        c-tab(label="密码管理")
            .body
                .input-wrapper
                    label.label 原始密码
                    c-input(v-model="copyUser.password",type="password")
                .input-wrapper
                    label.label 新密码
                    c-input(v-model="copyUser.newPassword",type="password")
                .input-wrapper
                    label.label 确认新密码
                    c-input(v-model="copyUser.reNewPassword",type="password")
                button.submit(@click="savePassword") 保存


</template>

<script>
  import CInput from '~/components/common/input'
  import CTextarea from '~/components/common/textarea'
  import { CTab, CTabGroup } from '~/components/common/tab'
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
      ...mapState(['loginUser', 'token', 'serverURL']),
      avatar () {
        const headers = {}
        headers.Authorization = this.token
        const url = this.serverURL + '/users/avatar'
        const name = 'avatar'
        const onSuccess = async data => {
          const res = await this.$api.user.getSelf()
          this.$store.commit('setLoginUser', res.data)
          this.$message({
            content: '修改成功',
            duration: 2000,
            type: 'success'
          })
        }
        return {headers, url, name, onSuccess}
      }
    },
    data () {
      return {
        copyUser: {
          avatar: null,
          nickname: '',
          info: '',
          password: '',
          newPassword: '',
          reNewPassword: ''
        }
      }
    },
    watch: {
      loginUser () {
        this.reset()
      }
    },
    methods: {
      async savePassword () {
        const password = this.copyUser.password
        const newPassword = this.copyUser.newPassword
        const reNewPassword = this.copyUser.reNewPassword
        if (!password.trim() || !newPassword.trim() || !reNewPassword.trim()) {
          this.$message({
            content: '(新)密码不能为空',
            duration: 2000,
            type: 'error'
          })
          return
        }
        if (newPassword !== reNewPassword) {
          this.$message({
            content: '新密码和确认新密码不匹配',
            duration: 2000,
            type: 'error'
          })
          return
        }
        try {
          await this.$api.user.updatePassword({password, newPassword})
          this.reset()
          this.$message({
            content: '修改成功',
            duration: 2000,
            type: 'success'
          })
        } catch (e) {
          this.$message({
            content: e.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      async saveBase () {
        const nickname = this.copyUser.nickname
        const info = this.copyUser.info
        if (!nickname.trim()) {
          this.$message({
            content: '昵称不能为空',
            duration: 2000,
            type: 'error'
          })
          return
        }
        try {
          await this.$api.user.updateBase({nickname, info})
          const res = await this.$api.user.getSelf()
          this.$store.commit('setLoginUser', res.data)
          this.$message({
            content: '修改成功',
            duration: 2000,
            type: 'success'
          })
        } catch (e) {
          this.$message({
            content: e.message,
            duration: 2000,
            type: 'error'
          })
        }
      },
      reset () {
        this.copyUser.avatar = this.loginUser.avatar
        this.copyUser.nickname = this.loginUser.nickname
        this.copyUser.info = this.loginUser.info
        this.copyUser.password = ''
        this.copyUser.newPassword = ''
        this.copyUser.reNewPassword = ''
      }
    },
    created () {
      this.reset()
    },
    components: {
      CInput,
      CTextarea,
      CTab,
      CTabGroup,
      CUpload,
      CAvatar,
      CModal
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .user-setting-container {
        background-color: $color-background;
        padding: 1em;
        .body-info {
            display: flex;
            flex-direction: row;
            .left, .right {
                display: flex;
                flex-direction: column;
            }
            .left {
                flex: 4;
                margin-right: 1em;
            }
            .right {
                flex: 1;
                .avatar-wrapper {
                    width: 100%;
                    padding-top: 100%;
                    position: relative;
                    margin-bottom: 1em;
                    .avatar {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                    }
                }
                .upload-avatar {
                    border: 1px solid $color-border-base;
                    width: 100%;
                    padding: 0.5em 1em;
                    border-radius: 3px;
                    &:hover {
                        background-color: $color-background-active;
                    }
                }
            }
        }
        .input-wrapper {
            margin-bottom: 1em;
            .label {
                font-weight: bold;
                font-size: 1.1em;
            }
        }
        .submit {
            background-color: $color-primary;
            color: $color-text-white;
            &:hover {
                background-color: $color-primary-active;
            }
        }
    }
</style>

<template lang="pug">
    c-row.user-self-container(:gutter="20")
        c-col(:span="4")
            .left-wrapper
                .avatar-wrapper
                    c-avatar(:imgUrl="user.avatar",type="square",width="100%",height="100%")
                h2.nickname
                    | {{user.nickname}}
                p.info {{user.info?user.info:'他太懒了，什么都没写'}}
        c-col(:span="20")
            .right-wrapper
                .tabs
                    nuxt-link.tab(:to="'/user/'+user.id") 总概
                    nuxt-link.tab(:to="'/user/'+user.id+'/category'") 分类
                nuxt-child
</template>
<script>
  import CAvatar from '~/components/common/avatar'

  export default {
    validate ({params}) {
      return /^\d+$/.test(params.id)
    },
    head () {
      return {
        title: `${this.user.nickname}的主页`
      }
    },
    async asyncData ({params, error, store}) {
      const id = params.id
      const result = {
        user: {}
      }
      try {
        const {data} = await store.$api.user.getById(id)
        result.user = data
        return result
      } catch (err) {
        error({statusCode: 500, message: err.message})
      }
    },
    components: {
      CAvatar
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .user-self-container {
        .left-wrapper,
        .right-wrapper {
            padding: 0.5rem;
            background-color: $color-background;
        }
        .avatar-wrapper {
            position: relative;
            width: 100%;
            padding-bottom: 100%;
            .c-avatar-container {
                position: absolute;
            }
        }
        .nickname {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.6rem;
        }
        .info {
            font-size: 0.8rem;
            display: block;
            color: $color-text-light;
            border-bottom: 1px solid $color-border-base;
            padding-bottom: 0.5rem;
        }
        .email {
            i {
                margin-right: 0.5rem;
                color: $color-text-light;
            }
        }
        .tabs {
            border-bottom: 1px solid $color-border-base;
            box-sizing: border-box;
            margin-bottom: 1rem;
            .tab {
                display: inline-block;
                padding: 0.8rem 1.5rem;
                color: $color-text;
                position: relative;
                font-weight: bold;
                &:after {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 2px;
                    content: '';
                }
                &.nuxt-link-exact-active {
                    &:after {
                        background-color: $color-primary;
                    }
                }
            }
        }

    }
</style>
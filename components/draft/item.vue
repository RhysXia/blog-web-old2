<template lang="pug">
    .c-draft-item
        nuxt-link.c-draft__title(:to="{path:'/article/write',query:{draftId:draft.id}}")
            h2 {{draft.title}}
        .c-draft__info {{draft.updateAt}}更新
            i.dot
            | 共{{wordCount}}字
            i.dot
            c-button(type="text",@click="$emit('delete',draft.id)") 删除
</template>

<script>
  import CButton from '../common/button'

  export default {
    name: 'c-draft-item',
    props: {
      draft: {
        type: Object,
        default: {}
      }
    },
    computed: {
      isLogin () {
        return this.$store.getters.isLogin
      },
      loginUser () {
        return this.$store.state.loginUser
      },
      isSelf () {
        return this.isLogin && this.draft.authorId === this.loginUser.id
      },
      wordCount () {
        return (this.draft.content || '').length + (this.draft.info || '').length
      }
    },
    components: {
      CButton
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/application";

    .c-draft-item {
        padding: 0.5em;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        .c-draft__title {
            h2 {
                font-size: 1.2em;
                font-weight: bold;
                margin: 0;
                padding: 0;
            }
        }
        .c-draft__info {
            color: $text-color--secondary;
            margin-top: 0.5em;
            font-size: 0.9em;
            .c-button {
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>

<template lang="pug">
    .c-draft-item-container
        nuxt-link(:to="{path:'/article/write',query:{draftId:draft.id}}") {{draft.title}}
        button.delete(v-if="isSelf",@click="$emit('delete')") 删除
</template>

<script>

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
      user () {
        return this.$store.state.user
      },
      isSelf () {
        return this.isLogin && this.draft.authorId === this.user.id
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-draft-item-container {
        border: 1px solid $color-border-base;
        padding: 0.5em 1em;
        border-radius: 0.3em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-right: -0.5em;
        .delete{
            color: $color-danger;
            font-weight: bold;
            padding: 0.5em;
        }
    }
</style>

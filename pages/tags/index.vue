<template lang="pug">
    .tags-container
        r-tag-item(v-for="(tag,index) in tags",:key="index",:tag="tag")
</template>
<script>
  import RTagItem from '~/components/Tag/tag-item'
  import TagApi from '~/api/tag-api'

  export default {
    async asyncData () {
      const data = {
        tags: []
      }
      await TagApi.getTags(0, 100).then(res => {
        if (res.data.code === 0) {
          data.tags = res.data.result.data
        }
      })
      return data
    },
    components: {
      RTagItem
    },
    mounted () {
      this.$store.commit('setShowAside', false)
    }
  }
</script>
<style lang="stylus" scoped>
    @import "~assets/stylus/variables.styl"
    .tags-container
        width 100%
        display inline-block
        >*
            margin-right $margin
            margin-bottom $margin
</style>

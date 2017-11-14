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
      this.$store.commit('setShowPanel', false)
    },
    beforeDestroy () {
      this.$store.commit('setShowPanel', true)
    }
  }
</script>
<style lang="stylus" scoped>
    @import "~assets/stylus/variables.styl"
    $tags-width = $width - $menu-width - $margin
    .tags-container
        width $tags-width
        display flex
        flex-direction row
        flex-wrap wrap
        >*
            margin-right $margin
            margin-bottom $margin
</style>

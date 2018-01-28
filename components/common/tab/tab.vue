<script>
  export default {
    name: 'c-tab',
    inject: ['cTabGroup'],
    props: {
      label: {
        type: String
      }
    },
    data () {
      return {
        index: -1,
        parent: null
      }
    },
    computed: {
      isShow () {
        return this.index === this.cTabGroup.activeIndex
      }
    },
    created () {
      this.cTabGroup.children.push(this)
    },
    beforeDestroy () {
      this.cTabGroup.children = this.cTabGroup.children.filter(it => {
        return it.index !== this.index
      })
    },
    render (h) {
      if (!this.isShow) {
        return
      }
      return h('div', {
        class: 'c-tab'
      }, this.$slots.default)
    }
  }
</script>
<style lang="scss">

</style>

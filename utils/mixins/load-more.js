export default {
  data () {
    return {
      isOpen: false,
      contentHidden: false,
      hiddenHeight: '8em'
    }
  },
  methods: {
    checkOverflow () {
      this.$nextTick(() => {
        const content = this.$refs.content
        this.contentHidden = content.scrollHeight > content.clientHeight
      })
    }
  },
  computed: {
    contentStyles () {
      if (this.isOpen) {
        return {}
      } else {
        return {
          overflow: 'hidden',
          maxHeight: this.hiddenHeight
        }
      }
    }
  },
  mounted () {
    this.checkOverflow()
    window.addEventListener('resize', this.checkOverflow)
  },
  updated () {
    this.checkOverflow()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.checkOverflow)
  }
}


export default {
  name: 'c-row',
  provide () {
    return {
      cRow: this
    }
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    type: {
      validator (value) {
        return ['flex'].includes(value)
      }
    },
    align: {
      validator (value) {
        return ['top', 'middle', 'bottom'].includes(value)
      }
    },
    justify: {
      validator (value) {
        return [
          'start', 'end', 'center', 'space-around',
          'space-between'].includes(value)
      }
    },
    gutter: {
      type: Number,
      default: 0
    }
  },
  computed: {
    classes () {
      const clsPrefix = 'c-row'
      return [
        clsPrefix,
        this.type ? `${clsPrefix}--${this.type}` : '',
        this.justify ? `${clsPrefix}--${this.justify}` : '',
        this.align ? `${clsPrefix}--${this.align}` : ''
      ]
    },
    styles () {
      let style = {}
      if (this.gutter) {
        style = {
          marginLeft: this.gutter / -2 + 'px',
          marginRight: this.gutter / -2 + 'px'
        }
      }
      return style
    }
  },
  render (h) {
    return h(this.tag, {
      style: this.styles,
      class: this.classes
    }, this.$slots.default)
  }
}

<script>
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
</script>
<style lang="scss">
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";
    .c-row {
        position: relative;
        box-sizing: border-box;
        @include clearfix;

        &--flex {
            display: flex;
            flex-direction: row;
            &:after {
                display: none;
            }
            &.c-row--start {
                justify-content: flex-start;
            }
            &.c-row--end {
                justify-content: flex-end;
            }
            &.c-row--center {
                justify-content: center;
            }
            &.c-row--space-around {
                justify-content: space-around;
            }
            &.c-row--space-between {
                justify-content: space-between;
            }
            &.c-row--top {
                align-items: flex-start;
            }
            &.c-row--middle {
                align-items: center;
            }
            &.c-row--bottom {
                align-items: flex-end;
            }
        }
    }
</style>

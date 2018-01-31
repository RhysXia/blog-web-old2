<script>
  export default {
    name: 'c-col',
    inject: ['cRow'],
    props: {
      tag: {
        type: String,
        default: 'div'
      },
      span: {
        type: Number
      },
      offset: {
        type: Number
      },
      push: {
        type: Number
      },
      pull: {
        type: Number
      },
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object]
    },
    computed: {
      gutter () {
        return this.cRow.gutter
      },
      classes () {
        const prefixCls = 'c-col'
        let classList = [prefixCls]

        let props = ['span', 'offset', 'pull', 'push']
        props.forEach(prop => {
          if (this[prop] || this[prop] === 0) {
            if (prop === 'span') {
              classList.push(`${prefixCls}-${this[prop]}`)
            } else {
              classList.push(`${prefixCls}-${prop}-${this[prop]}`)
            }
          }
        })

        props = ['xs', 'sm', 'md', 'lg', 'xl']
        props.forEach(size => {
          if (typeof this[size] === 'number') {
            classList.push(`${prefixCls}-${size}-${this[size]}`)
          } else if (typeof this[size] === 'object') {
            let props = this[size]
            Object.keys(props).forEach(prop => {
              classList.push(`el-col-${size}-${prop}-${props[prop]}`)
            })
          }
        })
        return classList
      },
      styles () {
        let style = {}
        if (this.gutter !== 0) {
          style = {
            paddingLeft: this.gutter / 2 + 'px',
            paddingRight: this.gutter / 2 + 'px'
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
    // mixins
    @mixin col($clsPrefix,$size,$number) {

        @if ($size == span) {
            $size: #{''};
        } @else {
            $size: -#{$size};
        }
        .#{$clsPrefix}#{$size}-0 {
            display: none;
        }
        @for $i from 1 through $number {
            .#{$clsPrefix}#{$size}-#{$i} {
                width: $i / $number * 100%;
            }
            .#{$clsPrefix}#{$size}-pull-#{$i} {
                position: relative;
                right: $i / $number * 100%;
            }
            .#{$clsPrefix}#{$size}-offset-#{$i} {
                margin-left: $number / 24 * 100%;
            }
            .#{$clsPrefix}#{$size}-push-#{$i} {
                position: relative;
                left: $i / $number * 100%;
            }
        }
    }

    @mixin media-col($breakpoints) {
        @each $key in map_keys($breakpoints) {
            @media only screen and #{map_get($breakpoints,$key)}{
                @include col(c-col, $key, 24)
            }
        }
    }

    .c-col {
        float: left;
        box-sizing: border-box;
    }

    @include col(c-col, span, 24);
    @include media-col($grid-breakpoints);
</style>

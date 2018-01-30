<script>
  export default {
    name: 'c-tab-group',
    provide () {
      return {
        cTabGroup: this
      }
    },
    props: {
      value: {
        type: Number,
        default: 0
      },
      barPosition: {
        default: 'top',
        validator (val) {
          return ['top', 'left', 'right', 'bottom'].includes(val)
        }
      }
    },
    data () {
      return {
        activeIndex: this.value,
        children: []
      }
    },
    watch: {
      value (val) {
        this.activeIndex = val
      },
      activeIndex (val) {
        this.$emit('input', val)
      },
      children (arr) {
        arr.forEach((it, index) => {
          it.index = index
        })
      }
    },
    render (h) {
      const labels = []
      this.children.forEach(it => {
        const content = it.$slots.label || it.label
        const label = h('div', {
          class: {
            'c-tab-group__label': true,
            'c-tab-group__label--active': this.activeIndex === it.index
          },
          on: {
            click: () => {
              this.activeIndex = it.index
            }
          }
        }, [content])
        labels.push(label)
      })
      const header = h('div', {
        class: [
          'c-tab-group__header'
        ]
      }, labels)

      let body = h('div', {
        class: 'c-tab-group__body'
      }, this.$slots.default)

      return h('div', {
        class: ['c-tab-group', `c-tab-group--${this.barPosition}`]
      }, [header, body])
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-tab-group {
        display: flex;
        .c-tab-group__header {
            box-sizing: border-box;
            display: flex;
            .c-tab-group__label {
                padding: 0.5em 1em;
                transition: color 0.2s ease-in-out;
                cursor: pointer;
                &:hover {
                    color: $tab-label-color--hover;
                }
            }
            .c-tab-group__label--active {
                color: $tab-label-color--active;
            }
        }
        .c-tab-group__body {
            padding: 1em;
        }
    }

    .c-tab-group--top {
        flex-direction: column;
        .c-tab-group__header {
            flex-direction: row;
            order: 1;
            border-bottom: 1px solid $border-color;
            .c-tab-group__label--active {
                border-bottom: 1px solid $tab-label-color--active;
            }
        }
        .c-tab-group__body {
            order: 2;
        }
    }

    .c-tab-group--bottom {
        flex-direction: column;
        .c-tab-group__header {
            flex-direction: row;
            order: 2;
            border-top: 1px solid $border-color;
            .c-tab-group__label--active {
                border-top: 1px solid $tab-label-color--active;
            }
        }
        .c-tab-group__body {
            order: 1;
        }
    }

    .c-tab-group--left {
        flex-direction: row;
        .c-tab-group__header {
            flex-direction: column;
            order: 1;
            border-right: 1px solid $border-color;
            .c-tab-group__label--active {
                border-right: 1px solid $tab-label-color--active;
            }
        }
        .c-tab-group__body {
            order: 2;
        }
    }

    .c-tab-group--right {
        flex-direction: row;
        .c-tab-group__header {
            flex-direction: column;
            order: 2;
            border-left: 1px solid $border-color;
            .c-tab-group__label--active {
                border-left: 1px solid $tab-label-color--active;
            }
        }
        .c-tab-group__body {
            order: 1;
        }
    }

</style>

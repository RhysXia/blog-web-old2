<template lang="pug">
    .c-select(v-clickoutside="outClick")
        c-dropdown(trigger="none",v-model="isShow")
            .c-select__header(:class="headerClass",ref="header",@click="headerClick")
                .c-select__header__wrapper
                    .c-select__tag(@click.stop,v-for="tag in tags",:key="tag.id")
                        c-tag(:name="tag.label",:closeable="multiple",@close="closeTag(tag.value)")
                    input.c-select__input(ref="input",:disabled="!filterable && !remote",v-model="inputContent",:placeholder="placeholder")
            c-dropdown-menu(slot="list")
                slot
</template>

<script>
  import clickoutside from '~/utils/directive/clickoutside'
  import { CDropdown, CDropdownMenu } from '../dropdown'
  import CTag from '../tag'

  // 将selectValues总是转为数组
  const valueToArray = (value) => {
    if (value instanceof Array) {
      return value
    }
    if (value) {
      return [value]
    }
    return []
  }

  export default {
    name: 'c-select',
    directives: {
      clickoutside
    },
    props: {
      value: {
        type: [Number, String, Array]
      },
      multiple: {
        type: Boolean,
        default: false
      },
      filterable: {
        type: Boolean,
        default: false
      },
      remote: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        isShow: false,
        selectValues: valueToArray(this.value),
        children: [],
        inputContent: ''
      }
    },
    watch: {
      value (val) {
        this.selectValues = valueToArray(val)
      },
      // 根据要求将selectValues转成数组或者单个值
      selectValues (val) {
        if (this.multiple) {
          this.$emit('input', val)
        } else if (this.selectValues.length > 0) {
          this.$emit('input', this.selectValues[0])
        } else {
          this.$emit('input', null)
        }
      },
      inputContent (val) {
        if (this.remote) {
          this.$emit('remote', val)
        }
      }
    },
    methods: {
      headerClick () {
        if (this.multiple) {
          this.$refs.input.focus()
        }
        this.isShow = true
      },
      closeTag (val) {
        this.selectValues = this.selectValues.filter(it => {
          return it !== val
        })
      },
      outClick () {
        this.isShow = false
      }
    },
    computed: {
      tags () {
        return this.children.filter(it => {
          return this.selectValues.includes(it.value)
        })
      },
      headerClass () {
        return {
          'c-select__header--active': this.isShow
        }
      }
    },
    components: {
      CDropdownMenu,
      CDropdown,
      CTag
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-select {
        position: relative;
        .c-select__header {
            position: relative;
            border-radius: 0.2em;
            border: 1px solid $color-border-base;
            transition: border-color 0.4s ease;
            padding: 0.25em;
            .c-select__header__wrapper {
                margin: 0 -0.5em -0.5em 0;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
            .c-select__tag, .c-select__input {
                display: inline-flex;
                margin: 0 0.5em 0.5em 0;
                box-sizing: border-box;
            }
            .c-select__input {
                outline: none;
                border: none;
                width: 5em;
                flex: auto;
                background-color: transparent;
            }
        }
        .c-select__header--active {
            border-color: $color-primary;
        }
    }


</style>

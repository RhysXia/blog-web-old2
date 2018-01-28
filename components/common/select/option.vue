<template lang="pug">
    transition(name="c-option--animation")
        c-dropdown-item(v-if="isShow")
            .c-option(@click.stop="click",:class="classes")
                slot {{label}}
</template>

<script>
  import { findComponentUpward } from '../../../utils/utils'
  import { CDropdownItem } from '../dropdown'

  export default {
    name: 'c-option',
    props: {
      value: {
        required: true
      },
      label: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        parent: null,
        index: 0
      }
    },
    computed: {
      isShow () {
        if (!this.parent) {
          return true
        }
        if (this.parent.filterable) {
          return this.label.includes(this.parent.inputContent)
        }
        return true
      },
      active () {
        if (!this.parent) {
          return false
        }
        return this.parent.selectValues.includes(this.value)
      },
      classes () {
        if (this.active) {
          return ['c-option--active']
        }
        return []
      }
    },
    methods: {
      click () {
        if (!this.parent) {
          return
        }
        // 判断是否包含当前option
        if (this.active) {
          this.parent.selectValues = this.parent.selectValues.filter(it => {
            return it !== this.value
          })
        } else if (this.parent.multiple) {
          this.parent.selectValues.push(this.value)
        } else {
          this.parent.selectValues = [this.value]
        }
      }
    },
    created () {
      this.parent = findComponentUpward(this, 'c-select')
      if (this.parent) {
        this.parent.children.push(this)
      }
    },
    beforeDestroy () {
      if (this.parent) {
        this.parent.children = this.parent.children.filter(it => {
          return it.value === this.value
        })
      }
    }
    ,
    components: {
      CDropdownItem
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-option {
        padding: 0.5em;
        &:hover {
            background-color: rgba(200, 200, 200, 0.5);
        }
    }

    .c-option--active {
        background-color: rgba(200, 200, 200, 0.5);
    }

    .c-option--animation-enter-active,
    .c-option--animation-leave-active {
        transition: opacity 0.4s;
    }

    .c-option--animation-enter,
    .c-option--animation-leave-to {
        opacity: 0.5;
    }

    .c-option--animation-leave,
    .c-option--animation-enter-to {
        opacity: 1;
    }
</style>

<template lang="pug">
    transition(name="c-option--fade")
        c-dropdown-item.c-option(v-if="isShow",:class="classes",@click="click")
            slot {{label}}
</template>

<script>
  import { CDropdownItem } from '../dropdown'

  export default {
    name: 'c-option',
    inject: ['cSelect'],
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
        if (this.cSelect.filterable) {
          return this.label.includes(this.cSelect.inputContent)
        }
        return true
      },
      active () {
        return this.cSelect.selectValues.includes(this.value)
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
        const select = this.cSelect

        // 判断是否包含当前option
        if (this.active) {
          select.selectValues = select.selectValues.filter(it => {
            return it !== this.value
          })
          select.tags = select.tags.filter(it => {
            return it.value !== this.value
          })
          return
        }
        if (select.multiple) {
          select.selectValues.push(this.value)
          select.tags.push({value: this.value, label: this.label})
        } else {
          select.selectValues = [this.value]
          select.tags = [{value: this.value, label: this.label}]
        }
      },
      updateTags () {
        const select = this.cSelect
        if (select.selectValues.includes(this.value)) {
          if (select.tags.map(it => it.value).includes(this.value)) {
            return
          }
          select.tags.push({value: this.value, label: this.label})
        }
      }
    },
    created () {
      this.updateTags()
    },
    components: {
      CDropdownItem
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";
    .c-option{
        background-color: $bg-color;
        &:hover{
            background-color: $select-bg-color--hover;
            color: $select-color--hover;
        }
    }
    .c-option--active {
        background-color: $select-bg-color--active;
        color: $select-color--active;
    }

    .c-option--fade-enter-active,
    .c-option--animation-leave-active {
        transition: opacity 0.4s;
    }

    .c-option--fade-enter,
    .c-option--fade-leave-to {
        opacity: 0.5;
    }

    .c-option--fade-leave,
    .c-option--fade-enter-to {
        opacity: 1;
    }
</style>

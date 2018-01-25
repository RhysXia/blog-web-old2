<template lang="pug">
    .c-tab-group
        .c-tab-group__header
            button.c-tab-group__btn(@click="activeIndex=tab.index",:class="{'c-tab-group__btn--active':tab.index === activeIndex}",v-for="tab in children",:key="tab.index") {{tab.name}}
        .c-tab-group__body
            slot
</template>

<script>
  import { findComponentsDownward } from '~/utils/utils'

  export default {
    name: 'c-tab-group',
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        children: [],
        activeIndex: this.value
      }
    },
    watch: {
      value (val) {
        this.activeIndex = val
      },
      activeIndex (val) {
        this.$emit('input', val)
      }
    },
    computed: {},
    methods: {
      updateChildren () {
        this.children = findComponentsDownward(this, 'c-tab', 1)
        let index = 0
        this.children.forEach(it => {
          it.index = index++
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-tab-group{
        .c-tab-group__header {
            box-sizing: border-box;
            border-bottom: 1px solid $color-border-base;
            .c-tab-group__btn {
                padding: 0.5em 1em;
            }
            .c-tab-group__btn--active {
                border-bottom: 1px solid $color-success;
                color: $color-success;
            }
        }
        .c-tab-group__body {
            padding: 1em;
        }
    }
</style>

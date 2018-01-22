<template lang="pug">
    .c-tab-group-container
        .c-header
            button.c-tab-btn(@click="activeIndex=tab.index",:class="{'c-active-tab':tab.index === activeIndex}",v-for="tab in children",:key="tab.index") {{tab.name}}
        .c-body
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

    .c-tab-group-container {
        .c-header {
            box-sizing: border-box;
            border-bottom: 1px solid $color-border-base;
            .c-tab-btn {
                padding: 0.5em 1em;
            }
            .c-active-tab {
                border-bottom: 1px solid $color-success;
                color: $color-success;
            }
        }
        .c-body {
            padding: 1em;
        }
    }
</style>

<template lang="pug">
    .c-select-container(:class="classes",v-clickoutside="outClick")
        c-dropdown(trigger="none",v-model="isShow")
            .c-select-input
                .c-selete-items(v-if="activeKeyValues.length>0")
                    c-tag(@close="closeTag(item.value)",v-for="(item,index) in activeKeyValues",:key="item.value",:name="item.label",closeable)
                .input-wrapper
                    input.input(@click.prevent="click",:readonly="!editable",type="text",@keydown.delete.prevent="deleteKeyDown",@keyup.enter="enter",ref="input",v-model="inputData",:placeholder="activeKeyValues.length>0?'':placeholder")
                    slot(name="append")
            c-dropdown-menu(slot="list")
                slot
</template>

<script>
  import clickoutside from '~/utils/directive/clickoutside'
  import { findComponentsDownward } from '~/utils/utils'
  import { CDropdown, CDropdownMenu } from '../dropdown'
  import CTag from '../tag'

  export default {
    name: 'c-select',
    directives: {
      clickoutside
    },
    props: {
      value: null
    },
    data () {
      return {
        children: [],
        isShow: false
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

    .c-select-container {

    }
</style>
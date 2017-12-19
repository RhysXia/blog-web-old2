<template lang="pug">
    .c-dropdown-container(v-clickoutside="handleClose")
        .c-dropdown-ref(@click="refClick")
            slot
        transition(:name="'c-dropdown-slide-'+position")
            .c-dropdown-list(v-show="visible",:class="'c-dropdown-list-'+position")
                slot(name="list")
</template>

<script>
  import clickoutside from '~/utils/directive/clickoutside'

  export default {
    name: 'dropdown',
    directives: {
      clickoutside
    },
    props: {
      position: {
        type: String,
        default: 'bottom'
      }
    },
    data () {
      return {
        visible: false
      }
    },
    methods: {
      handleClose () {
        this.visible = false
      },
      refClick () {
        this.visible = true
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-dropdown-container {
        position: relative;
        .c-dropdown-ref {

        }
        .c-dropdown-list {
            position: absolute;
        }
        .c-dropdown-list-bottom {
            top: 100%;
            left: 0;
        }
        .c-dropdown-list-top {
            bottom: 100%;
            left: 0;
        }
        .c-dropdown-list-left {
            right: 100%;
            top: 0
        }
        .c-dropdown-list-right {
            left: 100%;
            top: 0
        }
        @include slide(c-dropdown-slide-bottom, bottom);
        @include slide(c-dropdown-slide-right, right);
        @include slide(c-dropdown-slide-left, left);
        @include slide(c-dropdown-slide-top, top);

    }
</style>

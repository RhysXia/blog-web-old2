<template lang="pug">
    .c-dropdown-container(v-clickoutside="handleClose",@mouseenter.stop="mouseenter",@mouseleave.stop="mouseleave")
        .c-dropdown-ref(@click="refClick")
            slot
        transition(name="c-dropdown-slide")
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
      },
      trigger: {
        validator (val) {
          return ['click', 'hover'].includes(val)
        },
        default: 'hover'
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
      },
      mouseenter () {
        if (this.trigger === 'hover') {
          this.visible = true
        }
      },
      mouseleave () {
        if (this.trigger === 'hover') {
          this.visible = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-dropdown-container {
        position: relative;
        background-color: $color-background;
        cursor: pointer;
        .c-dropdown-ref {

        }
        .c-dropdown-list {
            position: absolute;
        }
        .c-dropdown-list-bottom {
            top: 100%;
            left: 0;
            margin-top: 0.15rem;
        }
        .c-dropdown-list-top {
            bottom: 100%;
            left: 0;
            margin-bottom: 0.15rem;
        }
        .c-dropdown-list-left {
            right: 100%;
            top: 0;
        }
        .c-dropdown-list-right {
            left: 100%;
            top: 0;
        }
        @include slide(c-dropdown-slide, bottom);
    }
</style>

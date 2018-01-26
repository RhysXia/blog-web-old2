<template lang="pug">
    .c-badge
        slot
        transition(name="c-badge--animation")
            sup.c-badge__content(:class="{ 'c-badge__content--fixed': $slots.default, 'c-badge__content--dot': isDot }",v-show="!hidden&&(content||isDot)") {{content}}
</template>

<script>
  export default {
    name: 'c-badge',
    props: {
      value: {
        type: [Number, String]
      },
      max: Number,
      isDot: {
        type: Boolean,
        default: false
      },
      hidden: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      content () {
        if (this.isDot) return
        const value = this.value
        const max = this.max
        if (typeof value === 'number' && typeof max === 'number') {
          return max < value ? `${max}+` : value
        }
        return value
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-badge {
        position: relative;
        vertical-align: middle;
        display: inline-block;
        .c-badge__content {
            background-color: $color-danger;
            color: $color-text-white;
            border-radius: 1em;
            font-size: 0.8em;
            height: 1.2em;
            line-height: 1.2em;
            padding: 0 0.4em;
            text-align: center;
            white-space: nowrap;
            border: 1px solid #fff;
        }
        .c-badge__content--fixed {
            position: absolute;
            top: 0;
            right: 1em;
            transform: translateX(100%) translateY(-50%);
        }
        .c-badge__content--dot {
            height: 0.5em;
            width: 0.5em;
            padding: 0;
            right: 0;
        }
        .c-badge__content--fixed.c-badge__content--dot {
            right: 0.5em;
        }
    }
</style>

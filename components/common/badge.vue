<template lang="pug">
    .c-badge(:class="classes")
        slot
        sup.c-badge__content(v-show="!hidden&&(content||isDot)") {{content}}
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
      },
      classes () {
        return {
          'c-badge--fixed': this.$slots.default,
          'c-badge--dot': this.isDot
        }
      }
    }
  }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .c-badge {
        position: relative;
        vertical-align: middle;
        display: inline-block;
        .c-badge__content {
            display: inline-block;
            background-color: $badge-bg-color;
            color: $badge-color;
            border-radius: 1em;
            font-size: 0.8em;
            height: 1.2em;
            line-height: 1.2em;
            padding: 0 0.5em;
            text-align: center;
            white-space: nowrap;
            border: 1px solid $badge-border-color;
            top: 0;
        }
    }

    .c-badge--fixed {
        .c-badge__content {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
        }
    }

    .c-badge--dot {
        .c-badge__content {
            height: 0.5em;
            width: 0.5em;
            padding: 0;
            border-radius: 50%;
        }
    }

</style>

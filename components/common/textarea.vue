<template lang="pug">
    .c-textarea-container(:class="classes")
        textarea.c-textarea(:placeholder="placeholder",v-if="autoHeight",v-model="content",v-autoheight="height",@click="click",v-clickoutside="outClick")
        textarea.c-textarea(:placeholder="placeholder",:style="{height:height+'px'}",v-else,v-model="content",@click="click",v-clickoutside="outClick")
</template>

<script>
  import autoheight from '~/utils/directive/auto-height'
  import clickoutside from '~/utils/directive/clickoutside'

  export default {
    name: 'c-textarea',
    directives: {
      autoheight,
      clickoutside
    },
    props: {
      height: {
        type: Number,
        default: 60
      },
      value: {
        type: String,
        default: ''
      },
      autoHeight: {
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
        active: false,
        content: this.value
      }
    },
    watch: {
      content (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.content = val
      }
    },
    computed: {
      classes () {
        if (this.active) {
          return ['is-active']
        }
        return []
      }
    },
    methods: {
      click () {
        this.active = true
      },
      outClick () {
        this.active = false
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-textarea-container {
        border-radius: 0.3em;
        padding: 5px;
        border: 1px solid $color-border-base;
        transition: border-color 0.4s ease-in-out;
        .c-textarea {
            box-sizing: border-box;
            width: 100%;
            outline: none;
            border: none;
            resize: none;
            background-color: transparent;
        }
        &.is-active {
            border-color: $color-primary;
        }
    }
</style>
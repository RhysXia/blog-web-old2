<template lang="pug">
    .c-popover(@mouseenter="enter",@mouseleave="leave",@click="click",v-clickoutside="outClick")
        .c-popover__reference(ref="reference")
            slot
        .c-popover__popper(ref="popper",v-show="visible")
            slot(name="popper")
</template>

<script>
  import clickoutside from '~/utils/directive/clickoutside'
  import Popper from 'popper.js'

  export default {
    name: 'c-popover',
    directives: {
      clickoutside
    },
    props: {
      placement: {
        default: 'auto',
        validator (val) {
          return [
            'auto',
            'top', 'top-start', 'top-end',
            'left', 'left-start', 'left-end',
            'right', 'right-start', 'right-end',
            'bottom', 'bottom-start', 'bottom-end'
          ].includes(val)
        }
      },
      trigger: {
        default: 'hover',
        validator (val) {
          return ['click', 'hover', 'custom'].includes(val)
        }
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        visible: false,
        popper: null,
        isClicked: false
      }
    },
    watch: {
      value (val) {
        this.visible = val
      },
      visible (val) {
        this.$emit('input', val)
        if (val) {
          this.$nextTick(() => {
            this.createPopper()
          })
        }
      }
    },
    methods: {
      createPopper () {
        if (this.popper) {
          this.popper.options.placement = this.placement
          this.popper.scheduleUpdate()
          return
        }
        this.popper = new Popper(this.$refs.reference, this.$refs.popper, {
          placement: this.placement,
          onCreate: (data) => {
            this.$emit('popper-create', data)
          },
          onUpdate: (data) => {
            this.$emit('popper-update', data)
          },
          modifiers: {

          }
        })
        this.popper.scheduleUpdate()
      },
      enter () {
        if (this.trigger !== 'hover') {
          return
        }
        this.visible = true
      },
      leave () {
        if (this.trigger !== 'hover') {
          return
        }
        if (this.isClicked) {
          return
        }
        this.visible = false
      },
      click () {
        this.isClicked = true
        this.visible = true
      },
      outClick () {
        this.visible = false
        this.isClicked = false
      }
    },
    beforeDestroy () {
      if (this.popper) {
        this.popper.destroy()
      }
    }
  }
</script>

<style scoped>

</style>

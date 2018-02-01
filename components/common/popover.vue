<template lang="pug">
    .c-popover
        .c-popover__reference(@mouseenter="enter",@mouseleave="leave",ref="reference")
            slot()
        .c-popover__popper(ref="popper",v-show="visible")
            slot(name="popper")
</template>

<script>
  import Popper from 'popper.js'

  export default {
    name: 'c-popover',
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
      }
    },
    data () {
      return {
        visible: false,
        popper: null
      }
    },
    methods: {
      enter () {
        this.visible = true
        this.$nextTick(() => {
          if (this.popper) {
            this.popper.scheduleUpdate()
            return
          }
          this.popper = new Popper(this.$refs.reference, this.$refs.popper, {
            placement: this.placement,
            onCreate: (data) => {
            },
            onUpdate: (data) => {
            },
            modifiers: {
              applyStyle: {enabled: false},
              applyCustomStyle: {
                enabled: true,
                fu: (data) => {
                  console.log(data)
                },
                order: 900
              }
            }
          })
        })
      },
      leave () {
        // this.visible = false
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

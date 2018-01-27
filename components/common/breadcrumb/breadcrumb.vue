<template lang="pug">
    .c-breadcrumb
        slot
</template>

<script>

  export default {
    name: 'c-breadcrumb',
    props: {
      separator: {
        type: String,
        default: '/'
      }
    },
    watch: {
      separator () {
        this.updateChildren()
      }
    },
    methods: {
      updateChildren () {
        for (let i = 0; i < this.$children.length - 1; i++) {
          this.$children[i].separator = this.separator
        }
      }
    },
    mounted () {
      console.log(this)
      this.updateChildren()
    },
    updated () {
      this.$nextTick(() => {
        this.updateChildren()
      })
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-breadcrumb {
        color: #999;
        font-size: 1em;

    }

</style>

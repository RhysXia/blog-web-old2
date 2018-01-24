<template lang="pug">
    ul.c-pagination-container
        li.c-page(@click="click(1)",:class="{'c-disabled':currentPage<=1}")
            i.fa.fa-angle-double-left
        li.c-page(@click="click(currentPage-1)",:class="{'c-disabled':currentPage<=1}")
            i.fa.fa-angle-left
        li.c-page(v-for="index in cTotalPages",:key="index",:class="{'c-active':currentPage===index}",@click="currentPage=index") {{index}}
        li.c-page(@click="click(currentPage+1)",:class="{'c-disabled':currentPage>=cTotalPages}")
            i.fa.fa-angle-right
        li.c-page(@click="click(cTotalPages)",:class="{'c-disabled':currentPage>=cTotalPages}")
            i.fa.fa-angle-double-right
</template>

<script>
  export default {
    name: 'c-pagination',
    model: {
      prop: 'page',
      event: 'change'
    },
    props: {
      total: {
        type: Number
      },
      size: {
        type: Number,
        default: 10
      },
      page: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number
      }
    },
    data () {
      return {
        currentPage: this.page
      }
    },
    computed: {
      cTotalPages () {
        if (this.totalPages) {
          return this.totalPages
        }
        return Math.floor((this.total + this.size - 1) / this.size)
      }
    },
    watch: {
      currentPage (val) {
        this.$emit('change', val)
      },
      page (val) {
        this.currentPage = val
      }
    },
    methods: {
      click (val) {
        this.currentPage = val
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-pagination-container {
        position: relative;
        text-align: center;
        .c-page {
            display: inline-block;
            font-size: 1em;
            font-weight: bold;
            height: 2em;
            width: 2em;
            line-height: 2em;
            text-align: center;
            cursor: pointer;
            background-color: $color-background;
            margin: 0 0.2em;
            &:hover {
                color: $color-primary;
            }
        }
        .c-active {
            color: $color-primary;
        }
        .c-disabled {
            color: $color-disabled;
            cursor: not-allowed;
            &:hover {
                color: $color-disabled;;
            }
        }
    }
</style>
<template lang="pug">
    ul.c-pagination
        li.c-pagination__item(@click="click(1)",:class="{'c-pagination__item--disabled':currentPage<=1}")
            i.fa.fa-angle-double-left
        li.c-pagination__item(@click="click(currentPage-1)",:class="{'c-pagination__item--disabled':currentPage<=1}")
            i.fa.fa-angle-left
        li.c-pagination__item(v-for="index in cTotalPages",:key="index",:class="{'c-pagination__item--active':currentPage===index}",@click="currentPage=index") {{index}}
        li.c-pagination__item(@click="click(currentPage+1)",:class="{'c-pagination__item--disabled':currentPage>=cTotalPages}")
            i.fa.fa-angle-right
        li.c-pagination__item(@click="click(cTotalPages)",:class="{'c-pagination__item--disabled':currentPage>=cTotalPages}")
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

    .c-pagination {
        position: relative;
        text-align: center;
        .c-pagination__item {
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
        .c-pagination__item--active {
            color: $color-primary;
        }
        .c-pagination__item--disabled {
            color: $color-disabled;
            cursor: not-allowed;
            &:hover {
                color: $color-disabled;;
            }
        }
    }
</style>
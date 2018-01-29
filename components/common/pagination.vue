<template lang="pug">
    ul.c-pagination(v-if="totalPages")
        li.c-pagination__item(@click="click(1)",:class="{'c-pagination__item--disabled':currentPage<=1}")
            i.fa.fa-angle-double-left
        li.c-pagination__item(@click="click(currentPage-1)",:class="{'c-pagination__item--disabled':currentPage<=1}")
            i.fa.fa-angle-left
        li.c-pagination__item(v-for="(page,index) in pagers",:key="index",:class="{'c-pagination__item--active':currentPage===page}",@click="page!==-1?currentPage=page:''") {{page===-1?'...':page}}
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
      },
      pagers () {
        const pagerCount = 7
        const currentPage = this.page
        const pageCount = this.cTotalPages
        if (pageCount === 1) {
          return [1]
        }
        let showPrevMore = false
        let showNextMore = false
        if (pageCount > pagerCount) {
          if (currentPage > pagerCount - 3) {
            showPrevMore = true
          }
          if (currentPage < pageCount - 3) {
            showNextMore = true
          }
        }
        const array = []
        array.push(1)
        if (showPrevMore) {
          array.push(-1)
        }
        if (showPrevMore && !showNextMore) {
          const startPage = pageCount - (pagerCount - 2)
          for (let i = startPage; i < pageCount; i++) {
            array.push(i)
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 2; i < pagerCount; i++) {
            array.push(i)
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.floor(pagerCount / 2) - 1
          for (let i = currentPage - offset; i <= currentPage + offset; i++) {
            array.push(i)
          }
        } else {
          for (let i = 2; i < pageCount; i++) {
            array.push(i)
          }
        }
        if (showNextMore) {
          array.push(-1)
        }
        array.push(this.cTotalPages)
        return array
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

<style lang="scss">
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
            background-color: $pagination-bg;
            margin: 0 0.2em;
            &:hover {
                color: $primary-color;
            }
        }
        .c-pagination__item--active {
            color: $primary-color;
        }
        .c-pagination__item--disabled {
            color: $pagination-disabled;
            cursor: not-allowed;
            &:hover {
                color: $pagination-disabled;
            }
        }
    }
</style>

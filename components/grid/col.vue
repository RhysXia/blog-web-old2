<template lang="pug">
    div(:class="classes",:style="styles")
        slot
</template>
<script>
    import {findComponentUpward} from '../../utils/utils'

    const prefixCls = 'c-col-container'
    export default {
        name: 'col',
        props: {
            span: [Number, String],
            order: [Number, String],
            offset: [Number, String],
            push: [Number, String],
            pull: [Number, String],
            className: String,
            xs: [Number, Object],
            sm: [Number, Object],
            md: [Number, Object],
            lg: [Number, Object]
        },
        data() {
            return {
                parent: null
            }
        },
        computed: {
            gutter() {
                return this.parent ? this.parent.gutter : 0
            },
            classes() {
                let classList = [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-span-${this.span}`]: this.span,
                        [`${prefixCls}-order-${this.order}`]: this.order,
                        [`${prefixCls}-offset-${this.offset}`]: this.offset,
                        [`${prefixCls}-push-${this.push}`]: this.push,
                        [`${prefixCls}-pull-${this.pull}`]: this.pull,
                        [`${this.className}`]: !!this.className
                    }
                ];
                ['xs', 'sm', 'md', 'lg'].forEach(size => {
                    if (typeof this[size] === 'number') {
                        classList.push(`${prefixCls}-span-${size}-${this[size]}`)
                    } else if (typeof this[size] === 'object') {
                        let props = this[size]
                        Object.keys(props).forEach(prop => {
                            classList.push(
                                prop !== 'span'
                                    ? `${prefixCls}-${size}-${prop}-${props[prop]}`
                                    : `${prefixCls}-span-${size}-${props[prop]}`
                            )
                        })
                    }
                })
                return classList
            },
            styles() {
                let style = {}
                if (this.gutter !== 0) {
                    style = {
                        paddingLeft: this.gutter / 2 + 'px',
                        paddingRight: this.gutter / 2 + 'px'
                    }
                }
                return style
            }
        },
        created() {
            this.parent = findComponentUpward(this, 'row')
        },
        beforeUpdate() {
            this.parent = findComponentUpward(this, 'row')
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .#{$grid-col-prefixCls} {
        float: left;
        box-sizing: border-box;
        @include clearfix;
    }

    @include create-col()

    @include create-media-col()
</style>

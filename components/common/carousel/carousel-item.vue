<template lang="pug">
    .c-carousel-item-container(:style="[styles]")
        slot
</template>

<script>
    import {findComponentUpward} from '../../../utils/utils'

    export default {
        name: 'carousel-item',
        data() {
            return {
                parent: null,
                index: 0,
                isAnimated: false
            }
        },
        computed: {
            styles() {
                const styles = {}
                const parent = this.parent
                if (!parent) {
                    return styles
                }
                styles.height = parent.rHeight + 'px'
                styles.width = parent.rWidth + 'px'
                const isLast = this.index === parent.childNum - 1
                const isFirst = this.index === 0
                if (parent.childNum <= 1) {
                    styles.transform = `translateX(0px)`
                } else if (this.activeIndex === 0 && isLast) {
                    styles.transform = `translateX(-${parent.rWidth}px)`
                } else if (this.activeIndex === parent.childNum - 1 && isFirst) {
                    styles.transform = `translateX(${parent.rWidth}px)`
                } else {
                    styles.transform = `translateX(${(this.index - this.activeIndex) * parent.rWidth}px)`
                }
                if (this.isAnimated) {
                    styles.transition = `transform 0.4s ease`
                }
                return styles
            },
            activeIndex() {
                if (this.parent) {
                    return this.parent.activeIndex
                }
            }
        },
        created() {
            this.parent = findComponentUpward(this, 'carousel')
            if (this.parent) {
                this.parent.updateChildren()
            }
        },
        beforeDestroy() {
            if (this.parent) {
                this.parent.updateChildren()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .c-carousel-item-container {
        // 必须设置position，否则z-index无效
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

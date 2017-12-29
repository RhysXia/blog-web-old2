<template lang="pug">
    .c-show-more-container
        .c-content-wrapper(:style="styles",ref="wrapper")
            slot
        .c-footer-wrapper
            slot(name="footer",v-if="shouldHidden")
                button.c-button(@click="isOpen=!isOpen")
                    template(v-if="isOpen")
                        i.fa.fa-arrow-up
                        | 关闭显示全部
                    template(v-else)
                        i.fa.fa-arrow-down
                        | 显示全部

</template>
<script>
    export default {
        name: 'show-more',
        props: {
            hiddenHeight: {
                type: Number,
                default: 100
            }
        },
        data() {
            return {
                isOpen: false,
                scrollHeight: 0
            }
        },
        computed: {
            shouldHidden() {
                return this.scrollHeight > this.hiddenHeight
            },
            styles() {
                const style = {
                    transition: `max-height ${(this.scrollHeight - this.hiddenHeight) / 2500}s ease-in-out`
                }
                if (this.isOpen) {
                    style.maxHeight = this.scrollHeight + 'px'
                } else {
                    style.maxHeight = this.hiddenHeight + 'px'
                    style.overflowY = 'hidden'
                }
                return style
            }
        },
        methods: {
            checkOverflow() {
                this.scrollHeight = this.$refs.wrapper.scrollHeight
            }
        },
        mounted() {
            this.checkOverflow()
            // TODO: 不知道怎么优化
            // 设置定时器，一段时间后再次检查，因为有些图片加载需要时间
            this._timer = setTimeout(this.checkOverflow, 2000)
            window.addEventListener('resize', this.checkOverflow)
        },
        updated() {
            clearTimeout(this._timer)
            this.checkOverflow()
            // 设置定时器，一段时间后再次检查，因为有些图片加载需要时间
            this._timer = setTimeout(this.checkOverflow, 2000)
        },
        beforeDestroy() {
            clearTimeout(this._timer)
            window.removeEventListener('resize', this.checkOverflow)
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    @keyframes button-move {
        0% {
            transform: translateY(-0.5em);
            opacity: 1;
        }
        50% {
            transform: translateY(0.5em);
            opacity: 0.5;
        }
        100% {
            transform: translateY(-0.5em);
            opacity: 1;
        }
    }

    .c-show-more-container {
        .c-footer-wrapper {
            margin: 1em 0;
            .c-button {
                display: block;
                width: 100%;
                background-color: $color-primary;
                color: $color-text-white;
                animation: button-move 1.5s infinite;
                padding: 0.5em;
            }
        }
    }
</style>

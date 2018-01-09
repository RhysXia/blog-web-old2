<template lang="pug">
    transition(name="c-modal")
        .c-modal-container(v-if="val",@click='outClick')
            .c-modal-wrapper(@click.stop,:style="{width:width}")
                .c-modal-header
                    slot(name="header")
                        span.title {{title}}
                    span.close(@click="val=false")
                        i.fa.fa-close
                .c-modal-main
                    slot
                .c-modal-footer
                    slot(name="footer")
                        .button-wrapper
                            button.confirm(@click="confirm") 确定
                            button.cancel(@click="cancel") 取消
</template>
<script>

    export default {
        name: "modal",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '对话框'
            },
            width: {
                type: String,
                default: '40%'
            }
        },
        data() {
            return {
                bodyOverflow: null,
                val: this.value,
            }
        },
        watch: {
            val(v) {
                if (v) {
                    this.stopScroll()
                } else {
                    this.canScroll()
                }
                this.$emit('input', v)
            },
            value(val) {
                this.val = val
            }
        },
        methods: {
            confirm() {
                this.$emit('confirm')
                this.val = false
            },
            cancel() {
                this.$emit('cancel')
                this.val = false
            },
            outClick() {
                this.val = false
            },
            stopScroll() {
                const el = document.documentElement || document.body
                el.style.overflow = 'hidden'
            },
            canScroll() {
                const el = document.documentElement || document.body
                el.style.overflow = this.bodyOverflow
            }
        },
        mounted() {
            const el = document.documentElement || document.body
            this.bodyOverflow = el.style.overflow
        },
        beforeDestroy() {
            this.canScroll()
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-modal-enter-active,
    .c-modal-leave-active {
        transition: transform 0.4s ease-in-out;
    }

    .c-modal-enter,
    .c-modal-leave-to {
        transform: translateY(-100%);
    }

    .c-modal-enter-to,
    .c-modal-leave {
        transform: translateY(0);
    }

    .c-modal-container {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: $color-shadow;
        z-index: $z-index-max;
        .c-modal-wrapper {
            background-color: $color-white;
            border: 1px solid $color-border-base;
            border-radius: 5px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            > * {
                padding: 0.5em;
            }
            .c-modal-header {
                position: relative;
                border-bottom: 1px solid $color-border-base;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                .title {
                    font-weight: bold;
                }
                .close {
                    display: block;
                    cursor: pointer;
                    padding: 0.5em;
                    &:hover {
                        color: $color-primary;
                    }
                }
            }
            .c-modal-main {

            }
            .c-modal-footer {
                border-top: 1px solid $color-border-base;
                .button-wrapper {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    button {
                        transition: background-color 0.4s ease;
                    }
                    .confirm {
                        background-color: $color-primary;
                        color: $color-text-white;
                        margin-right: 0.5em;
                        &:hover {
                            background-color: $color-primary-active;
                        }
                    }
                    .cancel {
                        background-color: $color-white;
                        border: 1px solid $color-border-base;
                        &:hover {
                            background-color: $color-white-active;
                        }
                    }
                }
            }
        }
    }
</style>
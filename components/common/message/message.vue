<template lang="pug">
    transition(name="c-message-tran",@after-leave="afterLeave")
        .c-message-container(v-show="visible",:class="'c-message-'+type")
            i.icon.fa(:class="'fa-'+type")
            .content {{content}}
</template>

<script>
    import {oneOf} from "../../../utils/utils";

    export default {
        name: "message",
        props: {
            content: {
                type: String
            },
            duration: {
                type: Number,
                default: 3000
            },
            type: {
                validator(value) {
                    return oneOf(value, ['info', 'success', 'warning', 'error'])
                }
            },
            onClose: {
                type: Function
            }
        },
        data() {
            return {
                visible: false,
                timer: null
            }
        },
        methods: {
            afterLeave() {
                if (this.visible) {
                    return
                }
                if (typeof this.onClose === 'function') {
                    this.onClose()
                }
            },
            startTimer() {
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        this.visible = false
                    }, this.duration)
                }
            }
        },
        mounted() {
            this.startTimer()
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-message-container {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.4em 1em;
        border-radius: 0.2em;
        border: 1px solid;
        .icon {
            display: block;
            border-radius: 50%;
            width: 1.5em;
            height: 1.5em;
            font-size: 1em;
            text-align: center;
            margin-right: 1em;
            &:before {
                line-height: 1.5em;
            }
        }
        &.c-message-info {
            border-color: $color-border-base;
            .icon {
                background-color: $color-text;
                color: $color-white;
            }
        }
    }

    .c-message-tran-enter-active,
    .c-message-tran-leave-active {
        transition: top 0.4s ease;
    }

    .c-message-tran-enter-to,
    .c-message-tran-leave {
        top: 20px;
    }

    .c-message-tran-enter,
    .c-message-tran-leave-to {
        top: 0;
    }
</style>
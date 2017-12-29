<template lang="pug">
    transition(name="c-message-tran",@after-leave="afterLeave")
        .c-message-container(v-show="visible",:class="'c-message-'+type")
            i.icon.iconfont(:class="'icon-'+type")
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
    @import "./assets/iconfont.css";

    .c-message-container {
        position: fixed;
        top: 2em;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.4em 1em;
        border-radius: 0.2em;
        border: 1px solid;
        .icon {
            display: inline-block;
            margin-right: 0.5em;
            font-size: 1.5em;
            &:before {
            }
        }
        &.c-message-info {
            border-color: $color-primary;
            color: $color-primary-active;
            background-color: $color-primary-light;
        }
        &.c-message-error {
            border-color: $color-danger;
            color: $color-danger-active;
            background-color: $color-danger-light;
        }
        &.c-message-info {
            color: $color-success;
            border-color: $color-success-active;
            background-color: $color-success-light;
        }
        &.c-message-success {
            color: $color-success;
            border-color: $color-success-active;
            background-color: $color-success-light;
        }
        &.c-message-warning {
            color: $color-warn;
            border-color: $color-white-active;
            background-color: $color-warn-light;
        }
    }

    .c-message-tran-enter-active,
    .c-message-tran-leave-active {
        transition: top 0.4s ease-in-out,opacity 0.4s ease-in-out;
    }

    .c-message-tran-enter-to,
    .c-message-tran-leave {
        top: 2em;
        opacity: 1;
    }

    .c-message-tran-enter,
    .c-message-tran-leave-to {
        top: 0;
        opacity: 0;
    }
</style>
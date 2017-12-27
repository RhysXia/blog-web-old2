<template lang="pug">
    .c-dropdown-container(v-clickoutside="handleClose",@mouseenter.stop="mouseenter",@mouseleave.stop="mouseleave")
        .c-dropdown-ref(@click="refClick")
            slot
        transition(name="c-dropdown-slide")
            .c-dropdown-list(v-show="visible",:class="'c-dropdown-list-'+position")
                slot(name="list")
</template>

<script>
    import clickoutside from '~/utils/directive/clickoutside'

    export default {
        name: 'dropdown',
        directives: {
            clickoutside
        },
        props: {
            position: {
                type: String,
                default: 'bottom'
            },
            trigger: {
                validator(val) {
                    return ['click', 'hover'].includes(val)
                },
                default: 'hover'
            },
            value: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: this.value
            }
        },
        watch: {
            visible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.visible = val
            }
        },
        methods: {
            handleClose() {
                this.visible = false
            },
            refClick() {
                this.visible = true
            },
            mouseenter() {
                if (this.trigger === 'hover') {
                    this.visible = true
                }
            },
            mouseleave() {
                if (this.trigger === 'hover') {
                    this.visible = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-dropdown-container {
        position: relative;
        cursor: pointer;
        .c-dropdown-ref {
            position: relative;
            background-color: $color-background;
        }
        .c-dropdown-list {
            position: absolute;
            z-index: $z-index-xxl;
            border: 1px solid $color-border-base;
            border-radius: 0.3em;
            background-color: $color-background;
        }
        .c-dropdown-list-bottom {
            top: 100%;
            left: 0;
            min-width: 100%;
            margin-top: 0.15em;
        }
        .c-dropdown-list-top {
            bottom: 100%;
            left: 0;
            min-width: 100%;
            margin-bottom: 0.15em;
        }
        .c-dropdown-list-left {
            right: 100%;
            top: 0;
            min-height: 100%;
        }
        .c-dropdown-list-right {
            left: 100%;
            top: 0;
            min-height: 100%;
        }
        @include slide(c-dropdown-slide, bottom);
    }
</style>

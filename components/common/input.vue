<template lang="pug">
    .c-input-container
        .c-input-wrapper(:class="containerClass",@click="active=true",v-clickoutside="outClick")
            input.input(v-if="type==='password'",v-model="content",type="password",:placeholder="placeholder")
            input.input(v-else,v-model="content", type = "text",:placeholder="placeholder")
</template>
<script>
    import clickoutside from '~/utils/directive/clickoutside'

    export default {
        name: "input",
        directives: {
            clickoutside
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            }
        },
        data() {
            return {
                content: this.value,
                active: false
            }
        },
        computed: {
            containerClass() {
                return {
                    'c-input-container-active': this.active
                }
            }
        },
        watch: {
            content(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.content = val
            }
        },
        methods: {
            outClick() {
                this.active = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .checkbox {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .c-input-wrapper {
        box-sizing: border-box;
        border: 1px solid $color-border-base;
        border-radius: 0.2em;
        padding: 0.25em 0.5em;
        background-color: $color-background;
        transition: border-color $time-transition ease;
        .input {
            width: 100%;
            border: none;
            outline: none;
            background-color: transparent;
            font-size: inherit;
        }
    }

    .c-input-container-active {
        border-color: $color-primary;
    }
</style>
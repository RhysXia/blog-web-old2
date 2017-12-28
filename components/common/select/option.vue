<template lang="pug">
    c-dropdown-item
        .c-option-container(@click.stop="click",:class="classes")
            slot {{label}}
</template>

<script>
    import {findComponentUpward} from "../../../utils/utils";
    import {CDropdownItem} from "../dropdown";

    export default {
        name: "option",
        props: {
            value: null,
            label: {
                type: String
            }
        },
        data() {
            return {
                parent: null,
                index: 0
            }
        },
        computed: {
            active() {
                let active = false
                if (this.parent) {
                    for (let item of this.parent.activeKeyValues) {
                        if (item.value === this.value) {
                            active = true
                            break
                        }
                    }
                }
                return active
            },
            classes() {
                return {
                    'is-active': this.active
                }
            }
        },
        methods: {
            click() {
                if (this.parent) {
                    this.parent.clickChild(this.index)
                }
            }
        },
        created() {
            this.parent = findComponentUpward(this, 'select')
            if (this.parent) {
                this.parent.updateOptions()
            }
        },
        beforeDestroy() {
            if (this.parent) {
                this.parent.updateOptions()
            }
        },
        components: {
            CDropdownItem
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-option-container {
        padding: 0.5em;
        &:hover {
            background-color: rgba(200, 200, 200, 0.5);
        }
        &.is-active {
            background-color: rgba(200, 200, 200, 0.5);
        }
    }
</style>
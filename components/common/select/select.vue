<template lang="pug">
    c-dropdown.c-select-container(:trigger="trigger")
        c-input(:value="activeLabel",:placeholder="placeholder")
        c-dropdown-menu(slot="list")
            slot
</template>

<script>
    import CInput from '../input'
    import {findComponentsDownward} from "../../../utils/utils";
    import {CDropdown, CDropdownMenu} from "../dropdown";

    export default {
        name: "select",
        props: {
            value: null,
            placeholder: {
                type: String,
                default: ''
            },
            // 远程加载
            remote: {
                type: Boolean,
                default: false
            },
            trigger: {
                type: String,
                default: 'click'
            }
        },
        data() {
            return {
                options: [],
                content: null,
                activeIndex: -1
            }
        },
        computed: {
            activeLabel() {
                if (this.options.length === 0 || this.activeIndex < 0) {
                    return ''
                }
                return this.options[this.activeIndex].label
            }
        },
        watch: {
            activeIndex(val) {
                this.$emit('input', this.options[val].value)
            }
        },
        methods: {
            updateOptions() {
                this.options = findComponentsDownward(this, 'option')
                for (let i = 0; i < this.options.length; i++) {
                    this.options[i].index = i
                }
            }
        },
        components: {
            CInput,
            CDropdownMenu,
            CDropdown
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

</style>
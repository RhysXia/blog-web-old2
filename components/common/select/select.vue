<template lang="pug">
    c-dropdown.c-select-container(:trigger="trigger",v-model="showItems")
        c-input(:value="activeLabel",:readonly="!editable",:placeholder="placeholder",:style="inputStyle")
            .c-select-append(slot="append")
                slot(name="append")
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
            trigger: {
                type: String,
                default: 'click'
            },
            // 可编辑
            editable: {
                type: Boolean,
                default: false
            },
            // 多选
            multiple: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                options: [],
                activeIndex: -1,
                // 多选时使用
                activeIndexes: [],
                showItems: false
            }
        },
        computed: {
            inputStyle() {
                if (this.editable) {
                    return {}
                }
                return {
                    disable: 'true'
                }
            },
            activeLabel() {
                if (this.multiple) {
                    let str = ''
                    this.options.filter(it => {
                        return this.activeIndexes.includes(it.index)
                    }).map(it => it.label).forEach(it => {
                        str += (it + ' ')
                    })
                    return str
                }
                if (this.activeIndex >= 0) {
                    return this.options[this.activeIndex].label
                }
                return ''
            }
        },
        watch: {
            activeIndex(val) {
                this.$emit('input', val)
                this.showItems = false
            },
            activeIndexes(val) {
                this.$emit('input', val)
            }
        },
        methods: {
            updateOptions() {
                this.options = findComponentsDownward(this, 'option')
                for (let i = 0; i < this.options.length; i++) {
                    this.options[i].index = i
                }
            },
            clickChild(index) {
                if (this.multiple) {
                    if (!this.activeIndexes.includes(index)) {
                        this.activeIndexes.push(index)
                    } else {
                        this.activeIndexes = this.activeIndexes.filter(it => {
                            return index !== it
                        })
                    }
                } else {
                    this.activeIndex = index
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
    .c-select-container{
        .c-select-append{
        }
    }
</style>
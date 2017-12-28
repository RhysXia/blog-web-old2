<template lang="pug">
    .c-select-container(:class="classes",@keyup.enter="enter",@click="click",v-clickoutside="outClick")
        c-dropdown(:trigger="trigger",v-model="showItems")
            .c-select-input(@click="$refs.input.focus()",@keyup.delete="activeKeyValues.pop()")
                .c-tags(v-if="activeKeyValues.length>0")
                    c-tag(@close="closeTag(item.value)",v-for="(item,index) in activeKeyValues",:key="index",:name="item.label",closeable)
                c-input(ref="input",v-model="inputData",@input="input",:readonly="!editable",:placeholder="activeKeyValues.length>0?'':placeholder")
                    .c-select-append(@click.stop,slot="append")
                        slot(name="append")
            c-dropdown-menu(slot="list")
                slot
</template>

<script>
    import clickoutside from '~/utils/directive/clickoutside'
    import CInput from '../input'
    import {findComponentsDownward} from "../../../utils/utils";
    import {CDropdown, CDropdownMenu} from "../dropdown";
    import CTag from '../tag'

    export default {
        name: "select",
        directives: {
            clickoutside
        },
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
            // 可远程
            remote: {
                type: Boolean,
                default: false
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
                showItems: false,
                inputData: '',
                activeKeyValues: [],
                isActive: false
            }
        },
        watch: {
            activeKeyValues(val) {
                const values = val.map(it => {
                    return it.value
                })
                if (this.multiple) {
                    this.$emit('input', values)
                } else if (values.length === 0) {
                    this.$emit('input', null)
                } else {
                    this.$emit('input', values[0])
                }
                // 清空输入框
                this.inputData = ''
                // input继续获得焦点
                this.$refs.input.focus()
            }
        },
        methods: {
            // 添加一个标签
            add({label, value}) {
                const isNotAdd = this.activeKeyValues.map(it => {
                    return it.value
                }).includes(value)
                if (isNotAdd) {
                    return
                }
                if (this.multiple) {
                    this.activeKeyValues.push({label, value})
                } else {
                    this.activeKeyValues = [{label, value}]
                }
            },
            click() {
                this.isActive = true
            },
            outClick() {
                this.isActive = false
            },
            closeTag(value) {
                this.activeKeyValues = this.activeKeyValues.filter(it => {
                    return it.value !== value
                })
            },
            input() {
                if (this.remote) {
                    this.$emit('load', this.inputData)
                }
            },
            enter() {
                if (this.editable) {
                    this.$emit('enter', this.inputData)
                }
            },
            updateOptions() {
                this.options = findComponentsDownward(this, 'option')
                for (let i = 0; i < this.options.length; i++) {
                    this.options[i].index = i
                }
            },
            clickChild(index) {
                const option = this.options[index]
                if (option.active) {
                    this.activeKeyValues = this.activeKeyValues.filter(it => {
                        return it.value !== option.value
                    })
                } else if (this.multiple) {
                    this.activeKeyValues.push({
                        label: option.label,
                        value: option.value
                    })
                } else {
                    this.activeKeyValues = [{
                        label: option.label,
                        value: option.value
                    }]
                }
            }
        },
        computed: {
            classes() {
                return {
                    'is-active': this.isActive
                }
            }
        },
        components: {
            CInput,
            CDropdownMenu,
            CDropdown,
            CTag
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-select-container {
        .c-select-input {
            display: flex;
            flex-direction: row;
            align-items: center;
            border: 1px solid $color-border-base;
            border-radius: 0.2em;
            transition: border-color 0.4s ease-in-out;
            .c-tags {
                margin: 0.2em;
                > * {
                    margin-right: 0.5em;
                }
            }
            .c-input-container {
                flex: 1 1 auto;
                border: none;
                .input {
                    cursor: pointer !important;
                }
            }
        }
        .c-select-append {
            height: 100%;
        }
        &.is-active {
            .c-select-input {
                border-color: $color-primary;
            }
        }
    }
</style>
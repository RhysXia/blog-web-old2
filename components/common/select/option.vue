<template lang="pug">
    c-dropdown-item.c-option-container(@click="click")
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
        methods: {
            click() {
                this.parent.activeIndex = this.index
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
        components:{
            CDropdownItem
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-option-container {
        &:hover{
            background-color: rgba(200,200,200,0.5);
        }
    }
</style>
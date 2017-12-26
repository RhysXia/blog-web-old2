<template lang="pug">
    .c-editor-container
        .actions
            span(@mouseenter="showEmoji=true",@mouseleave="showEmoji=false")
                i.fa.fa-smile-o
                .emoji-list(v-show="showEmoji")
                    span(v-for="(emoji,index) in emojis",:key="index",v-html="emojiImages[index]",@click="inputEmoji(index)")
            span(@click="$refs.upload.click()")
                i.fa.fa-image
            span(@click="inputLink")
                i.fa.fa-link
            span(@click="inputCode")
                i.fa.fa-code
            span(@click="preview=!preview")
                i.fa.fa-eye
        input.upload(type="file",ref="upload",@change="inputImage")
        .editor-wrapper
            textarea.editor(ref="textarea",v-autoheight="textHeight")
            transition(name="preview-slide",mode="out-in")
                .preview(v-html="markdownContent",v-if="preview")

</template>
<script>
    import markdown from '~/utils/markdown'
    import {getPos, setPos} from '~/utils/clip'
    import autoheight from '~/utils/directive/auto-height'

    export default {
        name: 'editor',
        directives: {
            autoheight
        },
        props: {
            submitName: {
                type: String,
                default: '发布'
            },
            imageUpload: {
                type: Function,
                default: () => {
                    return new Promise((resolve) => {
                        resolve()
                    })
                }
            },
            value: {
                type: String,
                default: ''
            },
            textHeight: {
                type: Number,
                default: 200
            }
        },
        data() {
            return {
                showEmoji: false,
                content: this.value,
                emojis: [
                    ':(', ':")', '</3', ':/', ':,(', ':(', '<3', ']:(',
                    'o:)', ':\'D', ':*', 'x-)', ':|', ':o', ':@', ':D',
                    ':)', ']:)', ';-(', ':P', '8-)', ',:(', ',:)',
                    ':s', ';)'
                ],
                preview: false
            }
        },
        computed: {
            emojiImages() {
                const array = []
                this.emojis.forEach(emoji => {
                    let str = markdown(emoji)
                    str = str.replace('<p>', '').replace('</p>\n', '')
                    array.push(str)
                })
                return array
            },
            markdownContent() {
                return markdown(this.content)
            }
        },
        watch: {
            value(val) {
                this.content = val
            },
            content(val) {
                this.$emit('input', val)
            }
        },
        methods: {
            inputEmoji(index) {
                this.insert(this.emojiImages[index])
            },
            inputCode() {
                this.insert('```lang\n\n\n```', 3, 7)
            },
            inputImage(e) {
                const ele = (e.target || e.srcElement)
                const files = ele.files
                this.imageUpload(files).then(url => {
                    ele.value = ''
                    this.insert(`![name](${url})`, 2, 6)
                }).catch(() => {
                    ele.value = ''
                })
            },
            inputLink() {
                this.insert('[name](http://)', 1, 5)
            },
            insert(str, posStart, posEnd) {
                const ele = this.$refs.textarea
                ele.focus()
                const {start, end} = getPos(ele)
                const content = this.content
                this.content = content.slice(0, start) + str + content.slice(end)
                const _start = posStart + start || start + str.length + 1
                const _end = posEnd + start || start + str.length + 1
                this.$nextTick(() => {
                    setPos(ele, _start, _end)
                })
            }
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    @include slide(preview-slide, bottom, 0.5s)
    .c-editor-container {
        background-color: $color-background;
        position: relative;
        border: 1px solid $color-border-base;
        .actions {
            border-bottom: 1px solid $color-border-base;
            span {
                display: inline-block;
                padding: 0.5em;
                cursor: pointer;
                i {
                    vertical-align: middle;
                    font-size: 1.4em;
                }
            }
        }
        .upload {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            transform: scale(0);
        }
        .editor-wrapper {
            position: relative;
            .editor,
            .preview {
                padding: 0.5em;
            }
            .editor {
                border: none;
                box-sizing: border-box;
                outline: none;
                width: 100%;
                background-color: transparent;
            }
            .preview {
                position: absolute;
                box-sizing: border-box;
                top: 0;
                width: 100%;
                height: 100%;
                left: 0;
                background-color: rgba(255, 255, 255, 0.7);
                overflow: auto;
            }
        }

    }
</style>

<template lang="pug">
    .c-editor-container
        .actions(style="color:red;",:style="barStyle",v-fixed="100")
            span(@mouseenter="showEmoji=true",@mouseleave="showEmoji=false")
                i.fa.fa-smile-o
                .emoji-list(:style="barPosition==='top'?'top:100%;':'bottom:100%'",v-show="showEmoji")
                    span(v-for="(emoji,index) in emojis",:key="index",v-html="emojiImages[index]",@click="inputEmoji(index)")
            span(@click="imageClick")
                i.fa.fa-image
            span(@click="inputLink")
                i.fa.fa-link
            span(@click="inputCode")
                i.fa.fa-code
            span(@click.stop="preview=!preview")
                i.fa.fa-eye
            .right
                slot(name="button")
        input.upload(type="file",ref="upload",@change="inputImage")
        .editor-wrapper(:style="editorStyle")
            textarea.editor(ref="textarea",v-autoheight="textHeight",v-model="content")
            transition(name="preview-slide",mode="out-in")
                .preview(v-html="markdownContent",v-if="preview",v-clickoutside="outClick")

</template>
<script>
    import markdown from '~/utils/markdown'
    import {getPos, setPos} from '~/utils/clip'
    import autoheight from '~/utils/directive/auto-height'
    import clickoutside from '~/utils/directive/clickoutside'
    import fixed from '~/utils/directive/fixed'

    export default {
        name: 'editor',
        directives: {
            autoheight,
            clickoutside,
            fixed
        },
        props: {
            imageUpload: {
                type: Function
            },
            value: {
                type: String,
                default: ''
            },
            textHeight: {
                type: Number,
                default: 200
            },
            // top/bottom
            barPosition: {
                type: String,
                default: 'top'
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
            barStyle(){
              if(this.barPosition === 'top'){
                  return {
                      order: '1',
                      borderBottomWidth: '1px',
                      borderTopWidth: '0'
                  }
              }
              return {
                  order: '2',
                  borderBottomWidth: '0',
                  borderTopWidth: '1px'
              }
            },
            editorStyle(){
                if(this.barPosition === 'top'){
                    return {
                        order: '2'
                    }
                }
                return {
                    order: '1'
                }
            },
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
            outClick() {
                this.preview = false
            },
            inputEmoji(index) {
                this.insert(this.emojiImages[index])
            },
            inputCode() {
                this.insert('```lang\n\n\n```', 3, 7)
            },
            imageClick() {
                if (this.imageUpload) {
                    this.$refs.upload.click()
                } else {
                    this.insert(`![name](url)`, 2, 6)
                }
            },
            inputImage(e) {
                const ele = (e.target || e.srcElement)
                const files = ele.files
                if (files.length === 0) {
                    return
                }
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
        }
        ,
        components: {}
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    @include slide(preview-slide, bottom, 0.5s)
    .c-editor-container {
        display: flex;
        flex-direction: column;
        background-color: $color-background;
        position: relative;
        border: 1px solid $color-border-base;
        .actions {
            display: flex;
            flex-direction: row;
            align-items: center;
            box-sizing: border-box;
            position: relative;
            border: 1px solid $color-border-base;
            border-left: none;
            border-right: none;
            width: 100%;
            span {
                display: inline-block;
                padding: 0.5em;
                cursor: pointer;
                i {
                    vertical-align: middle;
                    font-size: 1.4em;
                }
                .emoji-list {
                    z-index: 1000;
                    position: absolute;
                    left: 0;
                    width: 100%;
                    background-color: rgba(200, 200, 200, 0.5);
                    span {
                        &:hover {
                            background-color: rgba(200, 200, 200, 0.5);
                        }
                    }
                }
            }
            .right{
                position: relative;
                display: block;
                height: 100%;
                width: 100%;
                box-sizing: border-box;
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
                box-sizing: border-box;
            }
            .editor {
                border: none;
                outline: none;
                width: 100%;
                background-color: transparent;
                resize: none;
                display: block;
            }
            .preview {
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                left: 0;
                overflow: auto;
                background-color: rgba(200, 200, 200, 0.5);
            }
        }

    }
</style>

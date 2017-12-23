<template lang="pug">
    .c-min-editor-container
        textarea.editor(v-model="content",ref="textarea")
        transition(name="preview-slide")
            .preview(v-html="markdownContent",v-if="preview")
        .actions
            button(@mouseenter="showEmoji=true",@mouseleave="showEmoji=false")
                .emoji-list(v-show="showEmoji")
                    span(v-for="(emoji,index) in emojis",:key="index",v-html="emojiImages[index]",@click="inputEmoji(index)")
                i.fa.fa-smile-o
            button(@click="$refs.upload.click()")
                i.fa.fa-image
            button(@click="inputLink")
                i.fa.fa-link
            button(@click="inputCode")
                i.fa.fa-code
            button(@click="preview=!preview")
                i.fa.fa-eye
            button.right(@click="submit") {{submitName}}
        input.upload(type="file",ref="upload",@change="inputImage")

</template>

<script>
  import markdown from '~/utils/markdown'
  import { getPos, setPos } from '~/utils/clip'

  export default {
    name: 'min-editor',
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
      value: ''
    },
    data () {
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
      emojiImages () {
        const array = []
        this.emojis.forEach(emoji => {
          let str = markdown(emoji)
          str = str.replace('<p>', '').replace('</p>\n', '')
          array.push(str)
        })
        return array
      },
      markdownContent () {
        return markdown(this.content)
      }
    },
    watch: {
      value (val) {
        this.content = val
      },
      content (val) {
        this.$emit('input', val)
      }
    },
    methods: {
      submit () {
        this.$emit('submit', this.content)
      },
      inputEmoji (index) {
        this.insert(this.emojiImages[index])
      },
      inputCode () {
        this.insert('```lang\n\n\n```', 3, 7)
      },
      inputImage (e) {
        const ele = (e.target || e.srcElement)
        const files = ele.files
        this.imageUpload(files).then(url => {
          ele.value = ''
          this.insert(`![name](${url})`, 2, 6)
        }).catch(() => {})
      },
      inputLink () {
        this.insert('[name](http://)', 1, 5)
      },
      insert (str, posStart, posEnd) {
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
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    .c-min-editor-container {
        position: relative;
        border: 1px solid $color-border-base;
        .editor,
        .preview {
            display: block;
            outline: none;
            padding: 0.5em;
            border: none;
            word-break: break-all;
            width: 100%;
            height: 10em;
            overflow: auto;
            box-sizing: border-box;
        }
        .editor {
            background-color: transparent;
            resize: none;
        }
        .preview {
            position: absolute;
            left: 0;
            top: 0;
            background-color: rgba(255, 255, 255, 0.8);
        }
        @include slide(preview-slide, bottom);
        .actions {
            border-top: 1px solid $color-border-base;
            background-color: rgba(225, 225, 255, 0.5);
            position: relative;
            button {
                background-color: transparent;
                border-radius: 0;
                padding: 0.25em 0.5em;
                &:hover {
                    background-color: rgba(225, 225, 255, 0.8);
                }
                &.right {
                    float: right;
                    background-color: $color-primary;
                    color: $color-text-white;
                    padding-left: 2em;
                    padding-right: 2em;
                    &:hover {
                        background-color: color-active($color-primary);
                    }
                }
            }
            .emoji-list {
                position: absolute;
                bottom: 100%;
                left: 0;
                font-size: 1.2em;
                background-color: rgba(225, 225, 255, 0.8);
                padding: 0.25em;
                > * {
                    float: left;
                    padding: 0.25em;
                    &:hover {
                        background-color: $color-background;
                    }
                }
            }
        }
        .upload {
            position: absolute;
            z-index: -1;
            width: 0;
            height: 0;
            margin: 0;
            padding: 0;
            top: 0;
            left: 0;
            background-color: transparent;
            border: none;
            outline: none;
        }
    }
</style>

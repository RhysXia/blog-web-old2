<template lang="pug">
    .c-editor
        .c-editor__toolbar--wrapper(:class="toolbarClasses",v-if="fixedTop==undefined")
            .c-editor__toolbar
                span(@click="showEmoji",v-clickoutside="hideEmoji")
                    i.fa.fa-smile-o
                span(@click="imageClick")
                    i.fa.fa-image
                span(@click="inputLink")
                    i.fa.fa-link
                span(@click="inputCode")
                    i.fa.fa-code
                span(@click.stop="preview=!preview")
                    i.fa.fa-eye
            ul.c-editor__emoji--popup(v-show="isEmojiShow")
                li(v-for="(emoji,index) in emojis",:key="index",v-html="emojiImages[index]",@click="inputEmoji(index)")
        .c-editor__toolbar--wrapper(:class="toolbarClasses",v-else,v-fixed="fixedTop")
            .c-editor__toolbar
                span(@click="showEmoji",v-clickoutside="hideEmoji")
                    i.fa.fa-smile-o
                span(@click="imageClick")
                    i.fa.fa-image
                span(@click="inputLink")
                    i.fa.fa-link
                span(@click="inputCode")
                    i.fa.fa-code
                span(@click.stop="preview=!preview")
                    i.fa.fa-eye
            ul.c-editor__emoji--popup(v-show="isEmojiShow")
                li(v-for="(emoji,index) in emojis",:key="index",v-html="emojiImages[index]",@click="inputEmoji(index)")
        .c-editor__body(:class="bodyClasses")
            c-input.c-editor__content(type="textarea",autoSize,:minHeight="minHeight",v-model="content")
            transition(name="c-editor__preview--slide",mode="out-in")
                .c-editor__preview(v-html="markdownContent",v-if="preview",v-clickoutside="outClick")
        input.c-editor__upload(type="file",ref="upload",@change="inputImage")

</template>
<script>
  import markdown from '~/utils/markdown'
  import CInput from '~/components/common/input'
  import { getPos, setPos } from '~/utils/clip'
  import clickoutside from '~/utils/directive/clickoutside'
  import fixed from '~/utils/directive/fixed'

  export default {
    name: 'c-editor',
    directives: {
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
      minHeight: {
        type: Number,
        default: 200
      },
      // top/bottom
      barPosition: {
        type: String,
        default: 'top'
      },
      fixedTop: {
        type: Number
      }
    },
    data () {
      return {
        isEmojiShow: false,
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
      toolbarClasses () {
        if (this.barPosition === 'top') {
          return ['c-editor__toolbar--wrapper--top']
        } else {
          return ['c-editor__toolbar--wrapper--bottom']
        }
      },
      bodyClasses () {
        if (this.barPosition === 'top') {
          return ['c-editor__body--top']
        } else {
          return ['c-editor__body--bottom']
        }
      },
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
      showEmoji () {
        this.isEmojiShow = true
      },
      hideEmoji () {
        this.isEmojiShow = false
      },
      outClick () {
        this.preview = false
      },
      inputEmoji (index) {
        this.insert(this.emojiImages[index])
      },
      inputCode () {
        this.insert('```lang\n\n\n```', 3, 7)
      },
      imageClick () {
        if (this.imageUpload) {
          this.$refs.upload.click()
        } else {
          this.insert(`![name](url)`, 2, 6)
        }
      },
      inputImage (e) {
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
    },
    components: {
      CInput
    }
  }
</script>
<style lang="scss">
    @import "~assets/scss/variables";

    .c-editor {
        display: flex;
        flex-direction: column;
        .c-editor__toolbar--wrapper {
            position: relative;
            display: flex;
            z-index: 1;
            box-sizing: border-box;
        }

        .c-editor__toolbar--wrapper--top {
            order: 1;
            .c-editor__toolbar {
                border-bottom: none;

            }
            .c-editor__emoji--popup {
                top: 100%;
            }
        }

        .c-editor__toolbar--wrapper--bottom {
            order: 2;
            .c-editor__toolbar {
                border-top: none;

            }
            .c-editor__emoji--popup {
                bottom: 100%;
            }
        }

        .c-editor__toolbar {
            position: relative;
            display: flex;
            width: 100%;
            flex-direction: row;
            align-items: center;
            background-color: $editor-bg-color;
            border: 1px solid $border-color;
            span {
                display: inline-block;
                box-sizing: border-box;
                padding: 0.4em 0.8em;
                cursor: pointer;
                i {
                    font-size: 1.2em;
                }
                transition: 0.2s ease-in-out;
                &:hover {
                    background-color: $editor-toolbar-bg-color--hover;
                    color: $editor-toolbar-color--hover;
                }
            }

            &.c-editor__toolbar--active {
                span {
                    background-color: $editor-toolbar-bg-color--hover;
                    color: $editor-toolbar-color--hover;
                }
            }
        }

        .c-editor__emoji--popup {
            left: 0;
            right: 50%;
            list-style: none;
            margin: 0.5em;
            padding: 0;
            position: absolute;
            z-index: 1;
            box-shadow: $editor-toolbar-popup-shadow;
            background-color: $editor-popup-color;
            li {
                display: inline-block;
                cursor: pointer;
                width: 1.5em;
                height: 1.5em;
                margin: 0.25em;
                text-align: center;
                vertical-align: middle;
                line-height: 1.5em;
                transition: 0.2s ease-in-out;
                &:hover {
                    background-color: $editor-toolbar-bg-color--hover;
                    transform: scale(1.1, 1.1);
                }
            }
        }

        .c-editor__body {
            position: relative;
            display: flex;
            width: 100%;
            .c-editor__content{
                width: 100%;
            }
        }

        .c-editor__body--top {
            order: 2;
            .c-input__wrapper {
                border-top-right-radius: 0;
                border-top-left-radius: 0;
            }
        }

        .c-editor__body--bottom {
            order: 1;
            textarea {
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
            }
        }

        .c-editor__preview {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: $editor-preview-bg-color;
            padding: 0.5em;
            margin: 1px;
            overflow: auto;
        }

        .c-editor__preview--slide-enter-active,
        .c-editor__preview--slide-leave-active {
            transform-origin: 0 0;
            transition: transform 0.2s ease-in-out;
        }

        .c-editor__preview--slide-enter,
        .c-editor__preview--slide-leave-to {
            transform: scaleY(0);
        }
        .c-editor__preview--slide-enter-to,
        .c-editor__preview--slide-leave {
            transform: scaleY(1);
        }

        .c-editor__upload {
            display: none;
        }
    }

</style>

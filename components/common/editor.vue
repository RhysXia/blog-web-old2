<template lang="pug">
    .c-editor(:style="barPosition==='top'?'border-bottom-width:1px':'border-top-width:1px'")
        .c-editor__button-list(:style="barStyle",v-fixed="fixedTop",v-if="fixedTop!=undefined")
            span(@mouseenter="showEmoji=true",@mouseleave="showEmoji=false")
                i.fa.fa-smile-o
                .c-editor__emoji-list(:style="barPosition==='top'?'top:100%;':'bottom:100%'",v-show="showEmoji")
                    span(v-for="(emoji,index) in emojis",:key="index",v-html="emojiImages[index]",@click="inputEmoji(index)")
            span(@click="imageClick")
                i.fa.fa-image
            span(@click="inputLink")
                i.fa.fa-link
            span(@click="inputCode")
                i.fa.fa-code
            span(@click.stop="preview=!preview")
                i.fa.fa-eye
            .c-editor__slot
                slot(name="button")
        .c-editor__button-list(:style="barStyle",v-else)
            span(@mouseenter="showEmoji=true",@mouseleave="showEmoji=false")
                i.fa.fa-smile-o
                .c-editor__emoji-list(:style="barPosition==='top'?'top:100%;':'bottom:100%'",v-show="showEmoji")
                    span(v-for="(emoji,index) in emojis",:key="index",v-html="emojiImages[index]",@click="inputEmoji(index)")
            span(@click="imageClick")
                i.fa.fa-image
            span(@click="inputLink")
                i.fa.fa-link
            span(@click="inputCode")
                i.fa.fa-code
            span(@click.stop="preview=!preview")
                i.fa.fa-eye
            .c-editor__slot
                slot(name="button")
        input.c-editor__input(type="file",ref="upload",@change="inputImage")
        .c-editor__content-wrapper(:style="editorStyle")
            textarea.c-editor__content(ref="textarea",v-autoheight="textHeight",v-model="content")
            transition(name="c-editor__content__preview--animation",mode="out-in")
                .c-editor__content__preview(v-html="markdownContent",v-if="preview",v-clickoutside="outClick")

</template>
<script>
  import markdown from '~/utils/markdown'
  import { getPos, setPos } from '~/utils/clip'
  import autoheight from '~/utils/directive/auto-height'
  import clickoutside from '~/utils/directive/clickoutside'
  import fixed from '~/utils/directive/fixed'

  export default {
    name: 'c-editor',
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
      },
      fixedTop: {
        type: Number
      }
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
      barStyle () {
        if (this.barPosition === 'top') {
          return {
            order: '1'
          }
        }
        return {
          order: '2'
        }
      },
      editorStyle () {
        if (this.barPosition === 'top') {
          return {
            order: '2'
          }
        }
        return {
          order: '1'
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
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins";

    @include slide(c-editor__content__preview--animation, bottom, 0.5s)
    .c-editor{
        display: flex;
        flex-direction: column;
        background-color: $color-background;
        position: relative;
        border: 1px solid $color-border-base;
        border-top-width: 0;
        border-bottom-width: 0;
        .c-editor__button-list {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
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
                &:hover {
                    background-color: rgba(200, 200, 200, 0.5);
                }
                .c-editor__emoji-list {
                    z-index: $z-index-l;
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
            .c-editor__slot {
                position: relative;
                display: block;
                height: 100%;
                width: 100%;
                box-sizing: border-box;
            }
        }
        .c-editor__input {
            display: none;
        }
        .c-editor__content-wrapper {
            position: relative;
            .c-editor__content,
            .c-editor__content__preview {
                padding: 0.5em;
                box-sizing: border-box;
            }
            .c-editor__content {
                border: none;
                outline: none;
                width: 100%;
                background-color: transparent;
                resize: none;
                display: block;
            }
            .c-editor__content__preview {
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                left: 0;
                overflow: auto;
                background-color: rgba(255, 255, 255, 0.8);
            }
        }

    }
</style>

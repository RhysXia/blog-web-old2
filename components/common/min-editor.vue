<template lang="pug">
    .c-min-editor-container
        .editor(v-model="content",contenteditable)
        .actions
            button(@mouseenter="showEmoji=true",@mouseleave="showEmoji=false")
                .emoji-list(v-show="showEmoji")
                    span(v-for="(emoji,index) in emojis",:key="index",v-html="emojiImages[index]",@click="inputEmoji(index)")
                i.fa.fa-smile-o
            button
                i.fa.fa-image
            button
                i.fa.fa-link
            button
                i.fa.fa-code

</template>

<script>
  import markdown from '~/utils/markdown'

  export default {
    name: 'min-editor',
    data () {
      return {
        showEmoji: false,
        content: '',
        emojis: [
          ':(', ':")', '</3', ':/', ':,(', ':(', '<3', ']:(',
          'o:)', ':\'D', ':*', 'x-)', ':|', ':o', ':@', ':D',
          ':)', ']:)', ';-(', ':P', '8-)', ',:(', ',:)',
          ':s', ';)'
        ]
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
      }
    },
    methods: {
      inputEmoji (index) {

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
        .editor {
            min-height: 6em;
            max-height: 18em;
            outline: none;
            padding: 0.5em;
            background-color: transparent;
            /*border: none;*/
            word-break: break-all;
        }
        .actions {
            border-top: 1px solid $color-border-base;
            background-color: rgba(225, 225, 255, 0.5);
            position: relative;
            font-size: 1.2em;
            button {
                background-color: transparent;
                border-radius: 0;
                padding: 0.25em 0.5em;
                &:hover {
                    background-color: rgba(225, 225, 255, 0.8);
                }
            }
            .emoji-list {
                position: absolute;
                bottom: 110%;
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
    }
</style>

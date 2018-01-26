<template lang="pug">
    .c-comment-item-container
        .c-comment-wrapper
            nuxt-link(:to="'/loginUser/'+comment.author.id")
                avatar.left(:width="60",:height="60",:imgUrl="comment.author.avatar")
            .right
                .top
                    nuxt-link(:to="'/loginUser/'+comment.author.id")
                        b.name {{comment.author.nickname}}
                    span.info.light {{comment.author.info}}
                    b.floor.light \#{{comment.floorNum}}
                .middle
                    .content(v-html="content")
                .bottom.light
                    span
                        i.fa.fa-clock-o
                        | {{comment.createAt | formatDate}}
                    button(@click="$emit('reply')",v-if="isLogin")
                        i.fa.fa-reply
                        | 回复
                    //button
                        i.fa.fa-hand-pointer-o
                        | 顶
                    button.delete(@click="$emit('delete')",v-if="showDelete")
                        i.fa.fa-remove
                        | 删除
        .reply(v-for="reply in comment.replies",:key="reply.id")
            nuxt-link(:to="'/loginUser/'+reply.author.id")
                avatar.left(:width="50",:height="50",:imgUrl="reply.author.avatar")
            .right
                .top
                    nuxt-link(:to="'/loginUser/'+reply.author.id")
                        b.name {{reply.author.nickname}}
                    span.info.light {{reply.author.info}}
                .middle
                    .content(v-html="reply.content")
                .bottom.light
                    span
                        i.fa.fa-clock-o
                        | {{reply.createAt | formatDate}}

</template>
<script>
  import Avatar from '../common/avatar'
  import markdown from '~/utils/markdown'

  export default {
    name: 'c-comment-item',
    props: {
      comment: {
        type: Object,
        default: () => {
        }
      }
    },
    data () {
      return {
        reply: {
          content: '',
          contentType: 'MARKDOWN'
        }
      }
    },
    computed: {
      isLogin () {
        return this.$store.getters.isLogin
      },
      loginUser () {
        return this.$store.state.loginUser
      },
      content () {
        const content = this.comment.content
        if (this.comment.contentType === 'MARKDOWN') {
          return markdown(content)
        } else {
          return content
        }
      },
      // 评论是自己的或者自己是文章作者，都可以删除评论
      showDelete () {
        return this.isLogin &&
          (this.loginUser.id === this.comment.author.id || this.loginUser.id === this.comment.article.author.id)
      }
    },
    components: {
      Avatar
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .c-comment-item-container {
        position: relative;
        .c-comment-wrapper ,.reply{
            padding: 0.7em;
            border-radius: 5px;
            display: flex;
            flex-direction: row;
            background-color: $color-background;
        }
        .left {
            margin-right: 0.5em;
        }
        .right {
            position: relative;
            width: 100%;
            .top {
                width: 100%;
                > * {
                    margin-right: 0.6em;
                    &:last-child {
                        margin-right: 0;
                    }
                }
                .name {
                    font-size: 1.15em;
                }
                .floor {
                    float: right;
                }
            }
            .middle {
                position: relative;
                font-size: 0.8em;
                padding: 0.2em 0;
            }
            .bottom {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                > * {
                    margin-right: 0.5em;
                }
                button {
                    background-color: transparent;
                    font-weight: bold;
                    color: inherit;
                    padding: 0.25em;
                    border: none;
                    &:hover {
                        color: $color-text-deep;
                    }
                    i {
                        padding-right: 0.25em;
                    }
                }
                .delete {
                    color: $color-danger;
                    &:hover {
                        color: color-active($color-danger);
                    }
                }
            }
            .light {
                color: $color-text-light;
            }
        }
        .reply {
            font-size: 0.8em;
            margin-left: 3em;
            margin-top: 0.5em;
        }
    }
</style>

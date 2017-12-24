<template lang="pug">
    .c-comment-item-container
        nuxt-link(:to="'/user/'+comment.author.id")
            avatar.left(:width="60",:height="60",:imgUrl="comment.author.avatar")
        .right
            .top
                nuxt-link(:to="'/user/'+comment.author.id")
                    b.name {{comment.author.nickname}}
                span.info.light {{comment.author.info}}
                b.floor.light \#{{comment.floorNum}}
            .middle
                show-more(:hiddenHeight="100")
                    .content(v-html="content")
            .bottom.light
                span
                    i.fa.fa-clock-o
                    | {{comment.createTime | formatDate}}
                button
                    i.fa.fa-reply
                    | 回复
                button
                    i.fa.fa-hand-pointer-o
                    | 顶
                button.delete(@click="$emit('item-delete')",v-if="isLogin && user.id===comment.author.id")
                    i.fa.fa-remove
                    | 删除
</template>
<script>
  import Avatar from '../common/avatar'
  import markdown from '~/utils/markdown'
  import ShowMore from '../common/show-more'

  export default {
    name: 'comment-item',
    props: {
      comment: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      isLogin () {
        return this.$store.getters.isLogin
      },
      user () {
        return this.$store.state.user
      },
      content () {
        const content = this.comment.content
        if (this.comment.contentType === 'MARKDOWN') {
          return markdown(content)
        } else {
          return content
        }
      }
    },
    components: {
      Avatar,
      ShowMore
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";


    .c-comment-item-container {
        background-color: $color-background;
        padding: 0.7em;
        border-radius: 5px;
        position: relative;
        display: flex;
        flex-direction: row;
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
    }
</style>

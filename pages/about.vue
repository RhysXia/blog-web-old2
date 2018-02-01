<template lang="pug">
    .about
        c-row(type="flex",:gutter="16")
            c-col(:span="18")
                .about-left
                    ul
                        li
                            span
                                i.fa.fa-user
                                | I'm Rhys Xia, a student of Southeast University in Suzhou,Jiangsu,China.
                        li
                            span
                                i.fa.fa-github
                                a(href="https://github.com/RhysXia",target="_blank") https://github.com/RhysXia
                        li
                            span
                                i.fa.fa-heart
                                | Coding,Thinking,Beauty
                        li
                            span
                                i.fa.fa-code
                                | Coding All My Life
            c-col(:span="6")
                .about-right
                    .right
                        .top
                        .bottom
                            h2.name Rhys Xia
                            p.desc JAVA/JS Developer
                        nuxt-link(to="/")
                            img.avatar(src="~assets/img/me.jpg")
        iframe.map-container(src="/html/map.html")
</template>
<script>
  export default {
    head () {
      return {
        title: '关于我'
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/application";

    .about {
        .about-left,
        .about-right {
            padding: 1em;
            background-color: $bg-color;
            height: 100%;
            box-sizing: border-box;
        }
        .about-left {
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            font-size: 1.1em;
            li {
                margin-bottom: 2em;
                &:last-child {
                    margin-bottom: 0;
                }
                span {
                    i {
                        display: inline-block;
                        color: $primary-color;
                        width: 2em;
                    }
                }
            }
        }
        .right {
            position: relative;
            .top {
                height: 8em;
                background-color: $primary-color;
            }
            .bottom {
                text-align: center;
                margin-top: 5em;
                > * {
                    margin-bottom: 2em;
                    &:last-child {
                        margin-bottom: 5em;
                    }
                }

            }
            .avatar {
                position: absolute;
                top: 8em - 3;
                left: calc(50% - 3em);
                width: 6em;
                height: 6em;
                border-radius: 50%;
                transition: transform 0.4s ease-in-out;
                cursor: pointer;
                &:hover {
                    transform: rotate(360deg);
                }
            }
        }
        .map-container {
            width: 100%;
            height: 200px;
            margin-top: 1em;
            box-sizing: border-box;
            outline: none;
            border: none;
            padding: 1em;
            background-color: $color-background;
        }
    }
</style>

<template lang="pug">
    .about-container
        c-row(type="flex",:gutter="16",justify="start")
            c-col(:span="16")
                .left-wrapper
                    ul.left
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
            c-col(:span="8")
                .right-wrapper
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
        head() {
            return {
                title: '关于我'
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .about-container {
        .left-wrapper,
        .right-wrapper {
            display: block;
            height: 100%;
            background-color: $color-background;
        }
        .left,
        .right {
            padding: 1rem;
        }
        .left {
            font-size: 1.1rem;
            li {
                margin-bottom: 2rem;
                &:last-child {
                    margin-bottom: 0;
                }
                span {
                    i {
                        display: inline-block;
                        color: $color-primary;
                        width: 2rem;
                    }
                }
            }
        }
        .right {
            position: relative;
            .top {
                height: 8rem;
                background-color: $color-success;
            }
            .bottom {
                text-align: center;
                margin-top: 5rem;
                > * {
                    margin-bottom: 2rem;
                    &:last-child {
                        margin-bottom: 5rem;
                    }
                }

            }
            .avatar {
                position: absolute;
                top: 9 - 3rem;
                left: #{'calc(50% - 3rem)'};
                width: 6rem;
                height: 6rem;
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
            margin-top: 1rem;
            box-sizing: border-box;
            outline: none;
            border: none;
            padding: 1rem;
            background-color: $color-background;
        }
    }
</style>

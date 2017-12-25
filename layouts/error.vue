<template lang="pug">
    .error-page
        .error-wrapper
            h1.error-code {{ error.statusCode }}
            .error-wrapper-message
                h2.error-message {{ error.message }}
            p(v-if="error.statusCode === 404")
                nuxt-link.error-link(to="/") Back to the home page
</template>
<script>

    export default {
        name: 'nuxt-error',
        props: ['error'],
        head() {
            return {
                title: this.error.message || 'An error occured'
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/scss/variables";

    .error-page {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: $color-background;
        .error-wrapper {
            position: absolute;
            display: inline-block;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -70%);
            text-align: center;
            .error-code{
                font-size: 5rem;
                border-bottom: 1px solid $color-border-base;
                margin: 0;
            }
            .error-wrapper-message{
                .error-message{
                    font-size: 2rem;
                }
            }
        }
    }

</style>
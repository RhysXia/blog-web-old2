<template lang="pug">
    .setting-container
        c-breadcrumb.breadcrumb(separator="/")
            c-breadcrumb-item(to="/") 首页
            c-breadcrumb-item 设置
        span xxx
</template>

<script>
  import { CBreadcrumb, CBreadcrumbItem } from '~/components/common/breadcrumb'

  export default {
    name: 'setting',
    validate ({store}) {
      return store.getters.isLogin
    },
    async asyncData ({store, error}) {
      try {
        const result = {
          user: {}
        }
        let res = await store.$api.user.getSelf()
        result.user = res.data

        return result
      } catch (err) {
        error(err)
      }
    },
    components: {
      CBreadcrumb,
      CBreadcrumbItem
    }
  }
</script>

<style scoped>
    .setting-container{
        .breadcrumb{
            margin-bottom: 1rem;
        }
    }
</style>

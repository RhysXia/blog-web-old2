module.exports = {
  head: {
    title: 'Ryths Blog',
    titleTemplate: '%s | ryths.cn',
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      lang: 'zh-CN'
    },
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'author', content: 'Rhys Xia,1406974720@qq.com'},
      {name: 'keywords', content: 'blog,Ryths,IT,JAVA,Vue,前端,后端,研究生'},
      {name: 'description', content: '个人技术博客，分享知识，寻找志同道合的朋友'},
      {name: 'copyright', content: 'Rhys Xia'}
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }

      // {

      //   rel: 'stylesheet',
      //   href: 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
      // }
    ],
    noscript: [
      {innerHTML: 'This website requires JavaScript.'}
    ]
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },

  css: [
    '~/assets/scss/public.scss'
  ],

  loading: {color: '#409eff', failedColor: '#f56c6c'},
  plugins: [
    '~/plugins/http',
    '~/plugins/token',
    '~/plugins/filters',
    '~/plugins/components',
    {src: '~/plugins/velocity', ssr: false}
  ],
  build: {
    vendor: [
      '~/plugins/http',
      '~/plugins/token',
      '~/plugins/filters',
      'velocity-animate'
    ],
    extractCSS: true,
    extend (config, {isDev}) {
      // if (!isDev) {
      //   const OfflinePlugin = require('offline-plugin')
      //   config.plugins.push(new OfflinePlugin())
      // }
    }
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      // savedPosition is only available for popstate navigations.
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        // if no children detected
        if (to.matched.length < 2) {
          // scroll to the top of the page
          position = {x: 0, y: 0}
        }
        else if (to.matched.some(
            (r) => r.components.default.options.scrollToTop)) {
          // if one of the children has scrollToTop option set to true
          position = {x: 0, y: 0}
        }
        // if link has anchor,  scroll to anchor by returning the selector
        if (to.hash) {
          position = {selector: to.hash}
        }
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(position)
          }, 200)
        })
      }
    },
    middleware: [
      'change-col-page'
    ]
  }
}

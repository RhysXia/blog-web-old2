module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Ryths Blog',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '/css/normalize.css'},
      {rel: 'stylesheet', href: '/css/font-awesome.min.css'}
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/stylus/main.styl'],
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  plugins: [
    '~/plugins/filters'
  ]
}

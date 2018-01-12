export default ({req, store}, inject) => {
  if (process.env.NODE_ENV === 'production') {
    const OfflinePlugin = require('offline-plugin/runtime')
    window.onNuxtReady(() => {
      OfflinePlugin.install({
        onInstalled: function () {
          console.log('Offline plugin installed.')
        },
        onUpdating: function () {

        },
        onUpdateFailed: function () {
          console.log('Offline plugin failed')
        },
        onUpdateReady: function () {
          OfflinePlugin.applyUpdate()
        },
        onUpdated: function () {
          window.location.reload()
        }
      })
    })
  }
}
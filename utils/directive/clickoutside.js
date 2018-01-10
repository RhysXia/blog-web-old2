export default {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        let value = binding.value
        if (typeof value === 'function') {
          value(e)
        } else {
          console.error('please give a function')
        }
      }
    }

    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update () {

  },
  unbind (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}

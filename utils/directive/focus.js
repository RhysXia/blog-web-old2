export default {
  inserted (el, binding, vnode) {
    // 判断是不是组件
    const instance = vnode.componentInstance
    if (instance) {
      // 调用他的focus方法
      instance.focus && instance.focus()
    } else {
      el.focus()
    }
  },
  update () {

  },
  unbind (el, binding) {

  }
}

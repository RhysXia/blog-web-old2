import { getOffsetLeft, getOffsetTop } from '../utils'

/**
 * 固定组件位置
 */

export default {
  bind (el, binding, vNode) {
  },
  inserted: (el, binding, vNode) => {
    init(el, binding, vNode)
    updatePos(el, binding, vNode)
    const scroll = () => {
      updatePos(el, binding, vNode)
    }
    const resize = () => {
      init(el, binding, vNode)
      updatePos(el, binding, vNode)
    }
    el.__scroll__ = scroll
    el.__resize__ = resize
    window.addEventListener('scroll', scroll)
    window.addEventListener('resize', resize)
  },
  componentUpdated (el, binding, vNode, oldVNode) {
    init(el, binding, vNode)
    updatePos(el, binding, vNode)
  },
  unbind (el, binding) {
    window.removeEventListener('scroll', el.__scroll__)
    window.removeEventListener('resize', el.__resize__)
  }
}

/**
 * 初始化数据
 * @param el
 * @param binding
 * @param vNode
 */
const init = (el, binding, vNode) => {
  resetStyle(el, binding, vNode)
  el.__initTop__ = getOffsetTop(el)
  el.__initLeft__ = getOffsetLeft(el)
  el.__fixedTop__ = binding.value || el.__initTop__
  let width = el.offsetWidth
  const style = window.getComputedStyle(el, null)

  const boxSizing = style.getPropertyValue('box-sizing')
  if (boxSizing === 'border-box') {
    const borderSize = (
      parseFloat(style.getPropertyValue('border-left-width')) +
      parseFloat(style.getPropertyValue('border-right-width'))
    )
    width = width + borderSize
  } else if (boxSizing === 'content-box') {
    const paddingSize = (
      parseFloat(style.getPropertyValue('padding-left')) +
      parseFloat(style.getPropertyValue('padding-right'))
    )
    width = width - paddingSize
  }
  el.__initWidth__ = width
}

const updatePos = (el, binding, vNode) => {
  const top = getOffsetTop(el)
  const scrollTop = (document.documentElement || document.body).scrollTop
  if (top <= el.__initTop__ - scrollTop) {
    resetStyle(el, binding, vNode)
    return
  }

  if (el.__fixed__) {
    return
  }

  if (top <= el.__fixedTop__ + scrollTop) {
    el.style.position = 'fixed'
    el.style.left = el.__initLeft__ + 'px'
    el.style.top = el.__fixedTop__ + 'px'
    el.style.width = el.__initWidth__ + 'px'
    el.__fixed__ = true
  }
}

const resetStyle = (el, binding, vNode) => {
  el.style.position = ''
  el.style.width = ''
  el.style.left = ''
  el.style.top = ''
  const styles = vNode.data.staticStyle || vNode.data.style || {}
  Object.keys(styles).forEach(key => {
    el.style[key] = styles[key]
  })
  el.__fixed__ = false
}

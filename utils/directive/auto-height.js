/**
 * 使组件的高度根据内容变化
 */

export default {
  bind (el, binding, vNode) {
    initData(el, binding, vNode)
    onInput(el, binding, vNode)
    el.oninput = e => {
      onInput(el, binding, vNode)
    }
  },
  componentUpdated (el, binding, vNode, oldVnode) {
    initData(el, binding, vNode)
    onInput(el, binding, vNode)
  },
  unbind (el, binding) {
    document.body.removeChild(el.__copy)
  }
}

let HIDDEN_STYLE = {
  height: '0 !important',
  visibility: 'hidden !important',
  overflow: 'hidden !important',
  position: 'absolute !important',
  'z-index': '-1000 !important',
  top: '0 !important',
  right: '0 !important'
}

HIDDEN_STYLE = Object.keys(HIDDEN_STYLE).
  map(it => `${it}:${HIDDEN_STYLE[it]}`).
  join(';')

const initData = (el, binding, vNode) => {
  let minHeight = 0
  let maxHeight = 0
  const value = binding.value
  if (typeof value === 'object') {
    minHeight = value.min || 0
    maxHeight = value.max || 0
  } else if (typeof value === 'number') {
    minHeight = value
  }
  try {
    minHeight = Number(minHeight)
    maxHeight = Number(maxHeight)
  } catch (err) {
    console.warn(
      'the value should be Number or Object:{min:Number,max:Number}')
  }

  el.__minHeight = minHeight
  el.__maxHeight = maxHeight

  if (minHeight > 0) {
    el.style.minHeight = minHeight + 'px'
  }

  if (maxHeight > 0) {
    el.style.maxHeight = maxHeight + 'px'
  }

  let copy = el.__copy
  if (!copy) {
    copy = el.__copy = el.cloneNode()
    document.body.appendChild(copy)
  }
  const style = window.getComputedStyle(el)
  const contextStyle = CONTEXT_STYLE.map(
    name => `${name}:${style.getPropertyValue(name)}`).join(';')

  copy.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`)
}

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
]

const onInput = (el, binding, vNode) => {
  const copy = el.__copy

  copy.value = el.value || el.placeholder || ''

  const style = window.getComputedStyle(copy)

  let height = copy.scrollHeight

  const boxSizing = style.getPropertyValue('box-sizing')
  if (boxSizing === 'border-box') {
    const borderSize = (
      parseFloat(style.getPropertyValue('border-bottom-width')) +
      parseFloat(style.getPropertyValue('border-top-width'))
    )
    height = height + borderSize
  } else if (boxSizing === 'content-box') {
    const paddingSize = (
      parseFloat(style.getPropertyValue('padding-bottom')) +
      parseFloat(style.getPropertyValue('padding-top'))
    )
    height = height - paddingSize
  }
  if (height < el.__minHeight) {
    el.style.height = el.__minHeight + 'px'
  } else if (el.__maxHeight > 0 && height > el.__maxHeight) {
    el.style.height = el.__maxHeight + 'px'
  } else {
    el.style.height = height + 'px'
  }
}

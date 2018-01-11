export default {
  bind (el, binding, vnode) {
    el.oncopy = copy
  }
}

const copyText = () => {
  return [
    '著作权归作者所有。',
    '商业转载请联系作者获得授权，非商业转载请注明出处。',
    '作者：Rhys Xia',
    '链接：' + location.href,
    '来源：rhys.site'
  ].join('\n')
}

const copy = (e) => {
  if (!window.getSelection) return
  e.clipboardData.setData('text/plain', copyText())
  e.preventDefault()
}

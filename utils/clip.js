// 获取元素上光标选中的位置
export const getPos = element => {
  const start = element.selectionStart
  const end = element.selectionEnd
  return {start, end}
}

// 将光标设置到指定元素上起止位置
export const setPos = (element, start, end) => {
  if (element.setSelectionRange) {
    element.focus()
    element.setSelectionRange(start, end)
  } else if (element.createTextRange) {
    const range = element.createTextRange()
    range.collapse(true)
    range.moveEnd('character', start)
    range.moveStart('character', end)
    range.select()
  }
}

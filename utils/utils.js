/**
 * 向上查找指定名称的组件
 * @param context
 * @param componentName
 * @returns {*}
 */
export function findComponentUpward (context, componentName) {
  let parent = context.$parent
  while (parent && parent.$options.name !== componentName) {
    parent = parent.$parent
  }
  return parent
}

/**
 * 向下查找指定名称的组件
 * @param context
 * @param componentName
 * @param depth 查询深度，不传则查询所有
 */
export function findComponentsDownward (context, componentName, depth) {
  if (depth !== undefined && depth <= 0) {
    return []
  }
  const components = []
  context.$children.forEach(item => {
    if (item.$options.name === componentName) {
      components.push(item)
    }
    findComponentsDownward(item, componentName, depth ? depth - 1 : undefined).
      forEach(item2 => {
        components.push(item2)
      })
  })
  return components
}

/**
 * 获取元素距页面顶部的距离
 * @param element
 * @returns {number}
 */
export function getOffsetTop (element) {
  let offsetTop = element.offsetTop
  let parent = element.offsetParent
  while (parent) {
    offsetTop += parent.offsetTop
    parent = parent.offsetParent
  }
  return offsetTop
}

/**
 * 获取元素距页面左侧的距离
 * @param element
 * @returns {number}
 */
export function getOffsetLeft (element) {
  let offsetLeft = element.offsetLeft
  let parent = element.offsetParent
  while (parent) {
    offsetLeft += parent.offsetLeft
    parent = parent.offsetParent
  }
  return offsetLeft
}

/**
 * 获取元素在浏览器中的距顶边框的距离
 * @param element
 * @returns {number}
 */
export function getViewTop (element) {
  const scrollTop = document.documentElement.scrollTop ||
    document.body.scrollTop
  const offsetTop = getOffsetTop(element)
  return offsetTop - scrollTop
}

/**
 * 获取元素在浏览器中剧左边框的距离
 * @param element
 * @returns {number}
 */
export function getViewLeft (element) {
  const scrollLeft = document.body.scrollLeft ||
    document.documentElement.scrollLeft
  return getOffsetLeft(element) - scrollLeft
}

/**
 * 深拷贝
 * @param obj
 * @returns {*}
 */
export function clone (obj) {
  if (obj === null) {
    return null
  }
  if (obj === undefined) {
    return undefined
  }
  let newObj = {}
  if (obj instanceof Array) {
    newObj = []
  }
  for (let key in obj) {
    const val = obj[key]
    newObj[key] = typeof val === 'object' ? clone(val) : val
  }
  return newObj
}

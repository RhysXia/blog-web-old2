export function findComponentUpward(context, componentName) {
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
export function findComponentsDownward(context, componentName, depth) {
    if (depth !== undefined && depth <= 0) {
        return []
    }
    const components = []
    context.$children.forEach(item => {
        if (item.$options.name === componentName) {
            components.push(item)
        }
        findComponentsDownward(item, componentName, depth ? depth - 1 : undefined).forEach(item2 => {
            components.push(item2)
        })
    })
    return components
}

export function oneOf(value, arrays) {
    if (arrays.length) {
        for (const val of arrays) {
            if (value === val) {
                return true
            }
        }
    }
    return false
}

export function getOffsetTop(element) {
    let offsetTop = element.offsetTop
    let parent = element.offsetParent
    while (parent) {
        offsetTop += parent.offsetTop
        parent = parent.offsetParent
    }
    return offsetTop
}

/**
 * 获取元素在浏览器中的距顶边框的距离
 * @param element
 * @returns {number}
 */
export function getViewTop(element) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const offsetTop = getOffsetTop(element)
    return offsetTop - scrollTop
}

/**
 * 获取元素在浏览器中剧左边框的距离
 * @param element
 * @returns {number}
 */
export function getViewLeft(element) {
    let left = element.offsetLeft
    let parent = element.offsetParent
    while (parent) {
        left += parent.offsetLeft
        parent = parent.offsetParent
    }
    const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft
    return left - scrollLeft
}

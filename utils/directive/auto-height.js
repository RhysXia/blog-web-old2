/**
 * 使组件的高度根据内容变化
 */
export default {
    bind(el, binding, vnode) {
        let minHeight = 0
        if (binding.expression) {
            minHeight = binding.value
        }
        el.style.transition = 'height 0.2s ease'
        el.__minHeight__ = minHeight
        // 获取el的实际宽度
        const width = el.scrollWidth
        const copyElement = el.cloneNode(true)
        copyElement.style.visibility = 'hidden'
        copyElement.style.position = 'absolute'
        copyElement.style.top = '0'
        copyElement.style.zIndex = '-1'
        copyElement.style.overflow = 'hidden'
        copyElement.style.width = width + 'px'
        el.style.height = minHeight + 'px'
        document.body.appendChild(copyElement)
        el.__ele__ = copyElement

        el.oninput = e => {

            setStyles(el)
        }


    },
    update(el, binding, vnode, oldVnode) {
        let minHeight = 0
        if (binding.expression) {
            minHeight = binding.value
        }
        el.__minHeight__ = minHeight
        el.__ele__.style.width = width + 'px'
        setStyles(el)
    },
    componentUpdated(el, binding, vnode, oldVnode) {
    },
    unbind(el, binding) {
        const element = el.__ele__
        if (element) {
            document.body.removeChild(element)
        }
    }
}

function setStyles(el) {
    const copyElement = el.__ele__
    const {width, padding, fontSize, lineHeight, border, boxSizing} = document.defaultView.getComputedStyle(el, null)
    // 保证样式影响尺寸的样式相同
    copyElement.style.width = width
    copyElement.style.padding = padding
    copyElement.style.fontSize = fontSize
    copyElement.style.lineHeight = lineHeight
    copyElement.style.border = border
    copyElement.style.boxSizing = boxSizing

    // 设置内容
    copyElement.value = el.value

    const minHeight = el.__minHeight__
    const scrollHeight = copyElement.scrollHeight
    if (scrollHeight > minHeight) {
        el.style.height = scrollHeight + 'px'
    } else {
        el.style.height = minHeight + 'px'
    }
}
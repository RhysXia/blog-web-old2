import {getOffsetTop, getViewLeft} from "../utils";

/**
 * 固定组件位置
 */

export default {
    bind(el, binding, vnode) {

    },
    inserted(el, binding, vnode) {
        el.__top__ = binding.value || 0
        el.__initTop__ = getOffsetTop(el)
        el.__initLeft__ = getViewLeft(el)
        el.__width__ = el.scrollWidth
        el.__vnode__ = vnode

        const updateFunc = () => updatePosition(el)
        const initAndUpdateFunc = () => {
            initSize(el, binding)
            updatePosition(el)
        }
        el.__updateFunc__ = updateFunc
        el.__initAndUpdateFunc__ = initAndUpdateFunc
        window.addEventListener('scroll', updateFunc)
        window.addEventListener('resize', initAndUpdateFunc)
    },
    update(el, binding, vnode, oldVnode) {
        initSize(el, binding)
        updatePosition(el)
    },
    componentUpdated(el, binding, vnode, oldVnode) {

    },
    unbind(el, binding) {
        window.removeEventListener('scroll', el.__updateFunc__)
        window.removeEventListener('resize', el.__initAndUpdateFunc__)
    }
}


function initSize(el, binding) {
    const style = el.__vnode__.data.staticStyle || el.__vnode__.data.style || {}
    el.style.position = style.position || ''
    el.style.top = style.top || ''
    el.style.left = style.left || ''
    el.style.width = style.width || ''

    el.__top__ = binding.value || 0
    el.__initTop__ = getOffsetTop(el)
    el.__initLeft__ = getViewLeft(el)
    el.__width__ = el.scrollWidth
}

function updatePosition(el) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const isFixed = (el.__initTop__ - scrollTop) < el.__top__
    if (isFixed) {
        el.style.position = 'fixed'
        el.style.top = el.__top__ + 'px'
        el.style.left = el.__initLeft__ + 'px'
        el.style.width = el.__width__ + 'px'
    } else {
        const style = el.__vnode__.data.staticStyle || el.__vnode__.data.style || {}
        el.style.position = style.position || ''
        el.style.top = style.top || ''
        el.style.left = style.left || ''
        el.style.width = style.width || ''
    }
}
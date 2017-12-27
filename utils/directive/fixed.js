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
        el.__width__ = el.offsetWidth
        el.__vnode__ = vnode

        function updatePosition() {
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

        el.__updatePosition__ = updatePosition
        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
    },
    update(el, binding, vnode, oldVnode) {
        const style = el.__vnode__.data.staticStyle || el.__vnode__.data.style || {}
        el.style.position = style.position || ''
        el.style.top = style.top || ''
        el.style.left = style.left || ''
        el.style.width = style.width || ''

        el.__top__ = binding.value || 0
        el.__initTop__ = getOffsetTop(el)
        el.__initLeft__ = getViewLeft(el)
        el.__width__ = el.offsetWidth
        el.__vnode__ = vnode
        el.__updatePosition__()
    },
    componentUpdated(el, binding, vnode, oldVnode) {
    },
    unbind(el, binding) {
        window.removeEventListener('scroll', el.__updatePosition__)
        window.removeEventListener('resize', el.__updatePosition__)
    }
}

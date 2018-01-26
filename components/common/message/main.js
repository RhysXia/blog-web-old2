import Vue from 'vue'
import CMessage from './message.vue'

const MessageConstructor = Vue.extend(CMessage)
let seed = 1
let instances = []
let zIndex = 2000
const Message = function (options) {
  if (Vue.prototype.$isServer) {
    return
  }
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }
  let id = 'message_' + seed++
  let userOnClose = options.onClose
  options.onClose = function () {
    Message.close(id, userOnClose)
  }

  const instance = new MessageConstructor({
    propsData: options
  })
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.vm.$el.style.zIndex = `${zIndex++}`
  instances.push(instance)
  return instance.vm
}

Message.close = (id, userOnClose) => {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances[i].vm.$destroy()
      document.body.removeChild(instances[i].vm.$el)
      instances.splice(i, 1)
      break
    }
  }
}

Message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default Message

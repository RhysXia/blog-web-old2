import Vue from 'vue'
import { CCol, CRow } from '~/components/common/grid'
import Message from '~/components/common/message'

export default () => {
  Vue.component('CRow', CRow)
  Vue.component('CCol', CCol)

  Vue.prototype.$message = Message
}

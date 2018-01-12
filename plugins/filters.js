import Vue from 'vue'

export default async ({req, store}, inject) => {
  const filters = {}
  filters.formatDate = dateNum => {
    const date = new Date(dateNum)
    const year = formatNum(date.getFullYear())
    const month = formatNum(date.getMonth() + 1)
    const day = formatNum(date.getDate())
    const hour = formatNum(date.getHours())
    const minute = formatNum(date.getMinutes())
    return `${year}/${month}/${day} ${hour}:${minute}`
  }

  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  /**
   * 将数字格式化为两位
   * @param num
   * @returns {string}
   */
  const formatNum = num => {
    if (num.toString().length === 1) {
      return '0' + num
    } else {
      return num + ''
    }
  }
}

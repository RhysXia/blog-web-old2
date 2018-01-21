module.exports = function moduleOptions () {
  // this.options.transition.css = false
  this.options.transition.beforeEnter = beforeEnter
}

const beforeEnter = el => {
  console.log(1)
}

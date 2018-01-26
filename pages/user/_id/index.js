export default {
  middleware ({redirect, route}) {
    const path = route.path
    redirect(`${path}/info`)
  }
}

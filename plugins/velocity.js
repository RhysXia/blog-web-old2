import Velocity from 'velocity-animate'

export default async (ctx, inject) => {
  inject('velocity', Velocity)
}

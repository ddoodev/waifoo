import { DescendantOfClass } from '../utils'
import { App } from './app'

export const createApp = (root: DescendantOfClass<App>) => {
  const factory = {
    app: new root(),
    async start() {
      await factory.app.start()
      return factory
    }
  }

  return factory
}
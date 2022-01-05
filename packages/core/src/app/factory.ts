import { DescendantOfClass } from '../utils'
import { App } from './app'
import { container } from '../di'

/** Create an application from App */
export const createApp = (root: DescendantOfClass<App>) => {
  const factory = {
    app: container.resolve(root),
    async start() {
      await factory.app.start()
      return factory
    }
  }

  return factory
}
import { DescendantOfClass } from '../utils'
import { App } from './app'
import { container } from '../di'
import { Logger } from '../logger/logger'

/** Create an application from App */
export const createApp = (root: DescendantOfClass<App>) => {
  const factory = {
    app: container.resolve(root),
    async start() {
      await factory.app.start()
      return factory
    },
    logger(logger: Logger) {
      factory.app.logger = logger
      return factory
    }
  }

  return factory
}
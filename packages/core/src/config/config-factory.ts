import { Singleton } from '../di'
import { App } from '../app'
import { DescendantOfClass } from '../utils'
import { Silent } from '../logger'

/** Base configuration */
export abstract class Config extends App {
  abstract get(key: string): Promise<string | undefined>
}

/** Create config app */
export function createConfig(getter: (key: string) => Promise<string | undefined>, init?: () => Promise<void>): DescendantOfClass<Config> {
  @Singleton()
  @Silent()
  class Embedded extends Config {
    async get(key: string) {
      return getter(key)
    }

    async load() {
      await init?.()
      this.logger.done('Loaded configuration')
    }
  }

  return Embedded
}

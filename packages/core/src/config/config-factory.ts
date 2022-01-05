import { Singleton } from '../di'
import { App } from '../app'
import { DescendantOfClass } from '../utils'

/** Base configuration */
export abstract class Config extends App {
  abstract get(key: string): Promise<string | undefined>
}

/** Create config app */
export function createConfig(getter: (key: string) => Promise<string | undefined>, init?: () => Promise<void>): DescendantOfClass<Config> {
  @Singleton()
  class Embedded extends Config {
    async get(key: string) {
      return getter(key)
    }

    async load() {
      await init?.()
    }
  }

  return Embedded
}

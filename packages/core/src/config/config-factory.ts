import { App } from '../app'
import { DescendantOfClass } from '../utils'

export abstract class Config extends App {
  abstract get(key: string): Promise<string | undefined>
}

export function createConfig(getter: (key: string) => Promise<string | undefined>, init?: () => Promise<void>): DescendantOfClass<Config> {
  return class extends Config {
    async get(key: string) {
      return getter(key)
    }

    async load() {
      await init?.()
    }
  }
}

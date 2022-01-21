import { Config } from './config'
import { service, ServiceLifecycle, ServiceDependencies } from '@waifoo/core'
import { config, DotenvConfigOptions } from 'dotenv'
import { inject } from 'tsyringe'
import { configInjectionKey } from './decorators'

export const dotenvInjectionKey = Symbol()

@service()
export class EnvConfig implements Config {
  async get(key: string) {
    return process.env[key]
  }
}

export const createEnvConfig = (): ServiceDependencies => [ {
  token: configInjectionKey,
  useClass: EnvConfig
} ]

@service()
export class DotenvConfig extends EnvConfig implements ServiceLifecycle {
  constructor(@inject(dotenvInjectionKey) private _dotenvConfig: DotenvConfigOptions) {
    super()
  }

  async onInit() {
    config(this._dotenvConfig)
  }
}

export const createDotenvConfig = (config: DotenvConfigOptions = {}): ServiceDependencies => [
  { token: dotenvInjectionKey, useValue: config },
  { token: configInjectionKey, useClass: DotenvConfig }
]
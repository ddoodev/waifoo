import { Config } from './config'
import { service, ServiceLifecycle, ServiceDependencies } from '@waifoo/core'
import { config, DotenvConfigOptions } from 'dotenv'
import { inject } from 'tsyringe'
import { ConfigInjectionKey } from './decorators'

export const DotenvInjectionKey = Symbol()

@service()
export class EnvConfig implements Config {
  async get(key: string) {
    return process.env[key]
  }
}

export const createEnvConfig = (): ServiceDependencies => [ {
  token: ConfigInjectionKey,
  useClass: EnvConfig
} ]

@service()
export class DotenvConfig extends EnvConfig implements ServiceLifecycle {
  constructor(@inject(DotenvInjectionKey) private _dotenvConfig: DotenvConfigOptions) {
    super()
  }

  async onInit() {
    config(this._dotenvConfig)
  }
}

export const createDotenvConfig = (config: DotenvConfigOptions = {}): ServiceDependencies => [
  { token: DotenvInjectionKey, useValue: config },
  { token: ConfigInjectionKey, useClass: DotenvConfig }
]
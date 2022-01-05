import { createConfig } from './config-factory'
import dotenv, { DotenvConfigOptions } from 'dotenv'

/** Config implementation which gets keys from environment */
export const EnvConfig = createConfig(async key => process.env[key])

/** Creates EnvConfig which also initializes dotenv */
export const createDotenvConfig = (config: DotenvConfigOptions) => createConfig(
  async key => process.env[key],
  async () => {
    dotenv.config(config)
  }
)

/** See {@link createDotenvConfig} */
export const DotenvConfig = createDotenvConfig({})
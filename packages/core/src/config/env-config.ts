import { createConfig } from './config-factory'
import dotenv, { DotenvConfigOptions } from 'dotenv'

export const EnvConfig = createConfig(async key => process.env[key])

export const createDotenvConfig = (config: DotenvConfigOptions) => createConfig(
  async key => process.env[key],
  async () => {
    dotenv.config(config)
  }
)
export const DotenvConfig = createDotenvConfig({})
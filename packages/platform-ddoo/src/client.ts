import { App, DescendantOfClass, DotenvConfig, resolve } from '@waifoo/core'
import { ClientBuilder, createApp as createDdooApp, DefaultClientStack, Client } from 'discordoo'

export interface DiscordooClientConfig {
  token: () => Promise<string>
}

export const defaultDiscordooClientConfig: DiscordooClientConfig = {
  async token() {
    const dotenvCfg = resolve(DotenvConfig)
    return await dotenvCfg.get('DISCORD_TOKEN') ?? ''
  }
}

export abstract class DiscordooClient<T extends DefaultClientStack = DefaultClientStack> extends App {
  clientBuilder?: ClientBuilder<T>
  client?: Client<T>

  async load() {
    this.clientBuilder = createDdooApp<T>(await this.getToken())
    this.client = this.clientBuilder.build()
    await this.client.start()
  }

  abstract getToken(): Promise<string>
}

export const createDiscordooClient = 
  <T extends DefaultClientStack = DefaultClientStack>(cfg: Partial<DiscordooClientConfig>): DescendantOfClass<DiscordooClient<T>> => {
    const config = { ...defaultDiscordooClientConfig, ...cfg }
    return class extends DiscordooClient<T> {
      getToken = config.token
    }
  }
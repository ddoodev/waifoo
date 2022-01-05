import { App, DescendantOfClass, DotenvConfig, resolve } from '@waifoo/core'
import { ClientBuilder, createApp as createDdooApp, DefaultClientStack, Client } from 'discordoo'

/**
 * Configuration for {@link DiscordooClient}
 */
export interface DiscordooClientConfig<T extends DefaultClientStack = DefaultClientStack> {
  /** Async function which returns token */
  token: () => Promise<string>
  /** Customize build pipeline */
  builder: (b: ClientBuilder<T>) => ClientBuilder<T>
}

/** Default {@link DiscordooClientConfig} */
export const defaultDiscordooClientConfig: DiscordooClientConfig<DefaultClientStack> = {
  async token() {
    const dotenvCfg = resolve(DotenvConfig)
    return await dotenvCfg.get('DISCORD_TOKEN') ?? ''
  },
  builder: b => b
}

export abstract class DiscordooClient<T extends DefaultClientStack = DefaultClientStack> extends App {
  clientBuilder?: ClientBuilder<T>
  client?: Client<T>

  async load() {
    this.clientBuilder = createDdooApp<T>(await this.getToken())
    this.client = this.customBuilder(this.clientBuilder).build()
    await this.client.start()
  }

  abstract getToken(): Promise<string>
  abstract customBuilder(b: ClientBuilder<T>): ClientBuilder<T>
}

export const createDiscordooClient = 
  <T extends DefaultClientStack = DefaultClientStack>(cfg: Partial<DiscordooClientConfig<T>>): DescendantOfClass<DiscordooClient<T>> => {
    const config = { ...defaultDiscordooClientConfig, ...cfg }
    return class extends DiscordooClient<T> {
      getToken = config.token
      customBuilder = config.builder
    }
  }
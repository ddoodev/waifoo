import { App, DescendantOfClass, DotenvConfig, container, Singleton, Department } from '@waifoo/core'
import { ClientBuilder, createApp as createDdooApp, DefaultClientStack, Client } from 'discordoo'

/**
 * Configuration for {@link DiscordooClient}
 */
export interface DiscordooClientConfig<T extends DefaultClientStack = DefaultClientStack> {
  /** Async function which returns token */
  token: () => Promise<string>
  /** Customize build pipeline */
  builder: (b: ClientBuilder<T>) => ClientBuilder<T>
  /** Logging department, left empty if silent */
  department: string
}

/** Default {@link DiscordooClientConfig} */
export const defaultDiscordooClientConfig: DiscordooClientConfig<DefaultClientStack> = {
  async token() {
    const dotenvCfg = container.resolve(DotenvConfig)
    return await dotenvCfg.get('DISCORD_TOKEN') ?? ''
  },
  builder: b => b,
  department: 'Discordoo'
}

/** Abstract DiscordooClient. Responsible for creating custom Discordoo client */
export abstract class DiscordooClient<T extends DefaultClientStack = DefaultClientStack> extends App {
  /** Builder used */
  clientBuilder?: ClientBuilder<T>
  /** Resulting client */
  client?: Client<T>

  async load() {
    this.clientBuilder = createDdooApp<T>(await this.getToken())
    this.client = this.customBuilder(this.clientBuilder).build()
    await this.client.start()
    this.logger.log()
  }

  /** Async function which will return token */
  abstract getToken(): Promise<string>
  /** Custom client builder */
  abstract customBuilder(b: ClientBuilder<T>): ClientBuilder<T>
}

/** Create DiscordooClient */
export const createDiscordooClient =
  <T extends DefaultClientStack = DefaultClientStack>(cfg: Partial<DiscordooClientConfig<T>>): DescendantOfClass<DiscordooClient<T>> => {
    const config = { ...defaultDiscordooClientConfig, ...cfg }
    @Singleton()
    @Department(config.department)
    class emb extends DiscordooClient<T> {
      getToken = config.token
      customBuilder = config.builder
    }

    return emb
  }

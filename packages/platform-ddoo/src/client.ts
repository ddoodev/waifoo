import { App, DescendantOfClass, DotenvConfig, container, Singleton, Department, Uses, Injectable } from '@waifoo/core'
import { ClientBuilder, createApp as createDdooApp, DefaultClientStack, Client, ReadyEventContext } from 'discordoo'
import { ListenerDiscoveryApp } from './discovery'
import { EventListener, On } from './decorators'

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
    const dotenvCfg = container.resolve(DotenvConfig)
    return await dotenvCfg.get('DISCORD_TOKEN') ?? ''
  },
  builder: b => b
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

    this._listenerDiscovery.discoveredListeners.forEach(l => {
      this.client!.on(l.name, l.handler as any)
    })

    await this.client.start()
  }

  @On('ready')
  async log(ctx: ReadyEventContext) {
    const user = await ctx.client.internals.actions.getUser('@me')
    if (user.success) {
      this.logger.done(`Logged in as ${user.result.username}#${user.result.discriminator}(${user.result.id})`)
    } else {
      this.logger.warn('Logged in, however Discord API didn\'t return desired result for user')
    }
  }

  /** Async function which will return token */
  abstract getToken(): Promise<string>
  /** Custom client builder */
  abstract customBuilder(b: ClientBuilder<T>): ClientBuilder<T>
  abstract _listenerDiscovery: ListenerDiscoveryApp
}

/** Create DiscordooClient */
export const createDiscordooClient =
  <T extends DefaultClientStack = DefaultClientStack>(cfg: Partial<DiscordooClientConfig<T>>): DescendantOfClass<DiscordooClient<T>> => {
    const config = { ...defaultDiscordooClientConfig, ...cfg }

    @Singleton()
    @Department('DiscordooClient')
    @Injectable()
    @EventListener()
    class emb extends DiscordooClient<T> {
      constructor(public _listenerDiscovery: ListenerDiscoveryApp) {
        super()
      }

      getToken = config.token
      customBuilder = config.builder
    }

    return emb
  }

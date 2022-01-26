import { service, ServiceDependencies, ServiceLifecycle, container, logger, Logger } from '@waifoo/core'
import { Client, ClientBuilder, DefaultClientStack, createApp } from 'discordoo'
import { DependencyContainer } from 'tsyringe'
import { config, ConfigInjectionKey } from './decorators'
import { ListenerDiscovery } from './discovery'

export interface DiscordooClientConfig<T extends DefaultClientStack = DefaultClientStack> {
  token: (c: DependencyContainer) => Promise<string> | string
  builder: (b: ClientBuilder<T>, c: DependencyContainer) => Promise<ClientBuilder<T>> | ClientBuilder<T>
}

export const createDiscordooClient = 
  <T extends DefaultClientStack = DefaultClientStack>(options: DiscordooClientConfig<T>): ServiceDependencies => [
    {
      token: ListenerDiscovery,
      useClass: ListenerDiscovery
    },
    {
      token: ConfigInjectionKey,
      useValue: options
    },
    {
      useClass: DiscordooClient,
      token: DiscordooClient
    }
  ]

@service()
export class DiscordooClient<T extends DefaultClientStack = DefaultClientStack> implements ServiceLifecycle {
  constructor(
    @config() private _config: DiscordooClientConfig<T>, 
    @container() private _container: DependencyContainer,
    @logger() private _logger: Logger,
    private _discovery: ListenerDiscovery
  ) {}

  get logger() {
    return this._logger.scope('Discordoo')
  }

  client?: Client<T>
  builder?: ClientBuilder<T>

  async onInit() {
    this.builder = createApp(await this._getToken())
    this.builder = await this._getBuilder(this.builder)

    this.client = this.builder.build()
    this._bindListeners()

    await this.client.start()
  }

  private _bindListeners() {
    if (this.client === undefined) {
      this._logger.error('_bindListeners was called before client was created')
    }
    this._discovery.discoveredListeners.map(e => {
      this.client?.on(e[0], e[1])
    })
  }

  private async _getToken() {
    return this._config.token(this._container)
  }

  private async _getBuilder(b: ClientBuilder<T>) {
    return this._config.builder(b, this._container)
  }
}
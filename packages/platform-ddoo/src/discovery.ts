import { container, DiscoveryService, logger, Logger, resolveService, service, ServiceLifecycle } from '@waifoo/core'
import { DependencyContainer } from 'tsyringe'
import { EventListenerKey, getOn } from '.'
import { getAllFuncs } from './utils'

@service()
export class ListenerDiscovery implements ServiceLifecycle {
  constructor(
    private _discovery: DiscoveryService, 
    @container() private _container: DependencyContainer,
    @logger() private __logger: Logger
  ) {}

  discoveredListeners: [any, any][] = []

  private get _logger() {
    return this.__logger.scope('ListenerDiscovery')
  }

  async onInit() {
    const discovered = this._discovery.discover(
      e => Reflect.hasMetadata(EventListenerKey, e.constructor)
    ).map(e => this._container.resolve(resolveService(e).token))
    discovered.length === 0 && this._logger.warn('No EventListeners were found')
    
    for (const s of discovered) {
      const funcs = getAllFuncs(s)
      for (const func of funcs) {
        const on = getOn(s, func)

        if (s[func] instanceof Function && on !== undefined) {
          this.discoveredListeners.push([ on, s[func].bind(s) ])
        }
      }
    }
  }
}
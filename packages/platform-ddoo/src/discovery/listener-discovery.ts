import { App, DiscoveryApp, Injectable, Singleton, container } from '@waifoo/core'
import { getEventListener, getOn } from '../decorators/event-listener'
import { ClientEventsHandlers } from 'discordoo'
import { getAllFuncs } from '../utils/getAllFuncs'

export type EventHandler = {
  name: keyof ClientEventsHandlers
  handler: ClientEventsHandlers[keyof ClientEventsHandlers]
}

@Injectable()
@Singleton()
export class ListenerDiscoveryApp extends App {
  constructor(private _discovery: DiscoveryApp) {
    super()
  }

  private _listeners: EventHandler[] = []

  get discoveredListeners() {
    if (!this.ready) {
      throw new Error('Trying to access discoveredListeners on ListenerDiscoveryApp before it is ready')
    }
    return this._listeners
  }

  async load() {
    const listeners = this._discovery.discover(a => getEventListener(a))
    if (listeners.length == 0) {
      this.logger.warn('Haven\'t found any listeners')
      return
    }

    for (const listener of listeners) {
      const resolved = container.resolve(listener)
      const props = getAllFuncs(resolved)
      const before = this._listeners.length

      for (const prop of props) {
        // @ts-ignore
        const on = getOn(resolved, prop)
        if ((resolved[prop] instanceof Function) && on !== undefined) {
          this._listeners.push({ name: on, handler: resolved[prop].bind(resolved) })
        }
      }

      if (before === this._listeners.length) {
        this.logger.warn(`No listeners were found for ${resolved.getDepartmentName()} event listener`)
      }
    }

    if (this._listeners.length === 0) {
      this.logger.warn('No listeners were registred')
    }
  }
}

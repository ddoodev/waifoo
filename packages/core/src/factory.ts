import { ServiceLifecycle } from './service'
import { container as parentContainer } from 'tsyringe'
import { DiContainer } from './decorators/container'
import { DefaultLogger, getServiceDeps, Logger, resolveService, ServiceResolvable } from '.'
import { LoggerInjectKey } from './logger/decorator'

/** Creates an application from a service */
export class AppFactory {
  constructor(public rootService: ServiceResolvable<ServiceLifecycle>, private _container = parentContainer.createChildContainer()) {
    this._container.register(DiContainer, { useValue: _container })
    this._container.register(LoggerInjectKey, { useValue: new DefaultLogger() })
  }

  /** Starts this app */
  async start() {
    const root = this._container.resolve(resolveService(this.rootService).token)
    await this._initApp(root)
  }

  /** Sets logger */
  logger(l: Logger) {
    this._container.register(LoggerInjectKey, { useValue: l })
    return this
  }

  /** Initializes a single app */
  private async _initApp(app: ServiceLifecycle) {
    await app.onBeforeInit?.()

    const deps = getServiceDeps(app.constructor)
    deps.length !== 0 && await app.onBeforeDependenciesInitialized?.()

    for (const dep of deps) {
      await this._initApp(this._container.resolve(resolveService(dep).token))
    }

    deps.length !== 0 && await app.onDependenciesInitialized?.(deps.map(resolveService))

    await app.onInit?.()
  }
}

export const createApp = (rootService: ServiceResolvable<ServiceLifecycle>) => new AppFactory(rootService)
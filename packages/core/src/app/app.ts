import { BaseContext } from './context'
import { TypedEmitter } from 'tiny-typed-emitter'
import { getUses } from './use'
import { container } from '../di'
import { getDepartment, Logger, logger } from '../logger'
import { getIsSilent } from '../logger/silent'

/** Basic unit of Waifoo application */
export abstract class App extends TypedEmitter<AppEvents> {
  /** If this app is ready */
  ready = false
  /** This app's parent */
  private _parent?: App
  /** Base logger used */
  private _baseLogger = logger

  /** Sets logger */
  set logger(l: Logger) {
    this._baseLogger = l
  }

  /** logger used by this app */
  get logger() {
    return this._isSilent() ? this._baseLogger : this._baseLogger.extend(this._getDepartmentName())
  }

  /** App's parent */
  get parentApp() {
    return this._parent
  }

  /** App's parent */
  set parentApp(value: App | undefined) {
    this._parent = value
    this.emit('parentAssigned', value)
  }

  /** Checks if this app is a subapplication */
  get isSubApp() {
    return this._parent !== undefined
  }

  /** Dependencies of this app specified using @Uses decorator */
  protected _getDependencies() {
    return getUses(this.constructor as any)
  }

  /** Department name */
  protected _getDepartmentName() {
    return getDepartment(this.constructor).length == 0 ? this.constructor.name : getDepartment(this.constructor)
  }

  /** If this App is silent in logger chain */
  protected _isSilent() {
    return getIsSilent(this.constructor)
  }

  /** Gets this app's context */
  deriveContext(): BaseContext {
    return {
      app: this
    }
  }

  /** Initialize sub apps */
  async initializeSubApps(): Promise<void> {
    const apps = this._getDependencies().map(e => {
      const app = container.resolve(e)
      app.logger = this.logger
      app.parentApp = this
      return app
    })
    await Promise.all(apps.map(e => e.start()))
    this.logger.log(`Initialized dependencies(${apps.length})`)
  }

  /** Start this application */
  async start(initSubApps = true) {
    if (initSubApps) {
      await this.initializeSubApps()
    }
    await this.load()
    this.emit('ready', this)
    this.logger.done('Initialized!')
  }

  /** Load function, Ran after all subapps are loaded */
  abstract load(): Promise<void>
}

export interface AppEvents {
  ready: (a: App) => void
  parentAssigned: (a?: App) => void
}

import { BaseContext } from './context'
import { TypedEmitter } from 'tiny-typed-emitter'
import { getUses } from './use'
import { container } from '../di'
import { getDepartment, Logger, logger } from '../logger'
import { getIsInvisible } from '../logger'
import { getSilent } from '../logger'
import { ExceptionBoundary } from '../exceptions'

/** Basic unit of Waifoo application */
export abstract class App extends TypedEmitter<AppEvents> {
  /** If this app is ready */
  ready = false
  /** This app's parent */
  private _parent?: App
  /** Base logger used */
  private _baseLogger = logger
  _exceptionBoundary = new ExceptionBoundary()

  /** Sets logger */
  set logger(l: Logger) {
    this._baseLogger = l
  }

  /** logger used by this app */
  get logger() {
    return this._baseLogger.extend(this.getDepartmentName(), this.getSilent())
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
  getDependencies() {
    return getUses(this.constructor as any)
  }

  /** Department name */
  getDepartmentName() {
    if (this.isInvisible()) {
      return ''
    }
    return getDepartment(this.constructor) === '' ? this.constructor.name : getDepartment(this.constructor)
  }

  /** If this App is silent in logger chain */
  isInvisible() {
    return getIsInvisible(this.constructor)
  }

  /** Silents of this app  */
  getSilent() {
    return getSilent(this.constructor)
  }

  /** Gets this app's context */
  deriveContext(): BaseContext {
    return {
      app: this
    }
  }

  /** Initialize sub apps */
  async initializeSubApps(): Promise<void> {
    const apps = this.getDependencies().map(e => {
      const app = container.resolve(e)
      app.logger = this.logger
      app.parentApp = this
      return app
    })

    for (const app of apps) {
      await app.start()
    }

    apps.length > 0 && this.logger.log(`Initialized dependencies(${apps.map(e => e.constructor.name).join(', ')})`)
  }

  /** Start this application */
  async start(initSubApps = true) {
    this._exceptionBoundary.handle((e) => {
      this.logger.fail(e)
      process.exit(-1)
    })

    if (initSubApps) {
      await this.initializeSubApps()
    }

    await this._exceptionBoundary.wrapAsync(async () => {
      await this.load()
    })
    this.ready = true
    this.emit('ready', this)
  }

  /** Load function, Ran after all subapps are loaded */
  abstract load(): Promise<void>
}

export interface AppEvents {
  ready: (a: App) => void
  parentAssigned: (a?: App) => void
}

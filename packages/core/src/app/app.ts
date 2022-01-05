import { BaseContext } from './context'
import { TypedEmitter } from 'tiny-typed-emitter'
import { getUses } from './use'
import { container } from 'tsyringe'

/** Basic unit of Waifoo application */
export abstract class App extends TypedEmitter<AppEvents> {
  /** If this app is ready */
  ready = false
  /** This app's parent */
  private _parent?: App

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

  /** Changes parent for this app */
  setParent(app: App) {
    this.parentApp = app
  }

  /** Dependencies of this app specified using @Uses decorator */
  protected _getDependencies() {
    return getUses(this.constructor as any)
  }

  /** Gets this app's context */
  deriveContext(): BaseContext {
    return {
      app: this
    }
  }

  /** Initialize sub apps */
  async initializeSubApps(): Promise<void> {
    const apps = this._getDependencies().map(e => container.resolve(e))
    await Promise.all(apps.map(e => e.start()))
  }

  /** Start this application */
  async start(initSubApps = true) {
    if (initSubApps) {
      await this.initializeSubApps()
    }
    await this.load()
    this.emit('ready', this)
  }

  /** Load function, Ran after all subapps are loaded */
  abstract load(): Promise<void>
}

export interface AppEvents {
  ready: (a: App) => void
  parentAssigned: (a?: App) => void
}
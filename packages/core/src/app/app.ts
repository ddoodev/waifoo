import { BaseContext } from './context'
import { TypedEmitter } from 'tiny-typed-emitter'
import { getUses } from './use'

export abstract class App extends TypedEmitter<AppEvents> {
  ready = false
  private _parent?: App

  get parentApp() {
    return this._parent
  }

  set parentApp(value: App | undefined) {
    this._parent = value
    this.emit('parentAssigned', value)
  }

  get isSubApp() {
    return this._parent !== undefined
  }

  setParent(app: App) {
    this.parentApp = app
  }

  protected _getDependencies() {
    return getUses(this.constructor as any)
  }

  deriveContext(): BaseContext {
    return {
      app: this
    }
  }

  async initializeSubApps(): Promise<void> {
    const apps = this._getDependencies().map(e => new e())
    await Promise.all(apps.map(e => e.start()))
  }

  async start(initSubApps = true) {
    if (initSubApps) {
      await this.initializeSubApps()
    }
    await this.load()
  }

  abstract load(): Promise<void>
}

export interface AppEvents {
  ready: (a: App) => void
  lateSubAppRegister: (a: App) => void
  subAppRegister: (a: App) => void
  parentAssigned: (a?: App) => void
}
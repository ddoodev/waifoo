import { BaseContext } from './context'
import { TypedEmitter } from 'tiny-typed-emitter'

export class App extends TypedEmitter<AppEvents> {
  apps: App[] = []
  ready = false
  private _parent?: App

  get parentApp() {
    return this._parent
  }

  set parentApp(value: App | undefined) {
    this._parent = value
    this.emit('parentAssigned', value)
  }

  setParent(app: App) {
    this.parentApp = app
  }

  use(app: App, forceInitialize = false) {
    this.apps.push(app)
    if (this.ready || forceInitialize) {
      this.ready ? this.emit('lateSubAppRegister', app) : this.emit('subAppRegister', app)
      app.parentApp = this
      return app.initialize()
    }
  }

  deriveContext(): BaseContext {
    return {
      app: this
    }
  }

  async initialize(): Promise<void> {
    const promise = this.apps.map(e => e.initialize())
    await Promise.all(promise)
    this.ready = true
    this.emit('ready')
  }
}

export interface AppEvents {
  ready: () => void
  lateSubAppRegister: (a: App) => void
  subAppRegister: (a: App) => void
  parentAssigned: (a?: App) => void
}
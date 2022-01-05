import 'reflect-metadata'
import { createApp, Uses } from '..'
import { Injectable, Singleton, container } from '../..'
import { App } from '../app'

describe('App#start', () => {
  it('starts app and initializes submodules', async () => {
    @Singleton()
    class Subapp extends App {
      init = false

      async load() {
        this.init = true
      }
    }

    @Uses(Subapp)
    @Singleton()
    @Injectable()
    class MainApp extends App {
      constructor(public subApp: Subapp) {
        super()
      }

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      async load() {}
    }

    await createApp(MainApp).start()
    const main = container.resolve(MainApp)
    expect(main.subApp.init).toBe(true)
  })
})
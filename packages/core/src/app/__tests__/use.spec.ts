/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Uses } from '../use'
import { App } from '..'

describe('@Uses()', () => {
  it('assigns metadata properly', () => {
    class App1 extends App {
      async load() {}
    }

    @Uses(App1)
    class App2 extends App {
      async load() {}

      get $$dependencies() {
        return this._getDependencies()
      }
    }
    const app = new App2()
    expect(app.$$dependencies.length).toBe(1)
  })
})
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Uses } from '../use'
import { App, container, createApp } from '../..'

describe('@Uses()', () => {
  it('assigns metadata properly', async () => {
    class App1 extends App {
      id = 'app1'
      async load() {
        // @ts-ignore
        expect(this.parentApp!.id).toBe('app2')
        expect(this.isSubApp).toBe(true)
      }
    }

    @Uses(App1)
    class App2 extends App {
      id = 'app2'
      async load() {
        expect(this.isSubApp).toBe(false)
      }

      get $$dependencies() {
        return this.getDependencies()
      }
    }

    await createApp(App2).start()

    const app = container.resolve(App2)

    expect(app.$$dependencies.length).toBe(1)
  })
})

import { logger } from '../../logger'
import { App } from '../app'
import { createApp } from '../factory'

describe('createApp', () => {
  it('sets logger', async () => {
    const l = { ...logger, isMy: true }

    class Testee extends App {
      async load() {
        // @ts-ignore
        expect(this._baseLogger.isMy).toBe(true)
      }
    }

    await createApp(Testee).logger(l).start()
  })
})

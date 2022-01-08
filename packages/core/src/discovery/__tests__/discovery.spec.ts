import 'reflect-metadata'
import { App, createApp, Uses } from '../../app'
import { DiscoveryApp } from '../discovery'
import { container } from '../../di'

describe('DiscoveryApp', () => {
  it('resolves dependencies', async () => {
    @Reflect.metadata('testing', 'yes')
    class NestedApp extends App {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      async load() {}
    }

    @Uses(DiscoveryApp, NestedApp)
    class Root extends App {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      async load() {}
    }

    await createApp(Root).start()

    const discovery = container.resolve(DiscoveryApp)
    expect(discovery.discover(() => true).length).toBe(3)
    expect(discovery.discover(() => false).length).toBe(0)
    expect(discovery.discover(a => Reflect.getMetadata('testing', a) == 'yes').length).toBe(1)
  })
})

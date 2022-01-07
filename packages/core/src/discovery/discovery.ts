import { App } from '../app'
import { DescendantOfClass } from '../utils'
import { createMatcher } from './matcher'
import { Singleton } from '../di'

@Singleton()
export class DiscoveryApp extends App {
  root?: DescendantOfClass<App>

  async load() {
    if (!this.isSubApp) {
      throw new Error('DiscoveryApp must be a dependency of another app')
    }

    function walk(app: App): App {
      if (!app.isSubApp) {
        return app
      }
      return walk(app.parentApp!)
    }

    this.root = walk(this).constructor as DescendantOfClass<App>
  }

  discover(matcher: (a: DescendantOfClass<App>) => boolean) {
    if (this.root == undefined) {
      throw new Error('DiscoveryApp wasn\'t initialized')
    }
    return createMatcher(matcher)(this.root)
  }
}

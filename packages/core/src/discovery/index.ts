import { DependencyContainer } from 'tsyringe'
import { getServiceDeps, service } from '../decorators/service'
import { container } from '../decorators/'
import { resolveService, ServiceLifecycle, ServiceResolvable, root } from '..'

/** Discovers services */
@service()
export class DiscoveryService {
  constructor(@container() private _container: DependencyContainer, @root() private _root: any) {
    console.log('created!')
  }

  public discover(matcher: (a: ServiceLifecycle, c: DependencyContainer) =>  boolean) {
    const walk = (a: ServiceResolvable) => {
      const res = [] as ServiceResolvable[]

      if (matcher(this._container.resolve(resolveService(a).token), this._container)) res.push(a)

      for (const dep of getServiceDeps(a)) {
        res.push(...walk(dep))
      }

      return res
    }

    const a = walk(this._root.constructor)
    return a
  }
}
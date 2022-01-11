import { DependencyContainer } from 'tsyringe'
import { getServiceDeps, service } from '../decorators/service'
import { container } from '../decorators/'
import { resolveService, ServiceLifecycle, ServiceResolvable } from '..'

/** Discovers services */
@service()
export class DiscoveryService {
  constructor(@container() private _container: DependencyContainer) {}

  public discover(root: any, matcher: (a: ServiceLifecycle, c: DependencyContainer) =>  boolean) {
    const walk = (a: ServiceResolvable) => {
      const res = [] as ServiceResolvable[]

      if (matcher(this._container.resolve(resolveService(a).token), this._container)) res.push(a)

      for (const dep of getServiceDeps(a)) {
        res.push(...walk(dep))
      }

      return res
    }

    return walk(root)
  }
}
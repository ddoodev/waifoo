import { singleton, registry, autoInjectable } from 'tsyringe'
import { Service, ServiceLifecycle } from '..'
import { resolveService, ServiceResolvable } from '../service'

export type ServiceDependencies = (ServiceResolvable<any> | ServiceDependencies)[]

export const ServiceDepsKey = Symbol('ServiceDepsKey')
/** Declare a service */
export const service = (...reg: ServiceDependencies) => {
  const r = reg.flat(Infinity).map(resolveService)
  
  return (target) => {
    singleton()(target)
    autoInjectable()(target)
    registry(r)(target)
    Reflect.metadata(ServiceDepsKey, r)(target)
  }
}
export const getServiceDeps = (target: any): ServiceResolvable[] => 
  (Reflect.getMetadata(ServiceDepsKey, target) as Service<ServiceLifecycle>[] | undefined) ?? []

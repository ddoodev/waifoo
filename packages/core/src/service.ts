import { InjectionToken, instanceCachingFactory, isFactoryProvider, Provider } from 'tsyringe'

export type Service<T> = {
  token: InjectionToken<T>
  noCaching?: boolean
} & Provider<T>

export interface ServiceLifecycle {
  /** Runs when initialization is done */
  onInit?: () => Promise<void>
  /** Runs when dependencies are initialized */
  onDependenciesInitialized?: (dependencies: Service<ServiceLifecycle>[]) => Promise<void>
  /** Runs before dependency initialization if any were present */
  onBeforeDependenciesInitialized?: () => Promise<void>
  /** Runs before initialization */
  onBeforeInit?: () => Promise<void>
}

export type ServiceResolvable<T = ServiceLifecycle> = Service<T> | { new (...args: any[]): T }

/** Resolves ServiceResolvable into Service */
export const resolveService = <T>(s: ServiceResolvable<T>): Service<T> => {
  if (s instanceof Function) {
    return {
      token: s,
      useClass: s
    }
  } else {
    if (isFactoryProvider(s) && (s.noCaching ?? false) == false) {
      return {
        token: s.token,
        useFactory: instanceCachingFactory(s.useFactory)
      }
    }
    return s
  }
}
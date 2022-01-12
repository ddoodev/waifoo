import { 
  InjectionToken, 
  instanceCachingFactory, 
  isFactoryProvider, 
  isValueProvider, 
  Lifecycle, 
  Provider, 
  RegistrationOptions
} from 'tsyringe'

export type Service<T> = {
  token: InjectionToken<T>
  noCaching?: boolean
  options?: RegistrationOptions
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
      useClass: s,
      options: {
        lifecycle: Lifecycle.Singleton
      }
    }
  } else {
    if (isFactoryProvider(s) && (s.noCaching ?? false) == false) {
      return {
        token: s.token,
        useFactory: instanceCachingFactory(s.useFactory)
      }
    }
    if ((s.noCaching ?? false) === false && !isValueProvider(s) && !isFactoryProvider(s)) {
      return {
        ...s,
        options: {
          lifecycle: Lifecycle.Singleton
        }
      }
    } else {
      return s
    }
  }
}
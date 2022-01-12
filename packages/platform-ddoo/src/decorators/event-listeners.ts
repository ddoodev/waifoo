import { ClientEventsHandlers } from 'discordoo'

export const EventListenerKey = Symbol('EventListener')
export const eventListener = () => Reflect.metadata(EventListenerKey, true)

export const OnKey = Symbol('On')
export const on = <T extends keyof ClientEventsHandlers>(name: T) => 
  (t, p, descriptor: TypedPropertyDescriptor<ClientEventsHandlers[T]>) => Reflect.metadata(OnKey, name)(t, p)
// eslint-disable-next-line @typescript-eslint/ban-types
export const getOn = (e: any, property: string) => Reflect.getMetadata(OnKey, e, property)

export const OnceKey = Symbol('Once')
export const once = <T extends keyof ClientEventsHandlers>(name: T) => 
  (t, p, descriptor: TypedPropertyDescriptor<ClientEventsHandlers[T]>) => Reflect.metadata(OnceKey, name)(t, p)
// eslint-disable-next-line @typescript-eslint/ban-types
export const getOnce = (e: any, property: string) => Reflect.getMetadata(OnceKey, e, property)
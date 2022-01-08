import { ClientEventsHandlers } from 'discordoo'

export const EventListenerKey = Symbol('EventListener')
export const EventListener = () => Reflect.metadata(EventListenerKey, true)
// eslint-disable-next-line @typescript-eslint/ban-types
export const getEventListener = (e: Function) => Reflect.getMetadata(EventListenerKey, e) as boolean | undefined ?? false

export const OnKey = Symbol('EventName')
export const On = <T extends keyof ClientEventsHandlers>(name: T) =>
  (t, p, descriptor: TypedPropertyDescriptor<ClientEventsHandlers[T]>) => Reflect.metadata(OnKey, name)(t, p)
// eslint-disable-next-line @typescript-eslint/ban-types
export const getOn = (e: Function, property: string) => Reflect.getMetadata(OnKey, e, property)

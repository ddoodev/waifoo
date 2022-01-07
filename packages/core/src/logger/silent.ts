export const SilentKey = Symbol('Silent')
/** Sets if this app should appear in chain */
export const Silent = () => Reflect.metadata(SilentKey, true)
// eslint-disable-next-line @typescript-eslint/ban-types
export const getIsSilent = (t: Function) => Reflect.getMetadata(SilentKey, t) ?? false

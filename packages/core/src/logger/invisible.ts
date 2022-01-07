export const InvisibleKey = Symbol('Invisible')
/** Sets if this app should appear in chain */
export const Invisible = () => Reflect.metadata(InvisibleKey, true)
// eslint-disable-next-line @typescript-eslint/ban-types
export const getIsInvisible = (t: Function) => Reflect.getMetadata(InvisibleKey, t) ?? false

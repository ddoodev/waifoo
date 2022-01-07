export const SilentKey = Symbol('SilentKey')
export const Silent = (...levels: string[]) => Reflect.metadata(SilentKey, levels)
// eslint-disable-next-line @typescript-eslint/ban-types
export const getSilent = (a: Function) => Reflect.getMetadata(SilentKey, a) as string[] | undefined ?? []

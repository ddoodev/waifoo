import { DescendantOfClass } from '../utils/descendant'
import { App } from './app'

export const UsesMetadataKey = Symbol('UsesMetadata')
/** Add dependencies for an app */
export const Uses = (...apps: DescendantOfClass<App>[]) => Reflect.metadata(UsesMetadataKey, apps)
/** Get dependencies for specified constructor */
export const getUses = (a: DescendantOfClass<App>) => {
  return (Reflect.getMetadata(UsesMetadataKey, a) ?? []) as DescendantOfClass<App>[]
}
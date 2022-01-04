import { DescendantOfClass } from '../utils/descendant'
import { App } from './app'

export const UsesMetadataKey = Symbol('UsesMetadata')
export const Uses = (...apps: DescendantOfClass<App>[]) => Reflect.metadata(UsesMetadataKey, apps)
export const getUses = (a: DescendantOfClass<App>) => {
  return Reflect.getMetadata(UsesMetadataKey, a) as DescendantOfClass<App>[]
}
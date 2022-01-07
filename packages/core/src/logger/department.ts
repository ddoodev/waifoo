import { Silent } from './silent'

export const DepartmentNameKey = Symbol('DepartmentName')
/** Sets department key for logger */
export const Department = (name: string) => name.length === 0 ? Silent() : Reflect.metadata(DepartmentNameKey, name)
// eslint-disable-next-line @typescript-eslint/ban-types
export const getDepartment = (t: Function): string => Reflect.getMetadata(DepartmentNameKey, t) ?? ''

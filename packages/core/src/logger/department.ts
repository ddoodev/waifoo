export const DepartmentNameKey = Symbol('DepartmentName')
/** Sets department key for logger */
export const Department = (name: string) => Reflect.metadata(DepartmentNameKey, name)
// eslint-disable-next-line @typescript-eslint/ban-types
export const getDepartment = (t: Function): string => Reflect.getMetadata(DepartmentNameKey, t) ?? ''
export interface DescendantOfClass<T = any> extends Function {
  new(...args: any[]): T
}
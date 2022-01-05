/** If A is parent class of B, then B is applicable and A isn't, when A is T */
export interface DescendantOfClass<T = any> extends Function {
  new(...args: any[]): T
}
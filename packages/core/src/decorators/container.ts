import { inject } from 'tsyringe'

export const DiContainer = Symbol('DiContainer')
/** Gets current scope tsyringe container */
export const container = () => inject(DiContainer)
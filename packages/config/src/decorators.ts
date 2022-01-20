import { inject } from 'tsyringe'

export const configInjectionKey = Symbol('config')
export const config = () => inject(configInjectionKey)
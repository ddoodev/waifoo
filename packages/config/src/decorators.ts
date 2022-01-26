import { inject } from 'tsyringe'

export const ConfigInjectionKey = Symbol('config')
export const config = () => inject(ConfigInjectionKey)
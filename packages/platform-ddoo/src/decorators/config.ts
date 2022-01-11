import { inject } from 'tsyringe'

export const ConfigInjectionKey = Symbol('Config')
export const config = () => inject(ConfigInjectionKey)
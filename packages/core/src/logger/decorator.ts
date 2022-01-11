import { inject } from 'tsyringe'

export const LoggerInjectKey = Symbol('Logger')
export const logger = () => inject(LoggerInjectKey)
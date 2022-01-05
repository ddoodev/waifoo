import { autoInjectable, container } from 'tsyringe'

/** Automatically inject all dependencies */
export const Injectee = autoInjectable
/** Resolve service from global container */
export const resolve = container.resolve
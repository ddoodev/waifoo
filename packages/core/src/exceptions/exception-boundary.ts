import { TypedEmitter } from 'tiny-typed-emitter'

/**
 * ExceptionBoundary is an utility data structure which is used to handle exceptions in a better way.
 * 
 * All exceptions created by callbacks in wrap or wrapAsync methods are passed to callbacks in handle methods.
 * Callbacks in handle methods have an option to raise the exception to a higher {@link ExceptionBoundary} if needed.
 * 
 * See tests for more details
 */
export class ExceptionBoundary {
  // using custom emitter impl here for things to work
  handlers: ((e: any, raise: (e: Error) => void) => void)[] = []

  handle(cb: (e: any, raise: (e: Error) => void) => void) {
    this.handlers.push(cb)
  }

  private emit(e: any, raise: (e: Error) => void) {
    this.handlers.forEach(a => a(e, raise))
  }

  wrap<T = any>(cb: () => T | undefined): T | undefined {
    const raise = (e: Error) => {
      throw e
    }

    try {
      return cb()
    } catch (e) {
      this.emit(e, raise)
      return undefined
    }
  }

  async wrapAsync<T = any>(cb: () => Promise<T | undefined>): Promise<T | undefined> {
    const raise = (e: Error) => {
      console.log('raise')
      throw e
    }

    try {
      const v = await cb()
      return v
    } catch (e) {
      this.emit(e, raise)
      return undefined
    }
  }
}
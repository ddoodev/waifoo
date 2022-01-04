import { ExceptionBoundary } from '../exception-boundary'

describe('ExceptionBoundary', () => {
  let boundary = new ExceptionBoundary()

  afterEach(() => {
    boundary = new ExceptionBoundary()
  })
  
  it('doesn\'t let exception to pop', done => {
    try {
      boundary.wrap(() => {
        throw new Error('👻👻')
      })
    } catch {
      done.fail('boundary did let the exception pop')
    }

    done()
  })

  it('passes error to handle', done => {
    boundary.handle(() => {
      done()
    })

    boundary.wrap(() => {
      throw new Error('👻👻')
    })
  })

  it('pops exception thrown by handler', () => {
    expect(() => {
      boundary.handle((e, raise) => {
        raise(new Error('👻👻'))
      })

      boundary.wrap(() => {
        throw new Error('pop!')
      })
    }).toThrow()
  })
})
import { Injectable, Singleton, container } from '..'

describe('Singleton', () => {
  it('creates injected class only once', () => {
    @Singleton()
    class Test {
      random = Math.random().toFixed(3)
    }

    @Injectable()
    class Test2 {
      constructor(public t?: Test) {}
    }

    const t1 = container.resolve(Test)
    const t2 = container.resolve(Test2)

    expect(t2.t).not.toBeFalsy()
    expect(t1.random).toBe(t2.t?.random)
  })
})
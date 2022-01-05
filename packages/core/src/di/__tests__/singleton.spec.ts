import { Injectable, Singleton } from '..'

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

    const t1 = new Test2()
    const t2 = new Test2()

    expect(t1.t).not.toBeFalsy()
    expect(t2.t).not.toBeFalsy()
    expect(t1.t?.random).toBe(t2.t?.random)
  })
})
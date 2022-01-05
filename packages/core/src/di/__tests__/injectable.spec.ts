import { Injectable, container } from '../di'

describe('Injectable', () => {
  class Test {
    myCoolMethod() {
      return 'cool!'
    }
  }

  @Injectable()
  class Abc {
    constructor(private t?: Test) {}

    method() {
      return this.t!.myCoolMethod()
    }
  }

  it('injects Test into Abc as t', () => {
    const abc = container.resolve(Abc)
    expect(abc.method()).toBe('cool!')
  })
})
import { Injectee } from '..'

describe('injectee', () => {
  class Test {
    myCoolMethod() {
      return 'cool!'
    }
  }

  @Injectee()
  class Abc {
    constructor(private t?: Test) {}

    method() {
      return this.t!.myCoolMethod()
    }
  }

  it('injects Test into Abc as t', () => {
    const abc = new Abc() // since it mostly will be invoked with in the library it is ok, i guess?
    expect(abc.method()).toBe('cool!')
  })
})
import 'reflect-metadata'
import { Department, getDepartment } from '../department'

describe('@Department()', () => {
  it('correctly sets department', () => {
    @Department('cool')
    class Test {}

    expect(getDepartment(Test)).toBe('cool')
  })

  it('returns empty string if department is not set', () => {
    class Test {}

    expect(getDepartment(Test)).toBe('')
  })
})
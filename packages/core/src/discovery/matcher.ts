import { DescendantOfClass } from '../utils'
import { App, getUses } from '../app'

/** Creates a matcher function, which will look through all child apps of given app and pick those which match matcherFunction */
export const createMatcher = (matcherFunction: (a: DescendantOfClass<App>) => boolean) => (entry: DescendantOfClass<App>) => {
  const walk = (d: DescendantOfClass<App>) => {
    const res: DescendantOfClass<App>[] = []
    if (matcherFunction(d)) {
      res.push(d)
    }
    const deps = getUses(d)
    for (const dep of deps) {
      res.push(...walk(dep))
    }

    return res
  }

  return walk(entry)
}

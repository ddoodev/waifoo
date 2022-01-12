export function getAllFuncs(toCheck) {
  const props: string[] = []
  let obj = toCheck

  do {
    props.push(...Object.getOwnPropertyNames(obj))
  // eslint-disable-next-line no-cond-assign
  } while (obj = Object.getPrototypeOf(obj))  
  
  return props.sort().filter((e, i, arr) => { 
    if (e!=arr[i+1] && typeof toCheck[e] == 'function') return true
  })
}
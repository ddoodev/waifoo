export const production = async (e: () => any) => {
  process.env.NODE_ENV === 'production' && await e()
}

export const nonProduction = async (e: () => any) => {
  process.env.NODE_ENV !== 'production' && await e()
}
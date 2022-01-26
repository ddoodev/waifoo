import { DependencyContainer } from 'tsyringe'
import { Config, ConfigInjectionKey } from '.'

export interface KeyUtilOptions<T> {
  fallback?: string
  require?: boolean
  validate?: (v: string | undefined) => boolean
  transform?: (v: string | undefined) => T | undefined
}

export const key = <T = string>(key: string, opts: KeyUtilOptions<T> = {}) => async (c: DependencyContainer): Promise<T> => {
  const cfg = c.resolve<Config>(ConfigInjectionKey)
  const v = await cfg.get(key)
  
  if ((opts?.validate?.(v) ?? true) === false) {
    throw new Error(`config key ${key} didn't match specs`)
  }

  const foo = v ?? (opts?.fallback ?? '')
  const bar = (opts?.transform?.(foo)) ?? foo
  if (bar === undefined && (opts?.require ?? true)) {
    throw new Error(`expected key ${key} to be present in config`)
  } else {
    // @ts-expect-error
    return bar
  }
}

export interface Logger {
  scope(s: string): Logger
  debug(...s: string[]): Logger
  log(...s: string[]): Logger
  warn(...s: string[]): Logger
  done(...s: string[]): Logger
  error(...s: string[]): Logger
  _error(t: boolean, ...s: string[]): Logger
  silent(...levels: LogLevel[]): Logger
}

export type LogLevel = 'debug' | 'log' | 'warn' | 'done' | 'error'
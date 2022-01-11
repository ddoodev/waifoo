import chalk from 'chalk'
import { Logger, LogLevel } from '.'

export class DefaultLogger implements Logger {
  private _silent: LogLevel[] = []

  constructor(private _scope = '') {}

  silent(...silent: LogLevel[]) {
    this._silent = silent
    return this
  }

  scope(s: string) {
    return new DefaultLogger(s)
  }

  private _base(level: string, data: string, c: 'error' | 'log' | 'warn' = 'log') {
    if (this._silent.map(e => level.toLowerCase().includes(e.toLowerCase())).includes(true)) return
    const del = chalk.grey('|')
    const iso = new Date().toISOString()
    console[c](`${level} ${chalk.yellow(`[${this._scope}]`)} ${del} ${process.pid} / ${iso} ${del} ${chalk.whiteBright(data)}`)
  }

  debug(...s: string[]): Logger {
    this._base(chalk.grey('DEBUG'), s.join(' '), 'log')
    return this
  }

  log(...s: string[]): Logger {
    this._base(chalk.blue('LOG '), s.join(' '))
    return this 
  }

  warn(...s: string[]): Logger {
    this._base(chalk.yellow('WARN'), s.join(' '), 'warn')
    return this
  }

  error(...s: string[]): Logger {
    this._base(chalk.red('FAIL'), s.join(' '), 'error')
    return this
  }

  done(...s: string[]): Logger {
    this._base(chalk.green('DONE'), s.join(' '), 'log')
    return this
  }
}
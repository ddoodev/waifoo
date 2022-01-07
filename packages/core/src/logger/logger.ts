import chalk from 'chalk'

/** Creates a new logger */
export const loggerFactory = (dep = '', silent: string[] = []) => {
  const department = ` ${dep.length == 0 ? '/' : dep} `
  const shouldLog = (name: string) => !silent.includes(name)

  const d = () => chalk.gray(`${(new Date()).toISOString()}`)

  return {
    log(...data: string[]) {
      shouldLog('info') &&
        console.log(
          `${chalk.bgBlue.black(' INFO ')} | ${d()} | ${chalk.black.bgWhite(department)} | ${data.join(' ')}`
        )
    },
    warn(...data: string[]) {
      shouldLog('warn') &&
        console.log(
          `${chalk.bgYellow.black(' WARN ')} | ${d()} | ${chalk.black.bgWhite(department)} | ${data.join(' ')}`
        )
    },
    fail(...data: string[]) {
      shouldLog('fail') &&
        console.log(
          `${chalk.bgRed.black(' FAIL ')} | ${d()} | ${chalk.black.bgWhite(department)} | ${data.join(' ')}`
        )
    },
    crit(...data: string[]) {
      shouldLog('crit') &&
        console.log(
          `${chalk.bgRed.black(' CRIT ')} | ${d()} | ${chalk.black.bgWhite(department)} | ${data.join(' ')}`
        )
    },
    done(...data: string[]) {
      shouldLog('done') &&
        console.log(
          `${chalk.bgGreen.black(' DONE ')} | ${(d())} | ${chalk.black.bgWhite(department)} | ${data.join(' ')}`
        )
    },
    extend(name: string, silent: string[] = []) {
      if (name.length == 0) return loggerFactory(dep, silent)
      return loggerFactory(dep.length == 0 ? name : `${dep}/${name}`, silent)
    },
    department: dep
  }
}

/** Default logger */
export const logger = loggerFactory()

/** Factory used to create loggers */
export type LoggerFactory = typeof loggerFactory

/** Typedef for logger */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Logger extends ReturnType<LoggerFactory> {}

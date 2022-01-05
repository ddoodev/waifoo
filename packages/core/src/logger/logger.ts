import chalk from 'chalk'

/** Creates a new logger */
export const loggerFactory = (dep = '') => {
  const department = ` ${dep.length == 0 ? '/' : dep} `

  return {
    log(...data: string[]) {
      console.log(`${(new Date().toISOString())} ${chalk.black.bgWhite(department)} ${chalk.bgBlue.black(' INFO ')} ${data.join(' ')}`)
    },
    warn(...data: string[]) {
      console.log(`${(new Date().toISOString())} ${chalk.black.bgWhite(department)} ${chalk.bgYellow.black(' WARN ')} ${data.join(' ')}`)
    },
    fail(...data: string[]) {
      console.log(`${(new Date().toISOString())} ${chalk.black.bgWhite(department)} ${chalk.bgRed.black(' FAIL ')} ${data.join(' ')}`)
    },
    crit(...data: string[]) {
      console.log(`${(new Date().toISOString())} ${chalk.black.bgWhite(department)} ${chalk.bgRed.black(' CRIT ')} ${data.join(' ')}`)
    },
    done(...data: string[]) {
      console.log(`${(new Date().toISOString())} ${chalk.black.bgWhite(department)} ${chalk.bgGreen.black(' DONE ')} ${data.join(' ')}`)
    },
    extend(name: string) {
      return loggerFactory(dep.length == 0 ? name : `${dep}/${name}`)
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
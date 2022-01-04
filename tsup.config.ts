import { Options } from 'tsup'

export const options: Options = {
  entry: [ './src/index.ts' ],
  dts: true,
  format: [ 'esm', 'cjs' ],
  clean: true
}
export interface Config {
  get(key: string): Promise<string | undefined>
}
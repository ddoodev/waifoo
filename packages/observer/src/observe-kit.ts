import { Logger, logger, service } from '@waifoo/core'
import { DiscordooClient } from '@waifoo/platform-ddoo'
import { DefaultClientStack } from 'discordoo'
import { fromDiscordooEvent } from './operators'

@service()
export class ObserveKit<T extends DefaultClientStack = DefaultClientStack> {
  constructor(private _client: DiscordooClient<T>, @logger() private __logger: Logger) {
    //
  }

  get _logger() {
    return this.__logger.scope('ObserveKit')
  }

  fromEvent<B extends keyof T['events']>(name: B) {
    if (!this._client.client === undefined) {
      this._logger.error('client was accessed before initialization of DiscordooClientService')
    }
    return fromDiscordooEvent<T['events'], B>(this._client.client!, name)
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async waitMessage(...ops: Function[]) {
    const ob = this.fromEvent('messageCreate')

    // @ts-expect-error
    return ob.pipe(...ops)
  }
}
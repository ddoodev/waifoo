import { Client, ClientEventsHandlers } from 'discordoo'
import { Observable } from 'rxjs'

export const fromDiscordooEvent = 
  <H extends ClientEventsHandlers, T extends keyof H>(client: Client, name: T) => 
    // @ts-expect-error
    new Observable<Parameters<H[T]>[0]>(subscriber => {
      // @ts-expect-error
      client.on(name, c => subscriber.next(c))
    })
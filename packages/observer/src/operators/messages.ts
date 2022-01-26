import { MessageCreateEventContext } from 'discordoo'
import { filter, Observable } from 'rxjs'

export const from = (id: string) => (source: Observable<MessageCreateEventContext>) => source.pipe(filter(e => e.authorId == id))
export const inChannel = (id: string) => (source: Observable<MessageCreateEventContext>) => source.pipe(filter(e => e.channelId == id))
export const inGuild = 
  (id: string | undefined) => 
    (source: Observable<MessageCreateEventContext>) => source.pipe(filter(e => e.message.guildId === id))
export const inDm = () => inGuild(undefined)

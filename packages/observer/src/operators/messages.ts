import { MessageCreateEventContext } from 'discordoo'
import { filter, Observable } from 'rxjs'

export const from = (id: string) => (source: Observable<MessageCreateEventContext>) => source.pipe(filter(e => e.authorId == id))
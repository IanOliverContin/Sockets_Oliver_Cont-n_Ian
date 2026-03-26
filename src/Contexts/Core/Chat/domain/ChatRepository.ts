import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Chat } from './Chat'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface ChatRepository {
    find(id: Id): Promise<Nullable<Chat>>
    search(criteria: Criteria): Promise<Array<Chat>>
    persist(chat: Chat): Promise<void>
}

import { Chat } from '../domain/Chat'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type ChatResponseBody = {
    readonly id: string
    readonly name: string | null
    readonly description: string | null
    readonly isGroup: boolean
    readonly adminId: string | null
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly deletedAt: Date | null
}

export class ChatResponse implements QueryResponse<ChatResponseBody> {
    response: ChatResponseBody

    constructor(chat: Chat) {
        this.response = {
            id: chat.id.valueOf(),
            name: chat.name?.valueOf() ?? null,
            description: chat.description?.valueOf() ?? null,
            isGroup: chat.isGroup.valueOf(),
            adminId: chat.adminId?.valueOf() ?? null,
            createdAt: chat.createdAt.valueOf(),
            updatedAt: chat.updatedAt.valueOf(),
            deletedAt: chat.deletedAt?.valueOf() ?? null
        }
    }
}

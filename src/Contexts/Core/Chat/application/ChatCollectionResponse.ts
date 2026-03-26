import { Chat } from '../domain/Chat'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ChatResponse, ChatResponseBody } from './ChatResponse'

export class ChatCollectionResponse implements QueryResponse<Array<ChatResponseBody>> {
    response: Array<ChatResponseBody>

    constructor(chat: Array<Chat>) {
        this.response = chat.map(x => new ChatResponse(x).response)
    }
}

import { Room } from '../domain/Room'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type RoomResponseBody = {
    readonly id: string
    readonly chatId: string
    readonly userId: string
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly deletedAt: Date | null
}

export class RoomResponse implements QueryResponse<RoomResponseBody> {
    response: RoomResponseBody

    constructor(room: Room) {
        this.response = {
            id: room.id.valueOf(),
            chatId: room.chatId.valueOf(),
            userId: room.userId.valueOf(),
            createdAt: room.createdAt.valueOf(),
            updatedAt: room.updatedAt.valueOf(),
            deletedAt: room.deletedAt?.valueOf() ?? null
        }
    }
}

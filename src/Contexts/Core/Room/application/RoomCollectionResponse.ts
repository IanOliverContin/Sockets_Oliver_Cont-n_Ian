import { Room } from '../domain/Room'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { RoomResponse, RoomResponseBody } from './RoomResponse'

export class RoomCollectionResponse implements QueryResponse<Array<RoomResponseBody>> {
    response: Array<RoomResponseBody>

    constructor(room: Array<Room>) {
        this.response = room.map(x => new RoomResponse(x).response)
    }
}

import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Room } from './Room'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface RoomRepository {
    find(id: Id): Promise<Nullable<Room>>
    search(criteria: Criteria): Promise<Array<Room>>
    persist(room: Room): Promise<void>
}

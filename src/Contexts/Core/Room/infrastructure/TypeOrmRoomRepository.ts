import { Room } from '@Core/Room/domain/Room'
import { RoomRepository } from '@Core/Room/domain/RoomRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Id } from '@Core/Room/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { RoomSchema } from './entity/RoomSchema'

export class TypeOrmRoomRepository extends TypeOrmRepository<Room> implements RoomRepository {
    protected get entitySchema(): EntitySchema {
        return RoomSchema
    }

    async find(id: Id): Promise<Nullable<Room>> {
        return await (await this.repository()).findOneBy({ id: Equal(id) })
    }

    async search(criteria: Criteria): Promise<Room[]> {
        return (await this.criteriaToQueryBuilder(criteria)).getMany()
    }

    async persist(room: Room): Promise<void> {
        await (await this.repository()).save(room)
    }
}

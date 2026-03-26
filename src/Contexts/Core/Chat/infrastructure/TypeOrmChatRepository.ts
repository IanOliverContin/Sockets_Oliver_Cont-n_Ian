import { Chat } from '@Core/Chat/domain/Chat'
import { ChatRepository } from '@Core/Chat/domain/ChatRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { ChatSchema } from './entity/ChatSchema'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmChatRepository extends TypeOrmRepository<Chat> implements ChatRepository {
    protected get entitySchema(): EntitySchema {
        return ChatSchema
    }

    async find(id: Id): Promise<Nullable<Chat>> {
        return await (await this.repository()).findOneBy({ id: Equal(id) })
    }

    async search(criteria: Criteria): Promise<Chat[]> {
        return (await this.criteriaToQueryBuilder(criteria)).getMany()
    }

    async persist(chat: Chat): Promise<void> {
        await (await this.repository()).save(chat)
    }
}

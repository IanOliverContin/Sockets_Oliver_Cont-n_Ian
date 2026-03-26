import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { Room } from '@Core/Room/domain/Room'
import { ChatId } from '@Core/Room/domain/ValueObjects/ChatId'
import { UserId } from '@Core/Room/domain/ValueObjects/UserId'
import { CreatedAt } from '@Core/Room/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/Room/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/Room/domain/ValueObjects/DeletedAt'
import { Id } from '@Core/Room/domain/ValueObjects/Id'

export const RoomSchema = new EntitySchema<Room>({
    name: 'Room',
    target: Room,
    tableName: 'room',
    columns: {
        id: {
            type: 'varchar',
            primary: true,
            transformer: ValueObjectTransformer(Id)
        },
        chatId: {
            type: 'varchar',
            transformer: ValueObjectTransformer(ChatId)
        },
        userId: {
            type: 'varchar',
            transformer: ValueObjectTransformer(UserId)
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
            transformer: ValueObjectTransformer(CreatedAt)
        },
        updatedAt: {
            type: 'timestamp',
            updateDate: true,
            transformer: ValueObjectTransformer(UpdatedAt)
        },
        deletedAt: {
            type: 'timestamp',
            nullable: true,
            deleteDate: true,
            transformer: ValueObjectTransformer(DeletedAt)
        }
    },
    indices: [
        {
            name: 'IDX_ROOM_ID',
            columns: ['id']
        },
        {
            name: 'IDX_ROOM_CHAT_ID',
            columns: ['chatId']
        },
        {
            name: 'IDX_ROOM_USER_ID',
            columns: ['userId']
        }
    ]
})
